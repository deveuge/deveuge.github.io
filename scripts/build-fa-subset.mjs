// Subsets the vendored Font Awesome Free fonts (kept under vendor/fontawesome/,
// not shipped) down to the handful of glyphs actually used across src/ —
// instead of shipping the full ~100KB CSS + ~950KB of TTF/WOFF2 covering all
// four families (solid, regular, brands, v4compatibility). Regenerates
// public/fonts/fa-*-subset.woff2 and public/css/fontawesome-subset.css on
// every build, so a newly used icon is picked up automatically.
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import subsetFont from "subset-font"

const root = path.dirname(fileURLToPath(import.meta.url))
const resolve = p => path.join(root, "..", p)

function collectFiles(dir, exts, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) collectFiles(full, exts, out)
    else if (exts.some(ext => entry.endsWith(ext))) out.push(full)
  }
  return out
}

const source = collectFiles(resolve("src"), [".astro", ".css", ".ts", ".tsx"])
  .map(f => readFileSync(f, "utf8"))
  .join("\n")

// Icons referenced by class, e.g. `fa-solid fa-file-pdf` / `fa-regular fa-file-pdf`.
const usedNames = new Set()
const classFamilies = new Set()
for (const m of source.matchAll(/fa-(solid|regular)\s+fa-([a-z0-9-]+)/g)) {
  classFamilies.add(`${m[1]}:${m[2]}`)
  usedNames.add(m[2])
}

// Icons referenced by a raw codepoint, e.g. `content: "\f062"` — these only
// need the @font-face to exist, no generated utility class (the component's
// own <style> already sets font-family/content directly, sometimes as two
// separate rules for the same selector, e.g. ProjectCard.astro's
// `:nth-of-type(1)::before { content: ... }` alongside a shared
// `font-family`/`font-weight` rule — so codepoints aren't matched per-block.
// Every raw-codepoint icon in this codebase happens to use a bold/900 weight
// (there's no raw-codepoint usage of the regular/400 family), so all of them
// are treated as "solid".
const codepointFamilies = new Set()
for (const match of source.matchAll(/content:\s*["']\\(f[0-9a-f]+)["']/g)) {
  codepointFamilies.add(`solid:${match[1]}`)
}

// Resolve class-based icon names to codepoints via the vendored FA CSS.
const faCss = readFileSync(resolve("vendor/fontawesome/css/fontawesome-all.min.css"), "utf8")
const codepointByName = new Map()
for (const match of faCss.matchAll(/([^{}]+)\{content:"\\([0-9a-fA-F]+)"\}/g)) {
  const codepoint = match[2]
  for (const selector of match[1].split(",")) {
    const nameMatch = selector.match(/\.fa-([a-z0-9-]+):before$/)
    if (nameMatch) codepointByName.set(nameMatch[1], codepoint)
  }
}

const byFamily = { solid: new Set(), regular: new Set() }
for (const key of classFamilies) {
  const [family, name] = key.split(":")
  const codepoint = codepointByName.get(name)
  if (!codepoint) throw new Error(`Unknown Font Awesome icon: fa-${family} fa-${name}`)
  byFamily[family].add(codepoint)
}
for (const key of codepointFamilies) {
  const [family, codepoint] = key.split(":")
  byFamily[family].add(codepoint)
}

if (byFamily.solid.size === 0 && byFamily.regular.size === 0) {
  throw new Error("No Font Awesome icon usage found in src/")
}

mkdirSync(resolve("public/fonts"), { recursive: true })

const FAMILY_FILES = { solid: "fa-solid-900.ttf", regular: "fa-regular-400.ttf" }
const FAMILY_WEIGHTS = { solid: 900, regular: 400 }

let css = ""
let totalBytes = 0
for (const [family, codepoints] of Object.entries(byFamily)) {
  if (codepoints.size === 0) continue

  const sourceFont = readFileSync(resolve(`vendor/fontawesome/webfonts/${FAMILY_FILES[family]}`))
  const chars = [...codepoints].map(cp => String.fromCodePoint(parseInt(cp, 16))).join("")
  const subsetBuffer = await subsetFont(sourceFont, chars, { targetFormat: "woff2" })
  totalBytes += subsetBuffer.length

  const fileName = `fa-${family}-subset.woff2`
  writeFileSync(resolve(`public/fonts/${fileName}`), subsetBuffer)

  css += `@font-face{font-family:"Font Awesome 6 Free";src:url("/fonts/${fileName}") format("woff2");font-weight:${FAMILY_WEIGHTS[family]};font-style:normal;font-display:swap}\n`
}

css += `.fa-solid,.fa-regular{display:inline-block;font-style:normal;font-variant:normal;line-height:1;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}\n`
if (byFamily.solid.size > 0) css += `.fa-solid{font-family:"Font Awesome 6 Free";font-weight:900}\n`
if (byFamily.regular.size > 0) css += `.fa-regular{font-family:"Font Awesome 6 Free";font-weight:400}\n`
for (const name of usedNames) {
  css += `.fa-${name}:before{content:"\\${codepointByName.get(name)}"}\n`
}

mkdirSync(resolve("public/css"), { recursive: true })
writeFileSync(resolve("public/css/fontawesome-subset.css"), css)

const iconCount = byFamily.solid.size + byFamily.regular.size
console.log(`fontawesome subset: ${iconCount} icons, ${(totalBytes / 1024).toFixed(1)} KB`)
