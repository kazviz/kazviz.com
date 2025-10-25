import { chromium } from "playwright"
import fs from "fs"

// Daftar nama dan url (hardcode)
const TARGETS = [
  { name: "landing", url: "http://localhost/id" },
  { name: "course", url: "http://localhost/belajar/html/heading" }
  // Tambahkan entry lain sesuai kebutuhan
]

// Helper untuk format tanggal & waktu: yyyyMMdd-HHmmss
function getDateTimeString() {
  const d = new Date()
  const pad = (n: number) => n.toString().padStart(2, "0")
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "-" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  )
}

type NetRow = {
  name: string
  transferSize: number
  size: number
  protocol: string
  type: string
}

async function main() {
  const path = require("path")
  for (const target of TARGETS) {
    const dateStr = getDateTimeString()
    const outDir = path.join("temp/dump", target.name)
    const OUTPUT_HAR = path.join(outDir, `${dateStr}.har`)
    const OUTPUT_CSV = path.join(outDir, `${dateStr}.csv`)
    const OUTPUT_JSON = path.join(outDir, `${dateStr}.json`)

    // Step 1: Rekam HAR
    const browser = await chromium.launch()
    const context = await browser.newContext({
      recordHar: { path: OUTPUT_HAR }
    })
    const page = await context.newPage()
    await page.goto(target.url, { waitUntil: "networkidle" })
    await page.waitForTimeout(2000) // tunggu sisa request
    await context.close() // pastikan HAR sudah ditulis
    await browser.close()

    // Step 2: Konversi HAR ke CSV & JSON
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }
    const harRaw = fs.readFileSync(OUTPUT_HAR, "utf-8")
    const har = JSON.parse(harRaw)
    const entries = har.log && har.log.entries ? har.log.entries : []
    // --- CSV ---
    const csvRows = [
      "name,transferSize,size,protocol,type",
      ...entries.map((e: any) => {
        const url = e.request.url
        const transferSize =
          e.response._transferSize || e.response.bodySize || 0
        const size =
          e.response.content && typeof e.response.content.size === "number"
            ? e.response.content.size
            : ""
        const protocol = e._serverIPAddress ? url.split(":")[0] : ""
        const type = e._resourceType || e.response.content.mimeType || ""
        return `"${url}",${transferSize},${size},${protocol},${type}`
      })
    ]
    fs.writeFileSync(OUTPUT_CSV, csvRows.join("\n"))
    // --- JSON ---
    // Summary
    const totalTransferSize = entries.reduce(
      (sum: number, e: any) =>
        sum + (e.response._transferSize || e.response.bodySize || 0),
      0
    )
    const totalDecodedSize = entries.reduce(
      (sum: number, e: any) =>
        sum +
        (e.response.content && typeof e.response.content.size === "number"
          ? e.response.content.size
          : 0),
      0
    )
    // Cari timing utama
    const pageTimings =
      har.log.pages && har.log.pages[0] && har.log.pages[0].pageTimings
        ? har.log.pages[0].pageTimings
        : {}
    const startedDateTime =
      har.log.pages && har.log.pages[0] && har.log.pages[0].startedDateTime
        ? har.log.pages[0].startedDateTime
        : null
    // Detail per-request
    const requests = entries.map((e: any) => {
      const url = e.request.url
      const transferSize = e.response._transferSize || e.response.bodySize || 0
      const decodedSize =
        e.response.content && typeof e.response.content.size === "number"
          ? e.response.content.size
          : 0
      return {
        name: url,
        method: e.request.method,
        status: e.response.status,
        protocol: url.split(":")[0],
        type: e._resourceType || e.response.content.mimeType || "",
        transferSize,
        decodedSize,
        startTime: e.startedDateTime || null,
        endTime:
          e._timings &&
          typeof e._timings.receive === "number" &&
          e.startedDateTime
            ? new Date(
                new Date(e.startedDateTime).getTime() + e._timings.receive
              ).toISOString()
            : null,
        duration: e.time,
        initiator: e._initiator && e._initiator.type ? e._initiator.type : null,
        fromCache: e.cache && Object.keys(e.cache).length > 0
        // headers: e.request.headers, // Uncomment jika ingin headers
      }
    })
    const jsonData = {
      name: target.name,
      url: target.url,
      date: new Date().toISOString(),
      browser: "chromium",
      requestCount: entries.length,
      totalTransferSize,
      totalDecodedSize,
      timings: {
        finish: entries.reduce(
          (max: number, e: any) => Math.max(max, e.time),
          0
        ),
        domContentLoaded: pageTimings.onContentLoad || null,
        load: pageTimings.onLoad || null
      },
      requests
    }
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonData, null, 2))
    console.log(
      `Network HAR, CSV, and JSON saved to ${OUTPUT_HAR}, ${OUTPUT_CSV}, and ${OUTPUT_JSON}`
    )
  }
}

main()
