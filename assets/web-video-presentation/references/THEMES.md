# 主题系统

每个演示从头到尾跑**一个主题**，不在章节间翻转明暗（打断视觉连贯）。主题 = CSS 设计 token + `theme.json` 元数据。内置 23 套清单见 [`THEME-INDEX.md`](THEME-INDEX.md)。

章节对 token 消费分两层：

1. **必须用 token**（换主题不破底线）—— 颜色 + 字体家族
2. **章节自由发挥** —— 字号 / 间距 / 动画时长 / 缓动 / 边框宽度 / 一般圆角 / 字距

主题不只管颜色字体：hero 数字 / 分割线 / 卡片 / 舞台装饰通过 primitive class（`.hero-num` / `.rule` / `.card` / `.stage-frame`）自动接入，章节用 class 即可。

主题管的维度：调色板、字型、舞台 padding 密度（`--stage-pad-x/y`）、圆角性格（`--r-card`）、分割线性格（`--rule-w` + `--rule-style`）、hero 数字风格（`--hero-num-*`）、舞台/卡片阴影、装饰层（`--surface-pattern*` / vignette / text-shadow）、动效基线（`theme.json` 的 `mood`，只标气质不写数值）。

## 脚手架时挑主题 / 之后切换

```bash
bash scripts/scaffold.sh ./presentation --theme=newsroom   # 默认 midnight-press
bash scripts/scaffold.sh --list-themes
```

脚手架把所选主题 `tokens.css` 拷到 `<project>/src/styles/tokens.css`，主题 id 写到 `<project>/.theme`。切换 = 一次文件覆盖：

```bash
cp <skill-dir>/themes/newsroom/tokens.css presentation/src/styles/tokens.css
```

切换后某章有问题 = 该章硬编码了颜色/字体/尺寸，bug 在章节里，不在主题里。

## 完整 token 契约

`base.css` 给性格 token 都准备了默认值；主题 `tokens.css` 只需覆盖「调色板 + 字体 + 性格旋钮 + 装饰」四类。

### 必填

**表面色（4）**：`--shell`（letterbox 外背景）/ `--surface`（舞台主背景）/ `--surface-2`（凸起：卡片、代码块）/ `--surface-3`（最里层）。

**文字（4）**：`--text`（主）/ `--text-2`（次）/ `--text-mute`（标签/元数据）/ `--text-faint`（三级/禁用）。

**线条（1）**：`--rule`（发丝分割线颜色）。

**Accent（3）**：`--accent`（品牌强色）/ `--accent-soft`（低透明叠层：pill 背景、悬浮光晕）/ `--accent-glow`（中透明叠层：text shadow、圆点发光）。

**字型家族（4）**：`--font-display-cn`（中文显示）/ `--font-display-en`（拉丁显示，斜体强调）/ `--font-body`（正文）/ `--font-mono`（等宽：终端、mono caps、badge）。

### 可选性格覆盖（有 base 默认，主题重定义表达性格）

| token | base 默认 | 作用 |
|---|---|---|
| `--font-features` | `"tnum","ss01"` | body OpenType 特性栈 |
| `--r-card` / `--r-stage` | `--r-md` / `0` | 卡片 / 舞台圆角（sharp 0 / refined 4 / soft 16 / keynote 32） |
| `--rule-w` / `--rule-style` | `1px` / `solid` | rule 粗细 / 样式（solid / dashed / dotted） |
| `--hero-num-font` / `--hero-num-style` / `--hero-num-weight` / `--hero-num-track` | display-en / italic / 400 / track-tight | `.hero-num` 字型性格 |
| `--stage-pad-x` / `--stage-pad-y` | `96px` / `80px` | 舞台内边距（密度旋钮） |
| `--card-shadow` / `--card-glass-bg` / `--card-glass-border` | none / rgba / rgba | 卡片阴影 / glass 背景 / 边框 |
| `--shadow-stage` / `--stage-border` | dark drop / none | 舞台阴影 / 边框（Bauhaus 用 4px solid） |

### 可选装饰层（默认 no-op，给质感加签名）

画在舞台上（pattern 用 `stage-frame::after`，vignette 用 `::before`），会被录屏捕捉：

| token | 作用 |
|---|---|
| `--surface-pattern` / `-size` / `-blend` / `-opacity` | 舞台 background-image（SVG 噪声/网格/扫描线）+ 尺寸/混合/透明度 |
| `--surface-vignette` | 径向渐变暗角（黑板/电影感） |
| `--text-shadow` | `.serif-cn` / `.serif-it` / `.display-en` 的文字光晕 |

需要的装饰找不到槽位 → 进章节自定义 CSS 领域解决，别扩主题契约。

## 创作新主题

1. **复制最接近的起点**：`cp -r themes/<最接近> themes/my-theme`（起点映射见 THEME-INDEX.md 的"适合"列）。
2. **改 `my-theme/tokens.css`**：按契约自上而下走（调色板→字体→性格旋钮→阴影→装饰），不碰字号/间距/时长（那是 base.css 内部默认）。
   - 深色：`--shell` 比 `--surface` 更深/更饱和；浅色：`--shell` 略灰，让舞台读成"主体"。
   - `--text` vs `--surface` 对比度 ≥ 4.5:1（96px+ 标题可放宽 3:1）。
   - `--accent` 是唯一饱和色；`--accent-glow`/`--accent-soft` 必须同色相透明叠层。
   - `--text-faint` 13px 大写仍要可读；挑**一个**设计签名发力（虚线/粗边/扫描线/纸纹/glass），别叠三个。
3. **改 `theme.json`**：`id`（=目录名）/ `name` / `nameZh` / `description` / `descriptionZh` / `mood[]` / `bestFor[]` / `preview{shell,surface,text,accent}` 全必填。主题**不再约束**动画选型/时长/字号——那些由 chapter agent 按 CHAPTER-CRAFT.md 自由发挥。
4. **测试**：`bash scripts/scaffold.sh /tmp/test --theme=my-theme` + `npm run dev`，把 demo 每步点完（标题衬线清晰 / accent 不爆 / hero 数字同源 / 卡片材质对 / 装饰"被注意到一次就被忘掉"）。
5. **登记**：在 THEME-INDEX.md 追加一行。

## 反模式

- 章节 CSS 硬编码 hex 颜色 / 字体名（缺语义就在契约补，给所有主题加；字号/间距/时长硬编码不算）
- 演示中途切换主题；第二个 accent 色；在组件层 override 主题 token（只在 `:root` 覆盖）
- 依赖主题的 TSX 条件分支（章节必须主题无关）；一个主题叠三个设计签名
