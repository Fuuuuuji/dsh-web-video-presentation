# `outline.md` 格式 spec

视频章节规划的产出文件，**用户可直接编辑**（用 markdown，不用 JSON/YAML）。

> 读完本文件后，实现章节前必须读 [`CHAPTER-CRAFT.md`](CHAPTER-CRAFT.md) 了解网页效果的真实需求。

## outline 是开发计划，不是视觉规划

outline 只规划**节奏 + 内容 + 信息密度**：章节切分 / 每章 step 数 / 每步估时、每步屏幕内容、章节级信息池。

- 不写具体动画类型（blur/wipe/弹簧）、不写 CSS 手段（filter/SVG/clip-path）、不写时长数值/错峰量。
- step 数是初始预估，最终以 `narrations.ts` 为准（step 数源 + 音频合成源）；实现时不一致回同步 outline 即可。

**写 outline 前必读**（双源）：`script.md` 决定节拍（按 `---` 切，每节拍 1~2 step 估时）；`article.md`（如有）决定画面密度（每章首段抽信息池）。

## 格式模板

````markdown
# Video Outline

> **主题**：`<theme-id>`（Checkpoint Plan 已选定）— 一句话风格描述
> **总时长**：约 <T> 分 <S> 秒（口播 ~<X> 字 ÷ 4 字/秒）
> **章节数**：<N> 章 / <M> 步

---

## 1. <chapter-id> — <章节标题>（<S> steps · ~<T>s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- <类型：数字 / 引用 / 出处 / 案例 / 词义 / 时间 / 对比 / ...>：<内容> —— <来源 article §X / Lxx>

**开发计划**：
- step 1 (~Ts) — <屏幕内容>
- step 2 (~Ts) — <屏幕内容>

口播节选：
> <1~3 句节选，对应 script.md 完整文本>
````

## 字段约定

**顶部 metadata**（引用块）：主题（Checkpoint Plan 必须已选定）/ 总时长（中文 ~250 字/分钟）/ 章节数（N 章 M 步）——三者必填。

**章节标题** `## N. <id> — <title>（<S> steps · ~<T>s）`：
`N` 1-indexed 对齐 chapters.ts 注册顺序；`<id>` 小写+连字符（成为 React key / 文件夹名 `src/chapters/0N-<id>/` / 音频子目录 `public/audio/<id>/`）；`<title>` 给人看的中文标题不进代码；`<S> steps` step 总数；`~<T>s` 口播总估时（~4 字/秒）。

合法 id：`coldopen` / `hook` / `why-good`。不合法：`why_good`（下划线）、`Hook`（大写）、`第一章`（非拉丁）。

**信息池**（双源核心）：每章独立列 article 抽取细节，格式 `- <类型>：<具体内容> —— <来源 article §X / Lxx>`。
没 article（用户直接给 script）→ 退化为"主动设计画面信息密度"，列画面装饰元素池。

**Step 列表**：每步 1 行 `- step N (~Ts) — <屏幕内容>`。`step N` 1-indexed（实现时 `if (step === N - 1)` 零基偏移）；`(~Ts)` 必填（本步口播字数 ÷ 4，范围 3~10s）；屏幕内容一句话讲清 hero/标语/数据/装饰元素，**≤1 行**，再多就拆 step。

**口播节选**（每章末尾，可选）：1~3 句仅供对照"这章在讲什么"，完整文本回 script.md。音频合成会回到 script.md 切分，不用节选。

## 命名规则速查

| 对象 | 规则 | 示例 |
|---|---|---|
| 章节 id | 小写 + 连字符 | `coldopen`, `why-good` |
| 章节文件夹 | `0N-<id>` | `src/chapters/01-coldopen/` |
| 章节组件 | PascalCase | `Coldopen.tsx` |
| 章节 CSS 前缀 | 章节缩写 | `.cd-` / `.wg-` |
| 音频子目录 | `<id>/` | `public/audio/coldopen/` |
| 音频文件 | `<step-N>.mp3`（1-indexed） | `coldopen/1.mp3` |

## 章节切分经验

- 每章 3~8 步（少则薄，多则观众忘主题）；总时长 ÷ 30 秒 ≈ 章节数（一章约 30~60s）
- 每章 = 一个聚焦主题；章节边界 = script.md 里讲者换语气/主题处
- 慢节奏主题可少到 2~3 步；信息密集型（测评/对比）可放宽到 8~10 步

## 素材清单（outline 末尾）

分章节列出，`✓ <资源>（<路径>）` / `⚠️ <资源>（待提供）` 标注清楚。

## 自检（写完 outline **强制**）

执行方式：优先 `spawn_teammate` / `subagent` 开 reviewer（传 outline.md + script.md / article.md 路径），否则自己严格逐项；先改 fail 项再进 Checkpoint Plan。

- [ ] 每个 step 都是单一句屏幕内容，无"动画"行 / "手段"行 / 具体毫秒
- [ ] 每章首段有信息池，≥3 条且每条带来源标注（无标注 chapter agent 回不到原文）
- [ ] 所有 step `(~Ts)` 累加 ≈ 顶部总时长（误差 <10%）
- [ ] 章节切分符合 3~8 步 / 30~60s 一聚焦主题
- [ ] 末尾素材清单分章列出，✓/⚠️ 清楚
- [ ] 无标题、序号等非口播内容，仅人类正常可读内容
