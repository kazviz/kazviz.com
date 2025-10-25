import { writeFileSync, mkdirSync } from "fs"
import { execSync } from "child_process"
import { join } from "path"

// Determine version: prefer VITE_BUILD_ID, then commit SHA, then app version
const envVersion =
  process.env.VITE_BUILD_ID ||
  process.env.VITE_COMMIT_SHA ||
  process.env.VITE_APP_VERSION
let version = envVersion

if (!version) {
  try {
    const sha = execSync("git rev-parse --short HEAD", {
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim()
    if (sha) version = sha
  } catch {
    // ignore
  }
}

if (!version) {
  // fallback to a short alphanumeric random token to avoid predictable timestamps
  version = Math.random().toString(36).slice(2, 10)
}

const outDir = join(process.cwd(), "public")
try {
  mkdirSync(outDir, { recursive: true })
} catch {}
const outPath = join(outDir, "build.json")
writeFileSync(outPath, JSON.stringify({ version }, null, 2) + "\n")
console.log(`Wrote build.json with version=${version} to ${outPath}`)
