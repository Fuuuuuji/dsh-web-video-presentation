// build-readmes.mjs — regenerate README.md + README.zh-CN.md (and theme
// gallery) from the theme.json files. Run from the repo root after changing
// themes. Theme preview PNGs are generated separately (see
// scripts/generate-theme-previews.mjs).
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const THEMES = join(ROOT, 'assets/web-video-presentation/themes')
const DARK = ['midnight-press', 'dark-botanical', 'chalk-garden', 'blueprint', 'terminal-green', 'neon-cyber', 'bold-signal', 'creative-voltage']
const LIGHT = ['paper-press', 'newsroom', 'monochrome-print', 'vintage-editorial', 'sunset-zine', 'pastel-dream', 'warm-keynote', 'electric-studio', 'bauhaus-bold', 'swiss-ikb', 'dune', 'indigo-porcelain', 'forest-ink', 'kraft-paper', 'split-canvas']

const meta = {}
for (const id of [...DARK, ...LIGHT]) {
  meta[id] = JSON.parse(readFileSync(join(THEMES, id, 'theme.json'), 'utf8'))
}

function cell(id, body) {
  return `    <td align="center" width="50%" valign="top">\n      <img src="theme-previews/${id}.png" width="100%" alt="${id}"/>\n      <br/><sub>${body}</sub>\n    </td>`
}
function gallery(ids, en) {
  const rows = []
  for (let i = 0; i < ids.length; i += 2) {
    const a = ids[i]; const b = ids[i + 1]
    const c = (id) => cell(id, en
      ? `<code>${id}</code> — ${meta[id].description}`
      : `<strong>${meta[id].nameZh}</strong> · <code>${id}</code> — ${meta[id].descriptionZh}<br/>适合：${meta[id].bestFor.slice(0, 3).join(' / ')}`)
    rows.push(`  <tr>\n${c(a)}\n${b ? c(b) : '    <td></td>'}\n  </tr>`)
  }
  return `<table>\n${rows.join('\n')}\n</table>`
}

const darkEn = gallery(DARK, true)
const lightEn = gallery(LIGHT, true)
const darkZh = gallery(DARK, false)
const lightZh = gallery(LIGHT, false)

const readmeEn = `# Web Video Presentation · DSH Plugin

**One command turns an article or script into a cinematic web video — 16:9, animated, with optional AI voiceover, ready to screen-record.**

A native [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) skill plugin. Give it an article (or a script you already wrote), and it walks you through a disciplined workflow that produces a click-driven **16:9 stage** you record straight to video — no camera, no editing, no "slide deck" feel.

> 中文说明见 [README.zh-CN.md](README.zh-CN.md)

---

## Install — one command

\`\`\`
github:Fuuuuuji/dsh-web-video-presentation
\`\`\`

Paste that single spec into DSH's plugin manager (\`install_bundle\`) — done. Then just say:

> Turn this article into a web video presentation.

…or invoke \`/web-video-presentation\` directly.

---

## What it makes

Not a slide deck. A **video disguised as a webpage**:

- **Fixed 1920×1080 stage** — one idea per click, every beat full-screen: big type, generous whitespace, motion in every frame.
- **Content-driven animation** — numbers count up, charts grow, contrasts get cut in half, flows light up node-by-node. The motion comes from *what you're saying*, not a template.
- **23 hand-designed themes** — each with its own design DNA, not a recolor (gallery below).
- **Hidden chrome** — progress bar and controls appear only on hover, so the recording stays clean.
- **Optional AI voiceover** — MiniMax & OpenAI built in, plus drop-in snippets for ElevenLabs / edge-tts / macOS \`say\` / Azure / Google.
- **One-take recording** — \`?auto=1\` plays the whole thing top-to-bottom, audio-synced, hands-free.

---

## Demo — a real one

### I watched OpenAI DevDay 2026 with DeepSeek. This is what it thought mattered most.

**Input:** one announcement page ([openai.com/index/devday-2026-recap](https://openai.com/index/devday-2026-recap/)),
plus 20 of its linked subpages, crawled for detail.
**Output:** a **10-chapter / 64-step / 9:49** English web video — AI voiceover, theme \`bold-signal\`,
recorded in one take with \`?auto=1\`.

<a href="https://github.com/Fuuuuuji/dsh-web-video-presentation/releases/latest"><img src="demo/preview.webp" width="100%" alt="17-second preview of the DevDay 2026 recap"/></a>

<sub>17-second preview · <a href="https://github.com/Fuuuuuji/dsh-web-video-presentation/releases/latest"><b>▶ watch the full 9:49 video</b></a> (1080p, 47 MB)</sub>

<table>
  <tr>
    <td width="50%"><img src="demo/still-00.webp" width="100%" alt="cold open"/><br/><sub><b>Cold open</b> — the whole event in one frame: 20+ announcements, and the thesis</sub></td>
    <td width="50%"><img src="demo/still-16.webp" width="100%" alt="benchmark chart"/><br/><sub><b>Numbers, drawn honestly</b> — a zero-based chart that states its own axis</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="demo/still-29.webp" width="100%" alt="API fan diagram"/><br/><sub><b>Structure → motion</b> — one question fanning out into finite answers</sub></td>
    <td width="50%"><img src="demo/still-44.webp" width="100%" alt="collaborative slides"/><br/><sub><b>Real product UI</b> — official key art, never a fabricated screenshot</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="demo/still-59.webp" width="100%" alt="Daybreak partner wall"/><br/><sub><b>Density when it earns it</b> — 31 partner logos, all of them whole</sub></td>
    <td width="50%"><img src="demo/still-63.webp" width="100%" alt="closing frame"/><br/><sub><b>An ending, not a summary slide</b> — the closing beat of a 9-minute piece</sub></td>
  </tr>
</table>

What the run actually exercised: every chapter was written by a separate worker, then attacked by an
independent reviewer before it shipped. That loop caught a theme import-order bug that silently killed
every theme personality knob, a chart axis that misrepresented a 6.4-point delta, a diagram drawn at
1.27:1 contrast, and a closing progress bar that outran its own narration. Build notes:
[\`demo/NOTES.md\`](demo/NOTES.md).

---

## Why it's different

| | |
|---|---|
| **DSH-native** | One git spec, no config, survives restarts |
| **Token-lean** | Instruction surface **−60%**, catalog description **−75%** — measured, not claimed |
| **Bilingual voiceover** | Chinese (B 站-style) *and* English (YouTube-style) guides, each with its own fingerprints |
| **Methodology, not a kit** | Hard checkpoints + self-review + single source of truth — output reads like a person narrating |

---

## Workflow

\`\`\`
article / script
   ↓  one pass → voiceover script + chapter outline
   ↓  [align: script · outline · theme · assets · dev mode]
   ↓  chapter 1 (anchor) → accept → chapters 2..N (sequential or parallel)
   ↓  [align: voiceover audio?]
   ↓  optional TTS  →  ?auto=1 one-take screen recording
\`\`\`

---

## Themes — 23 hand-designed palettes

*Preview images are color-palette renders of each theme's real tokens (\`shell\` / \`surface\` / \`text\` / \`accent\`), not screenshots.*

### Dark · 8

${darkEn}

### Light · 15

${lightEn}

---

## What's inside

\`\`\`
assets/web-video-presentation/
├── SKILL.md                    # the skill body (invoked, condensed)
├── references/                 # per-phase rules (lazy-loaded)
│   ├── SCRIPT-STYLE.md         # Chinese voiceover style
│   ├── SCRIPT-STYLE-EN.md      # English voiceover style
│   ├── CHAPTER-CRAFT.md        # single entry for chapter design
│   ├── OUTLINE-FORMAT.md / THEMES.md / THEME-INDEX.md
│   ├── AUDIO.md / RECORDING.md
│   └── EXAMPLES/
├── themes/                     # 23 themes (theme.json + tokens.css)
├── templates/                  # Vite + React + TS scaffold
└── scripts/scaffold.sh         # one-command project scaffold
\`\`\`

---

## Requirements

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (provides the \`skills\` service)
- Node.js + npm (for the generated project's \`npm install\` / \`npm run dev\`)

## License & attribution

MIT. The DSH plugin shell and the skill instructions are original to this repo; the \`themes/\`, \`templates/\`, \`scripts/scaffold.sh\` and \`references/EXAMPLES/\` derive from [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) (MIT) — see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
`

const readmeZh = `# Web Video Presentation · DSH 插件

**一行命令，把文章或口播稿做成有电影感的网页视频——16:9、有动效、可选 AI 口播，直接录屏成片。**

DeepSeek Harness 原生 skill 插件。给它一篇文章（或你写好的口播稿），它会按一套完整工作流，产出一个点击驱动的 **16:9 舞台**，你直接录屏变成视频——不用出镜、不用剪辑、不像 PPT。

> For English, see [README.md](README.md)

---

## 安装 —— 一行命令

\`\`\`
github:Fuuuuuji/dsh-web-video-presentation
\`\`\`

把这一条 spec 粘贴进 DSH 的插件管理器（\`install_bundle\`）即可。然后对 Agent 说：

> 把这篇文章做成网页视频演示。

…或直接触发 \`/web-video-presentation\`。

---

## 它做出什么

不是 PPT，是「伪装成视频的网页」：

- **固定 1920×1080 舞台** —— 每点击一步、一步占满一屏：大字、留白、每屏都有动效。
- **内容驱动动画** —— 数字递增、图表生长、对比切开、流程节点逐个点亮。动作来自「你在讲什么」，不是模板。
- **23 套手工设计主题** —— 每套独立设计 DNA，绝非换色（见下方画廊）。
- **隐藏式控件** —— 进度条/翻页器悬浮才出现，录屏画面干净。
- **可选 AI 口播** —— 内置 MiniMax + OpenAI，附 ElevenLabs / edge-tts / macOS \`say\` / Azure / Google 现成片段。
- **一镜到底录屏** —— \`?auto=1\` 全片自动播、音画天然同步。

---

## Demo —— 一个真实产出

### 我和 DeepSeek 一起听了 OpenAI DevDay 2026，这是它觉得最核心的内容

**输入**：一篇官方发布页（[openai.com/index/devday-2026-recap](https://openai.com/index/devday-2026-recap/)），
下探并抓取 20 个关键子页面。
**产出**：**10 章 / 64 步 / 9 分 49 秒**的英文网页视频 —— AI 口播、主题 \`bold-signal\`、
用 \`?auto=1\` 一镜到底录制。

<a href="https://github.com/Fuuuuuji/dsh-web-video-presentation/releases/latest"><img src="demo/preview.webp" width="100%" alt="DevDay 2026 recap 的 17 秒预览"/></a>

<sub>17 秒预览 · <a href="https://github.com/Fuuuuuji/dsh-web-video-presentation/releases/latest"><b>▶ 看完整 9 分 49 秒视频</b></a>（1080p，47 MB）</sub>

<table>
  <tr>
    <td width="50%"><img src="demo/still-00.webp" width="100%" alt="冷开场"/><br/><sub><b>冷开场</b> —— 一屏装下整场发布会：20+ 条公告，以及全片论点</sub></td>
    <td width="50%"><img src="demo/still-16.webp" width="100%" alt="跑分图"/><br/><sub><b>数字要诚实</b> —— 从 0 起算的坐标轴，并且自己标注了刻度</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="demo/still-29.webp" width="100%" alt="API 扇形图"/><br/><sub><b>结构 → 动作</b> —— 一个问题扇出成有限个既定答案</sub></td>
    <td width="50%"><img src="demo/still-44.webp" width="100%" alt="协作幻灯片"/><br/><sub><b>真素材</b> —— 全部用官方发布图，没有一张假截图</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="demo/still-59.webp" width="100%" alt="Daybreak 合作方墙"/><br/><sub><b>该密就密</b> —— 31 个合作方 logo，一个都没被裁掉</sub></td>
    <td width="50%"><img src="demo/still-63.webp" width="100%" alt="收尾帧"/><br/><sub><b>是结尾，不是总结页</b> —— 9 分钟片子的最后一个落点</sub></td>
  </tr>
</table>

这一轮实际跑通的东西：每一章由独立 worker 实现，再交给另一个独立 reviewer 对抗式审查后才算过。
这个回路抓出了「主题 import 顺序把主题人格参数全部覆盖」的隐蔽 bug、把 6.4 个百分点画成 13% 的
图表坐标轴、对比度只有 1.27:1 的示意图，以及一条比自己口播还长的收尾进度条。构建记录见
[\`demo/NOTES.md\`](demo/NOTES.md)。

---

## 为什么不一样

| | |
|---|---|
| **DSH 原生** | 一条 git spec，零配置，跨会话持久 |
| **省 token** | 指令面 **−60%**、catalog 描述 **−75%** —— 实测数据，不是口号 |
| **双语口播** | 中文（B 站风）*和* 英文（YouTube 风）指引，各带自己的 AI 指纹词 |
| **方法论不是模板** | 硬 checkpoint + 自检闭环 + 单源真相 —— 成品像真人在讲，不像 AI 念稿 |

---

## 工作流

\`\`\`
文章 / 口播稿
   ↓  一次产出 → 口播稿 + 章节大纲
   ↓  [对齐：稿子 · 大纲 · 主题 · 素材 · 开发模式]
   ↓  第 1 章（锚点）→ 验收 → 第 2..N 章（顺序 / 并行）
   ↓  [对齐：要不要口播音频？]
   ↓  可选 TTS  →  ?auto=1 一镜到底录屏
\`\`\`

---

## 主题 —— 23 套手工设计配色

*预览图是每套主题真实 token（\`shell\` / \`surface\` / \`text\` / \`accent\`）的配色渲染，非截图。*

### 深色 · 8 套

${darkZh}

### 浅色 · 15 套

${lightZh}

---

## 内含内容

\`\`\`
assets/web-video-presentation/
├── SKILL.md                    # 技能正文（调用时加载，已精简）
├── references/                 # 分阶段规则（懒加载）
│   ├── SCRIPT-STYLE.md         # 中文口播风格
│   ├── SCRIPT-STYLE-EN.md      # 英文口播风格
│   ├── CHAPTER-CRAFT.md        # 章节设计单一入口
│   ├── OUTLINE-FORMAT.md / THEMES.md / THEME-INDEX.md
│   ├── AUDIO.md / RECORDING.md
│   └── EXAMPLES/
├── themes/                     # 23 套主题（theme.json + tokens.css）
├── templates/                  # Vite + React + TS 脚手架
└── scripts/scaffold.sh         # 一键项目脚手架
\`\`\`

---

## 需求

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（提供 \`skills\` 服务）
- Node.js + npm（用于生成项目的 \`npm install\` / \`npm run dev\`）

## 许可与归属

MIT。DSH 插件壳与技能指令为本仓库原创；\`themes/\`、\`templates/\`、\`scripts/scaffold.sh\`、\`references/EXAMPLES/\` 源自 [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills)（MIT）—— 见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
`

writeFileSync(join(ROOT, 'README.md'), readmeEn)
writeFileSync(join(ROOT, 'README.zh-CN.md'), readmeZh)
console.log('README.md + README.zh-CN.md written')
console.log('themes: dark', DARK.length, '/ light', LIGHT.length, '/ total', DARK.length + LIGHT.length)
