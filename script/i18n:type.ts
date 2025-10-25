#!/usr/bin/env bun

// Script untuk generate translation types dari translation files
// Jalankan: bun run script/gen:i18n-types.ts

import { readdir, readFile, writeFile } from "fs/promises"
import { join, relative } from "path"

interface TranslationFile {
  namespace: string
  keys: string[]
}

async function scanTranslationFiles(
  dir: string,
  basePath = ""
): Promise<TranslationFile[]> {
  const files: TranslationFile[] = []

  try {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subFiles = await scanTranslationFiles(
          fullPath,
          join(basePath, entry.name)
        )
        files.push(...subFiles)
      } else if (entry.name.endsWith(".json")) {
        // Parse JSON translation file
        try {
          const content = await readFile(fullPath, "utf-8")
          const translations = JSON.parse(content)
          const keys = Object.keys(translations)

          // Create namespace from file path
          const namespace = join(
            basePath,
            entry.name.replace(".json", "")
          ).replace(/\\/g, "/") // Normalize path separators

          files.push({ namespace, keys })
        } catch (error) {
          console.warn(`Failed to parse ${fullPath}:`, error)
        }
      }
    }
  } catch (error) {
    console.warn(`Failed to scan directory ${dir}:`, error)
  }

  return files
}

async function generateTypeDefinitions(): Promise<void> {
  console.log("🔍 Scanning translation files...")

  const translationDirs = ["public/locale/en", "public/locale/id"]

  const allFiles: TranslationFile[] = []

  for (const dir of translationDirs) {
    const files = await scanTranslationFiles(dir)
    allFiles.push(...files)
  }

  // Group by namespace and merge keys
  const namespaceMap = new Map<string, Set<string>>()

  for (const file of allFiles) {
    if (!namespaceMap.has(file.namespace)) {
      namespaceMap.set(file.namespace, new Set())
    }

    for (const key of file.keys) {
      namespaceMap.get(file.namespace)!.add(key)
    }
  }

  // Generate TypeScript interface
  const interfaces: string[] = []

  for (const [namespace, keys] of namespaceMap.entries()) {
    const keysList = Array.from(keys).sort()
    const keysType = keysList.map((key) => `'${key}'`).join(" | ")
    interfaces.push(`    '${namespace}': ${keysType}`)
  }

  const typeDefinition = `// Auto-generated translation keys - jangan edit manual
// Generated at: ${new Date().toISOString()}
// Run: bun run script/gen:i18n-types.ts

declare global {
  interface TranslationNamespaces {
${interfaces.join("\n")}
  }

  type TranslationKey<T extends keyof TranslationNamespaces> = TranslationNamespaces[T]
  
  // Helper type untuk mengextract semua possible keys
  type AllTranslationKeys = {
    [K in keyof TranslationNamespaces]: \`\${K}:\${TranslationNamespaces[K]}\`
  }[keyof TranslationNamespaces]
}

export {}
`

  // Write to file
  const outputPath = "src/types/i18n.d.ts"
  await writeFile(outputPath, typeDefinition)

  console.log("✅ Generated translation types:")
  console.log(`   - ${namespaceMap.size} namespaces`)
  console.log(
    `   - ${Array.from(namespaceMap.values()).reduce(
      (sum, keys) => sum + keys.size,
      0
    )} total keys`
  )
  console.log(`   - Output: ${outputPath}`)
}

// Run the script
generateTypeDefinitions().catch(console.error)

export { generateTypeDefinitions }
