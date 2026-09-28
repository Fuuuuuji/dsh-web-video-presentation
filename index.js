/**
 * Web Video Presentation — a DSH plugin that ships the `web-video-presentation`
 * skill as a bundled skill provider.
 *
 * The provider owns the packaged assets directory (SKILL.md + references/ +
 * templates/ + themes/ + scripts/), so the model resolves every relative path
 * in the skill body against that directory via `resourceBase`. An optional
 * `assetRoot` config lets a packaged (ASAR/SEA) deployment point at an external
 * copy of the assets, matching the `skill-office` pattern.
 *
 * @module @local/web-video-presentation
 */

import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { isAbsolute, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SKILL_NAME = 'web-video-presentation'
const PROVIDER = 'dsh-web-video-presentation'
/** Matches the stable `BUNDLED_SKILL_RANK` export of `@deepseek-ai/dsh-skill`. */
const BUNDLED_SKILL_RANK = 600

export const name = 'web-video-presentation-skill'
export const inject = ['skills']

/** Extract the `description` line from the skill's YAML frontmatter. */
function frontmatterDescription(raw, path) {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  if (frontmatter?.[1] === undefined) {
    throw new Error(`${name}: ${path} has no YAML frontmatter`)
  }
  const description = /^description:\s*(.+)$/m.exec(frontmatter[1])?.[1]?.trim()
  if (description === undefined || description.length === 0) {
    throw new Error(`${name}: ${path} has no description`)
  }
  return description
}

/** Strip the YAML frontmatter, returning the markdown instruction body. */
function stripFrontmatter(raw) {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim()
}

/** Register the bundled skill with a resource directory owned by this package. */
export function apply(ctx, config = {}) {
  const assetRoot = config.assetRoot ?? fileURLToPath(new URL('./assets/', import.meta.url))
  if (!isAbsolute(assetRoot)) {
    throw new Error(`${name}: assetRoot must be an absolute directory`)
  }
  const skillDir = join(assetRoot, SKILL_NAME)
  const skillPath = join(skillDir, 'SKILL.md')
  const description = frontmatterDescription(readFileSync(skillPath, 'utf8'), skillPath)

  const candidate = {
    name: SKILL_NAME,
    description,
    invocation: { modelInvocable: true, userInvocable: true },
    provider: PROVIDER,
    source: 'bundled',
    rank: BUNDLED_SKILL_RANK,
    resourceBase: { kind: 'directory', path: skillDir },
    locator: skillPath,
  }
  const provider = {
    name: PROVIDER,
    list: () => Promise.resolve([candidate]),
    async get(entry, options) {
      const { rank: _rank, locator, ...summary } = entry
      const raw = await readFile(locator, { encoding: 'utf8', signal: options.signal })
      return { ...summary, content: stripFrontmatter(raw) }
    },
  }
  ctx.skills.registerProvider(() => provider)
}
