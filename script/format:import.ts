#!/usr/bin/env bun
/**
 * Import sorter sesuai aturan:
 * 1. Import destructured (mengandung { ... }) dulu.
 * 2. Lalu import non-destruct (default / namespace / side-effect), kecuali file SCSS selalu paling bawah grup scss.
 * 3. Terakhir import SCSS (".scss").
 * 4. Tiap grup diurutkan: semakin panjang total karakter statement (tanpa trailing newline) SEMAKIN ATAS.
 *    (Descending by length). Jika tie, bandingkan panjang bagian sebelum kata 'from'.
 * 5. Jika tidak ada grup destruct, maka grup non-destruct diurut desc berdasarkan panjang seperti di atas.
 * 6. Hanya memodifikasi blok import paling atas berturut-turut. Sisanya tidak disentuh.
 *
 * Pemakaian: bun run script/import:sort.ts <file1> <file2> ...
 */
import { promises as fs } from "fs"
import * as path from "path"
import { statSync, readdirSync } from "fs"

interface ImportLine {
  raw: string
  length: number
  preFromLength: number // length before ' from '
  hasBraces: boolean
  isScss: boolean
  isPlain: boolean // non-destruct & not scss
}

const FROM_RE = /\bfrom\b/
const IMPORT_RE = /^\s*import\b/
// Termasuk pattern: import { ... } from ...  dan  import type { ... } from ...
const BRACE_RE = /import\s*(type\s*)?\{/
const SCSS_RE = /['"].+\.scss['"];?$/

// Compact is the default behavior (no blank line between import groups).
// Use --no-compact to preserve blank lines between groups.
const COMPACT = !process.argv.includes("--no-compact")

const VERBOSE = process.argv.includes("--verbose")

async function processFile(file: string) {
  let text: string
  try {
    text = await fs.readFile(file, "utf8")
  } catch {
    return // skip unreadable
  }
  const lines = text.split(/\r?\n/)

  // Kumpulkan blok import teratas berurutan
  const importLines: string[] = []
  let endIndex = -1
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === "") {
      // Izinkan blank line di dalam blok import selama belum ada code non-import
      if (importLines.length === 0) {
        continue // leading blank lines skip
      }
      importLines.push(line)
      continue
    }
    if (IMPORT_RE.test(line)) {
      importLines.push(line)
      endIndex = i
      continue
    }
    // berhenti kalau ada line non-import setelah kita mulai
    if (importLines.length) break
    else break // no imports at top
  }

  if (importLines.length === 0) return // nothing to do

  // Gabungkan multi-line import? Untuk kesederhanaan: hanya proses single-line import; jika multi-line, jangan ubah file.
  const multiLine = importLines.some(
    (l) => l.includes("import") && l.endsWith("{")
  )
  if (multiLine) return // skip complex cases (bisa dikembangkan nanti)

  // Parse tiap baris import (skip blank)
  const parsed: ImportLine[] = []
  for (const raw of importLines) {
    if (!raw.trim()) continue
    if (!IMPORT_RE.test(raw)) continue
    const hasBraces = BRACE_RE.test(raw)
    const isScss = SCSS_RE.test(raw)
    const isPlain = !hasBraces && !isScss
    const length = raw.length
    const preFromLength = (() => {
      const m = raw.split(FROM_RE)[0]
      return m ? m.length : length
    })()
    parsed.push({ raw, length, preFromLength, hasBraces, isScss, isPlain })
  }

  if (parsed.length === 0) return

  const groupDestruct = parsed.filter((p) => p.hasBraces && !p.isScss)
  const groupNonDestruct = parsed.filter((p) => p.isPlain)
  const groupScss = parsed.filter((p) => p.isScss)

  // Helper: extract module path from an import line
  function extractModulePath(line: string) {
    const m = line.match(/from\s*['"]([^'"]+)['"]/)
    if (m) return m[1]
    // side-effect import like: import 'something'
    const m2 = line.match(/import\s+['"]([^'"]+)['"]/)
    return m2 ? m2[1] : ""
  }

  // Subgroup non-destruct by source type so packages (icons) stay together,
  // then aliases (~, @) and then relative imports.
  const nonDestructGroups: Record<string, ImportLine[]> = {
    external: [],
    alias: [],
    relative: [],
    other: []
  }
  for (const p of groupNonDestruct) {
    const mod = extractModulePath(p.raw)
    if (!mod) {
      nonDestructGroups.other.push(p)
    } else if (mod.startsWith(".")) {
      nonDestructGroups.relative.push(p)
    } else if (mod.startsWith("~") || mod.startsWith("@")) {
      nonDestructGroups.alias.push(p)
    } else {
      nonDestructGroups.external.push(p)
    }
  }

  function sortGroup(list: ImportLine[]) {
    return list.sort((a, b) => {
      if (b.length !== a.length) return b.length - a.length // desc by length
      if (b.preFromLength !== a.preFromLength)
        return b.preFromLength - a.preFromLength
      return a.raw.localeCompare(b.raw) // stable tie-breaker
    })
  }

  const hasDestruct = groupDestruct.length > 0
  const sortedDestruct = sortGroup(groupDestruct)
  // Always sort non-destruct imports (grouped by external/alias/relative)
  let sortedNonDestruct: ImportLine[] = []
  {
    // sort each subgroup and append in preferred order
    sortedNonDestruct.push(...sortGroup(nonDestructGroups.external))
    sortedNonDestruct.push(...sortGroup(nonDestructGroups.alias))
    sortedNonDestruct.push(...sortGroup(nonDestructGroups.relative))
    sortedNonDestruct.push(...sortGroup(nonDestructGroups.other))
  }
  const sortedScss = sortGroup(groupScss) // still sort internal order

  const newLines: string[] = []
  if (sortedDestruct.length) {
    newLines.push(...sortedDestruct.map((p) => p.raw))
  }
  if (sortedNonDestruct.length) {
    if (newLines.length && !COMPACT) newLines.push("")
    newLines.push(...sortedNonDestruct.map((p) => p.raw))
  }
  if (sortedScss.length) {
    if (newLines.length && !COMPACT) newLines.push("")
    newLines.push(...sortedScss.map((p) => p.raw))
  }

  // Normalize trailing blank lines after the import block: remove any
  // original consecutive blank lines and ensure exactly one blank line
  // separates imports from the rest of the file.
  // Find first non-blank line after the original imports
  let j = endIndex + 1
  while (j < lines.length && lines[j].trim() === "") j++
  const after = lines.slice(j)

  // Ensure exactly one blank line after imports
  if (newLines.length === 0 || newLines[newLines.length - 1].trim() !== "") {
    newLines.push("")
  }

  const newText = [...newLines, ...after].join("\n")
  if (newText !== text) {
    await fs.writeFile(file, newText, "utf8")
    console.log("[sorted]", path.relative(process.cwd(), file))
  } else if (VERBOSE) {
    console.log("[nochange]", path.relative(process.cwd(), file))
  }
}

function collectAll(
  root: string,
  acc: string[] = [],
  baseIgnores: RegExp[]
): string[] {
  let entries: string[]
  try {
    entries = readdirSync(root)
  } catch {
    return acc
  }
  for (const e of entries) {
    const full = path.join(root, e)
    if (baseIgnores.some((r) => r.test(full))) continue
    let st
    try {
      st = statSync(full)
    } catch {
      continue
    }
    if (st.isDirectory()) collectAll(full, acc, baseIgnores)
    else if (/\.(t|j)sx?$/.test(e)) acc.push(full)
  }
  return acc
}

async function main() {
  const argv = process.argv.slice(2)
  const allFlag = argv.includes("--all")
  const explicit = argv.filter((a) => !a.startsWith("-"))
  let files: string[] = []
  if (allFlag || explicit.length === 0) {
    files = collectAll(
      process.cwd(),
      [],
      [
        /node_modules\b/,
        /\.git\b/,
        /dist\b/,
        /\.vinxi\b/,
        /coverage\b/,
        /\.output\b/,
        /bun.lock/,
        /\.cache\b/,
        /public\/font\//
      ]
    )
  } else {
    files = explicit.filter((f) => /\.(t|j)sx?$/.test(f))
  }
  if (!files.length) return
  await Promise.all(files.map(processFile))
}

main()
