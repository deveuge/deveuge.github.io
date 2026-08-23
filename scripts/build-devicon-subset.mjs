// Subsets the devicon icon font down to the handful of glyphs used in
// src/lib/skills.ts, instead of shipping the full ~1.5MB font. Regenerates
// public/fonts/devicon-subset.woff2 and public/css/devicon-subset.css on
// every build, so a new devicon-* class added to skills.ts is picked up
// automatically.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import subsetFont from "subset-font"

const root = path.dirname(fileURLToPath(import.meta.url))
const resolve = p => path.join(root, "..", p)

const skillsSource = readFileSync(resolve("src/lib/skills.ts"), "utf8")
const usedClasses = [...new Set([...skillsSource.matchAll(/devicon-([a-z0-9-]+)/g)].map(m => m[1]))]

if (usedClasses.length === 0) {
  throw new Error("No devicon-* classes found in src/lib/skills.ts")
}

const deviconCss = readFileSync(resolve("node_modules/devicon/devicon.min.css"), "utf8")
const codepointByClass = new Map()
for (const match of deviconCss.matchAll(/([^{}]+)\{content:"([^"]*)"\}/g)) {
  const content = match[2]
  for (const selector of match[1].split(",")) {
    const classMatch = selector.match(/\.devicon-([a-z0-9-]+):before/)
    if (classMatch) codepointByClass.set(classMatch[1], content)
  }
}

const rules = usedClasses.map(name => {
  const glyph = codepointByClass.get(name)
  if (!glyph) throw new Error(`Unknown devicon class: devicon-${name}`)
  return { name, glyph }
})

const sourceFont = readFileSync(resolve("node_modules/devicon/fonts/devicon.ttf"))
const subsetBuffer = await subsetFont(sourceFont, rules.map(r => r.glyph).join(""), { targetFormat: "woff2" })

mkdirSync(resolve("public/fonts"), { recursive: true })
writeFileSync(resolve("public/fonts/devicon-subset.woff2"), subsetBuffer)

const css = `@font-face{font-family:"devicon-subset";src:url("/fonts/devicon-subset.woff2") format("woff2");font-weight:normal;font-style:normal;font-display:swap}
[class^=devicon-],[class*=" devicon-"]{font-family:"devicon-subset" !important;speak:never;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
${rules.map(r => `.devicon-${r.name}:before{content:"${r.glyph}"}`).join("\n")}
`

mkdirSync(resolve("public/css"), { recursive: true })
writeFileSync(resolve("public/css/devicon-subset.css"), css)

console.log(`devicon subset: ${usedClasses.length} icons, ${(subsetBuffer.length / 1024).toFixed(1)} KB`)
