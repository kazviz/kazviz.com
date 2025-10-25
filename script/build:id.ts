import { writeFileSync, existsSync, readFileSync } from "fs"
import { join } from "path"

// Accept explicit arg: bun run script/build:id.ts <build-id>
const arg = process.argv[2]

// Prefer explicit arg, then VITE_BUILD_ID env, then commit SHA
const envVersion =
  arg || process.env.VITE_BUILD_ID || process.env.VITE_COMMIT_SHA

let version = envVersion

if (!version) {
  // fallback short random token
  version = Math.random().toString(36).slice(2, 10)
}

const envPath = join(process.cwd(), ".env")
let content = ""
if (existsSync(envPath)) {
  try {
    content = readFileSync(envPath, "utf-8")
  } catch {}
}

// Replace existing VITE_BUILD_ID if present, otherwise append
const lines = content.split(/\r?\n/)
let found = false
const outLines = lines.filter(Boolean).map((l) => {
  if (l.startsWith("VITE_BUILD_ID=")) {
    found = true
    return `VITE_BUILD_ID=${version}`
  }
  return l
})
if (!found) outLines.push(`VITE_BUILD_ID=${version}`)

writeFileSync(envPath, outLines.join("\n") + "\n")
console.log(`Wrote VITE_BUILD_ID=${version} to ${envPath}`)
