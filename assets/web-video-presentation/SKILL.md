---
name: web-video-presentation
description: 把一篇文章或口播稿做成点击驱动的 16:9 网页演示（动态 PPT 但不像 PPT），可选合成口播音频，最终录屏成视频。适用于稿子/文章转可交互解说、B 站/YouTube 录屏教程、产品/talk demo。
---

# Web Video Presentation

把文章或口播稿一步步做成可录屏的"伪装成视频的网页"，可选合成口播音频。
产出物 = Vite + React + TS 项目 + 按章节切分的音频。核心是**方法论 + 协作流程**，
不绑定任何固定样式 / 字体 / 颜色，能复用到任意主题与美学。

## 适用场景

- "我有口播稿 / 一篇文章，帮我做成视频"
- 想做"动态 PPT"，但不要像 PPT
- 16:9 横屏录屏：大字、留白、每屏都有动效
- 教学 / 产品演示 / keynote 想要电影感

## 工作流总览

```
Phase 1 内容编写 → script.md + outline.md（一次产出）
   ▼
[Checkpoint Plan]   必须停，一次对齐 5 件事：稿子 / outline / 主题 / 素材 / 开发模式
   ▼
Phase 2 网页开发 → 第 1 章主线程做完 + 验收（强制 anchor）→ 第 2~N 章
   ▼
[Checkpoint Audio]  必须停，是否合成音频
   ▼
Phase 3 音频合成（可选）→ Phase 4 录屏 + 后期
```

## 工作目录约定

```
my-video/
├── article.md        # 用户给原文时必有，不删（画面信息源）
├── script.md         # 口播稿（决定节拍）
├── outline.md        # 开发计划（章节切分 + 每步内容 + 信息池）
└── presentation/     # 脚手架产出（Vite + React + TS）
    ├── src/chapters/<NN>-<id>/   # 每章 <Chapter>.tsx + .css + narrations.ts
    ├── src/registry/chapters.ts  # 章节注册
    ├── scripts/                  # extract-narrations.ts + synthesize-audio.sh + tts-providers/
    ├── audio-segments.json       # 合成前 review
    └── public/audio/<id>/<N>.mp3 # 可选：合成音频
```

> **关键**：`narrations.ts` 是 step 数 + 口播文本 + 音频合成的**唯一真相源**。
> 章节 `.tsx` 里 `if (step === N)` 出现的最大 N + 1 必须等于 `narrations.length`，
> 保证 script / outline / 章节代码 / chapters.ts / 音频 5 处永远不漂。

## 硬性自检协议（贯穿全程）

`script.md` / `outline.md` / 单章实现，每个产出完成后**必须走自检 → 修复 → 再汇报/推进**：

- 用 DSH 开独立 reviewer：优先 `spawn_teammate`，其次 `subagent`；传入"产出文件路径 + 对应清单 + 关键上下文"，让它逐项核查并**严格汇报 pass/fail + 证据 + 改写建议**。
- 都没有时：自己**严格逐项**核查，不允许目测放行。
- **铁律**：拿到结论先按 fail 项改完，再向用户汇报"做完 + 自检结论 + 改了什么"。直接拿原始结论汇报不修复 = 违规。

## 文件读取指南（token 效率核心）

| 阶段 | 必读（每次都看） | 按需查 |
|---|---|---|
| Phase 1.2 内容编写 | `references/SCRIPT-STYLE.md`（**英文内容改读 `references/SCRIPT-STYLE-EN.md`**）+ `references/OUTLINE-FORMAT.md` + `article.md`（如有） | —— |
| Checkpoint Plan 选主题 | `references/THEME-INDEX.md`（读这一份，别读 23 个 theme.json） | `references/THEMES.md`（自创主题时） |
| Phase 2.1 脚手架 | 本文件 2.1 节 | —— |
| Phase 2.4 实现单章（×N） | **`references/CHAPTER-CRAFT.md` 单一入口** + 当前主题 `themes/<id>/theme.json` + outline 本章段落 + `article.md` 本章段落 | `references/EXAMPLES/`（卡壳看结构，不照搬） |
| Phase 3 音频 | `references/AUDIO.md` | `templates/scripts/tts-providers/README.md`（换/加 provider） |
| Phase 4 录屏 | `references/RECORDING.md` | —— |

## Phase 1 —— 内容编写（一次产出）

### 1.1 识别输入

| 用户给的东西 | 该做的 |
|---|---|
| 原始文章（书面语/公众号/论文/博客） | 一次产出 script.md + outline.md，过 Checkpoint Plan |
| 直接的口播稿/视频脚本 | 落盘 script.md，一次产出 outline.md（简化版），过 Checkpoint Plan |
| 什么都没给只说"做个 X 主题视频" | **反问**要素材或大纲，Skill 不替用户构思内容 |

### 1.2 一次产出 script.md + outline.md

1. **script.md**：按 `references/SCRIPT-STYLE.md` 把 article 转成保持原文语言的平台化口播稿。**保留 `article.md` 不删**（双源原则）。
2. **outline.md**：按 `references/OUTLINE-FORMAT.md` 切章节 + 切 step + 每章首段抽信息池。

**outline 边界**（关键）：

| 必须写 | 不要写 |
|---|---|
| 章节切分 / 每章 step 数 / 估时 | 具体动画类型（blur/wipe/弹簧） |
| 每步屏幕内容（hero/数据/标语/列表项） | CSS 实现手段（filter/SVG/clip-path） |
| 章节级信息池（数字/引用/案例/标签） | 时长数值 / 持续微动 / 错峰量 |

> outline 不写动画的理由：写死动画 = chapter agent 退化为翻译机；留白让它按
> CHAPTER-CRAFT.md 的"内容驱动决策树"自由设计，才有视频感。

落盘后先自检（硬性自检协议）再进 Checkpoint Plan。

## Checkpoint Plan —— 5 件事一次对齐（硬节点）

script.md + outline.md 写完必须停，用户在这一个节点同时确认 5 件事。

agent 预备：读 `references/THEME-INDEX.md` 拿主题清单 → 按 script 内容主动挑 2~3 套推荐（匹配 bestFor）→ 扫 outline 末尾素材清单。

总结骨架：

```
内容计划写完，产出：
  📄 article.md    {若用户给原文则保留}
  📄 script.md     {X} 字 / ~{T} 分钟
  📄 outline.md    {N} 章 / {M} 步 + 每章信息池 + 末尾素材清单

一次对齐 5 件事：
  1. 稿子 script.md 要不要改？
  2. outline.md 要不要改？（章节切分 / step 数 / 信息池是否够 / 素材清单是否完整）
  3. 选哪个主题？我的推荐 ★{nameZh (id)} — 因为 {bestFor 命中}，其它可选见主题索引
  4. 真素材怎么准备？a) 从现有路径挑  b) 用户提供  c) 全部 placeholder
  5. 开发模式选哪个？（见 2.3；默认 A 逐章确认）
```

- 稿子/outline 要改：直接编辑文件，改完 ping 一次。
- **主题必须明确**才进 Phase 2；用户说"你帮我选" → 取推荐第 1 个并说明理由，给反悔机会。
- 用 `ask_user_question` 或停等回复来收齐 5 件事。

## Phase 2 —— 网页开发

### 2.1 脚手架

```bash
bash scripts/scaffold.sh ./presentation --theme=<主题 id>
bash scripts/scaffold.sh --list-themes
```

> 路径相对本 skill 目录解析（见 skill_resources 的 base directory）。

脚手架带 `01-example` demo，写第一章真实内容前**删掉**：

```bash
rm -rf presentation/src/chapters/01-example
```

并把 `presentation/src/registry/chapters.ts` 里 EXAMPLE_CHAPTER 的 import 和数组项移除。

### 2.2 第 1 章 —— 主线程 + 强制验收（anchor）

第 1 章 = 完整版本一次到位（节奏 + 视觉 + 真素材齐全），**没有骨架版**。必须主线程：它是 CHAPTER-CRAFT 在当前主题/题材的第一次落地，暴露指引盲区/主题 token 缺口；后续章节都参考它的代码模式。

做完停下来等验收：视觉气质 / 节奏 / 内容驱动动画 / 双源原则 / 反 AI 味（紫粉渐变/圆角彩色边框/假插画/emoji）。OK 了用户说"继续"再往下。

### 2.3 第 2~N 章 —— 按选定模式

共同规则：每章独立按 `references/CHAPTER-CRAFT.md` 开发，风格不强求章节间一致（主题 token 兜底视觉统一）。

| 模式 | 做法 | 适用 |
|---|---|---|
| **A 逐章确认（默认）** | 每章做完暂停验收 | 风险最低、节奏最稳 |
| **B 第 1 章后顺序开发** | 主线程顺序做完统一验收 | 中速、无并行能力 |
| **C 第 1 章后并行开发** | 用 `subagent`/`workflow` 并行第 2~N 章，用户控并发数 | 最快、风格有差异（预期） |

并行 subagent 的 prompt 必须含：本章 outline 段落（含信息池）+ CHAPTER-CRAFT.md 路径 + 主题 theme.json 的 descriptionZh/mood/bestFor + 第 1 章代码作"代码风格"参考 + 硬规则（独立 CSS 前缀、不改 chapters.ts、完工 `npx tsc --noEmit`）。

用户随时可中途切模式。

### 2.4 实现单章（每章必走）

单一入口 `references/CHAPTER-CRAFT.md`：十条原则 / 开工 5 问 / 关系→动作决策树 / 视觉工具箱 / 反 AI 味 / 代码硬规则 / 完工自检。核心要点：

- 每章必须有 CSS/SVG/Canvas/JS 视觉演示，禁纯文字章节
- 清单/列表 1 项 = 1 step，禁一次全展示
- 双源原则：节奏跟 script.md，细节回 article.md 抽
- 完工自检逐项过，不达标回去改（硬性自检协议）

### 2.5 大改后 bump STORAGE_KEY

改动 chapters.ts（增删/重排章节，或某章 narrations.ts 长度变化）后，bump
`presentation/src/hooks/useStepper.ts` 的 `STORAGE_KEY`（v4→v5），避免持久化游标落到不存在的 step。

## Checkpoint Audio —— 是否合成音频（硬节点）

Phase 2 结束必须停，问用户：

```
网页做完，{N} 章 {M} 步，dev server 在 localhost:5173 跑着。
要不要合成音频做"自动播放录屏"？
  ✓ 合成 → 见 references/AUDIO.md（内置 minimax + openai，可换 ElevenLabs/edge-tts/say/Azure/Google）
  ✗ 不合成 → 跳过 Phase 3，直接 Phase 4 手动录屏 + 后期配音
```

## Phase 3 —— 音频合成（可选）

详见 `references/AUDIO.md`。简版：

```bash
cd presentation
npm run extract-narrations            # 扫所有 narrations.ts → audio-segments.json
# 让用户扫一眼 audio-segments.json 确认文本
npm run synthesize-audio              # 默认 minimax，增量
PRESENTATION_TTS=openai npm run synthesize-audio   # 或 openai（要 OPENAI_API_KEY）
```

合成完报告：输出位置 / 总段数 / 哪些段时长异常（太长=拆 step，太短=文案薄）。

## Phase 4 —— 录屏 + 后期

详见 `references/RECORDING.md`：

| 场景 | 路径 |
|---|---|
| 已合成音频 | **Auto 一镜到底**：`localhost:5173/?auto=1` → 按 SPACE → 自动播完 → 停录裁头尾，无需对轨 |
| 跳过音频 | Manual 手动点击推进 → 后期剪辑配音 |

## 十条原则（索引）

完整展开见 `references/CHAPTER-CRAFT.md` Part 0。

| # | 原则 | 一句话 |
|---|---|---|
| 1 | 16:9 固定舞台 | 1920×1080 + transform scale，无响应式 |
| 2 | 全局 step 计数器 | 章节是 step 的纯函数，无定时器 |
| 3 | 每步独占整屏 | `if (step === N) return <FullScene />` |
| 4 | 口播节拍 = step | 一节拍 = 一 step = 一聚焦想法 |
| 5 | 隐藏的边角控件 | 进度条/翻页器默认 opacity 0 |
| 6 | 舞台无 chrome | 无 header/footer/页码/品牌条 |
| 7 | 内容驱动动画 | 先找内在动作，找不到才入场动画兜底 |
| 8 | 多点逐个揭示 | 1 项 = 1 step，禁同步 stagger N 项 |
| 9 | 整片同一主题 | 颜色/字体走 token，其它尺度章节自由 |
| 10 | 双源原则 | script 定节拍，article 定画面密度 |

## 常见反馈速查

见 `references/CHAPTER-CRAFT.md` Part 8。先定位哪一层（节奏/视觉/内容/代码），改最小切片，**不重做整章**。
