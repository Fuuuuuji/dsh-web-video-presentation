// generate-theme-previews.mjs — regenerate the 23 theme preview SVGs (in
// theme-previews/) from each theme.json `preview` palette. PNGs are produced
// from the SVGs with macOS `sips`:
//
//   for f in theme-previews/*.svg; do
//     sips -s format png "$f" --out "${f%.svg}.png" >/dev/null
//   done
//
// (Other platforms: `rsvg-convert` or `qlmanage` can rasterize SVG→PNG.)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const THEMES = join(ROOT, 'assets/web-video-presentation/themes')
const OUT = join(ROOT, 'theme-previews')
mkdirSync(OUT, { recursive: true })

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const ids = readdirSync(THEMES).filter((d) => statSync(join(THEMES, d)).isDirectory()).sort()
for (const id of ids) {
  const meta = JSON.parse(readFileSync(join(THEMES, id, 'theme.json'), 'utf8'))
  const { shell, surface, text, accent } = meta.preview ?? {}
  if (!shell || !surface || !text || !accent) { console.error(`skip ${id}: missing preview colors`); continue }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <rect width="640" height="360" fill="${shell}"/>
  <rect x="44" y="30" width="552" height="300" rx="4" fill="${surface}"/>
  <text x="66" y="66" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="13" letter-spacing="2.5" fill="${text}" opacity="0.55">THEME · ${esc(id)}</text>
  <line x1="66" y1="82" x2="574" y2="82" stroke="${text}" stroke-opacity="0.18" stroke-width="1"/>
  <text x="66" y="218" font-family="Georgia,'Times New Roman',serif" font-size="110" font-weight="bold" fill="${accent}">Aa</text>
  <text x="66" y="252" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="19" fill="${text}">The quick brown fox</text>
  <text x="66" y="280" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="14" fill="${text}" opacity="0.5">jumps over the lazy dog</text>
  <rect x="66" y="304" width="44" height="4" fill="${accent}"/>
</svg>`
  writeFileSync(join(OUT, `${id}.svg`), svg)
}
console.log(`generated ${ids.length} SVGs in ${OUT}`)
