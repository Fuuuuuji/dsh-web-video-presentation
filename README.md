# Web Video Presentation · DSH Plugin

**Turn scripts and articles into cinematic, screen-recordable web presentations — no camera, no editing, no "slide deck" feel.**

A native [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) skill plugin. Paste an article (or a script you already wrote), and the agent walks you through a disciplined workflow that produces a click-driven **16:9 stage** you record straight to video — with optional AI voiceover.

---

## What it makes

Not a slide deck. Not a PPT clone. A **"video disguised as a webpage"**:

- **Fixed 1920×1080 stage**, one idea per click, every beat full-screen — big type, generous whitespace, motion in every frame.
- **Content-driven animation**: numbers count up, charts grow, contrasts get cut in half, flows light up node by node. The motion comes from *what you're saying*, not from a template.
- **23 hand-designed themes** — from `midnight-press` (cinematic dark) to `paper-press` (warm editorial) to `terminal-green` (phosphor CRT). Each has its own design DNA, not just a recolor.
- **Hidden chrome**: progress bar and controls only appear on hover, so your recording stays clean.
- **Optional AI voiceover**, provider-agnostic: MiniMax & OpenAI built in, plus drop-in snippets for ElevenLabs, edge-tts, macOS `say`, Azure, and Google.
- **One-take recording**: `?auto=1` plays the whole thing top-to-bottom, audio-synced, hands-free.

## Why it works

It's **methodology + collaboration flow**, not a styling kit:

1. **One-pass content** — your article becomes a platform-native voiceover script + a chapter/step outline.
2. **One alignment checkpoint** — align script, outline, theme, assets, and dev mode before any code.
3. **Chapter-by-chapter build** — chapter 1 is the anchor, then sequential or parallel (`subagent`) development.
4. **Hard self-review** — every artifact passes a reviewer pass before it reaches you.

The result reads like a *person narrating* on camera — not an AI reading bullets.

## Install

In DeepSeek Harness, open the plugin manager and install this bundle from Git:

```
github:Fuuuuuji/dsh-web-video-presentation
```

(or the full URL `https://github.com/Fuuuuuji/dsh-web-video-presentation`).

## Quick start

Then just tell the agent:

> 把这篇文章做成一个网页视频演示。

…or invoke the skill directly with `/web-video-presentation`.

The skill scaffolds a Vite + React + TypeScript project and drives every phase — writing, theming, chapters, optional TTS, and recording.

## Requirements

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (provides the `skills` service this plugin registers against)
- Node.js + npm (for the generated project's `npm install` / `npm run dev`)

## Themes

`midnight-press` · `paper-press` · `warm-keynote` · `newsroom` · `monochrome-print` · `vintage-editorial` · `sunset-zine` · `pastel-dream` · `split-canvas` · `bauhaus-bold` · `swiss-ikb` · `dune` · `indigo-porcelain` · `forest-ink` · `kraft-paper` · `dark-botanical` · `chalk-garden` · `blueprint` · `terminal-green` · `neon-cyber` · `bold-signal` · `creative-voltage` · `electric-studio`

## License

MIT

---

## 中文简介

**把文章或口播稿，做成"看起来像视频"的点击驱动 16:9 网页演示，一键录屏成片——不用出镜、不用剪辑、不像 PPT。**

这是 DeepSeek Harness 的原生 skill 插件。给它一篇文章（或你写好的口播稿），Agent 会按一套完整工作流，产出一个 **1920×1080 固定舞台**：每点击一步、一步占满一屏，大字、留白、每屏都有动效，最后直接录屏变成视频。

- **内容驱动动画**：数字递增、图表生长、对比切开、流程节点逐个点亮——动作来自"你在讲什么"，而不是模板。
- **23 套手工设计主题**：`midnight-press`（电影感暗底）、`paper-press`（暖色杂志）、`terminal-green`（磷光终端）……每套独立设计 DNA，绝非换色。
- **隐藏式控件**：进度条/翻页器悬浮才出现，录屏画面干净。
- **可选 AI 口播**：provider 可插拔，内置 MiniMax + OpenAI，附 ElevenLabs / edge-tts / macOS `say` / Azure / Google 现成片段。
- **一镜到底录屏**：`?auto=1` 全片自动播、音画天然同步。

它的核心是**方法论 + 协作流程**：一次产出稿子+大纲 → 一次对齐 5 件事 → 第一章定锚 → 逐章/并行开发 → 硬性自检。成品读起来像"真人在镜头前讲"，而不是"AI 在念 bullet"。

装上后对 Agent 说一句「把这篇文章做成网页视频演示」，或直接 `/web-video-presentation` 触发即可。
