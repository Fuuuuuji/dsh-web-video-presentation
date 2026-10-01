# Web Video Presentation · DSH 插件

**一行命令，把文章或口播稿做成有电影感的网页视频——16:9、有动效、可选 AI 口播，直接录屏成片。**

DeepSeek Harness 原生 skill 插件。给它一篇文章（或你写好的口播稿），它会按一套完整工作流，产出一个点击驱动的 **16:9 舞台**，你直接录屏变成视频——不用出镜、不用剪辑、不像 PPT。

> For English, see [README.md](README.md)

---

## 安装 —— 一行命令

```
github:Fuuuuuji/dsh-web-video-presentation
```

把这一条 spec 粘贴进 DSH 的插件管理器（`install_bundle`）即可。然后对 Agent 说：

> 把这篇文章做成网页视频演示。

…或直接触发 `/web-video-presentation`。

---

## 它做出什么

不是 PPT，是「伪装成视频的网页」：

- **固定 1920×1080 舞台** —— 每点击一步、一步占满一屏：大字、留白、每屏都有动效。
- **内容驱动动画** —— 数字递增、图表生长、对比切开、流程节点逐个点亮。动作来自「你在讲什么」，不是模板。
- **23 套手工设计主题** —— 每套独立设计 DNA，绝非换色（见下方画廊）。
- **隐藏式控件** —— 进度条/翻页器悬浮才出现，录屏画面干净。
- **可选 AI 口播** —— 内置 MiniMax + OpenAI，附 ElevenLabs / edge-tts / macOS `say` / Azure / Google 现成片段。
- **一镜到底录屏** —— `?auto=1` 全片自动播、音画天然同步。

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

```
文章 / 口播稿
   ↓  一次产出 → 口播稿 + 章节大纲
   ↓  [对齐：稿子 · 大纲 · 主题 · 素材 · 开发模式]
   ↓  第 1 章（锚点）→ 验收 → 第 2..N 章（顺序 / 并行）
   ↓  [对齐：要不要口播音频？]
   ↓  可选 TTS  →  ?auto=1 一镜到底录屏
```

---

## 主题 —— 23 套手工设计配色

*预览图是每套主题真实 token（`shell` / `surface` / `text` / `accent`）的配色渲染，非截图。*

### 深色 · 8 套

<table>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/midnight-press.png" width="100%" alt="midnight-press"/>
      <br/><sub><strong>暗色印刷</strong> · <code>midnight-press</code> — 暖色暗底 + 单一热橙强调色。电影感、终端气质、开发者审美。<br/>适合：开发者教程 / AI / 工具评测 / 极客向产品介绍</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/dark-botanical.png" width="100%" alt="dark-botanical"/>
      <br/><sub><strong>暗夜植物</strong> · <code>dark-botanical</code> — 高级感暗底 + Cormorant 斜体衬线 + 暖陶 / 玫粉 / 鎏金叠层。签名：柔光晕染 (blurred light pool)。气质介于时尚刊物封面与博物馆图录之间。<br/>适合：品牌故事 / 形象片 / 时尚 / 美妆 / 生活方式 / 旅行</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/chalk-garden.png" width="100%" alt="chalk-garden"/>
      <br/><sub><strong>粉笔花园</strong> · <code>chalk-garden</code> — 深色石板底 + Patrick Hand 手写字体 + 粉笔黄强调色. 教室 / 课堂讲解风.<br/>适合：科普讲解 / 教学课堂 / 知识分享</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/blueprint.png" width="100%" alt="blueprint"/>
      <br/><sub><strong>蓝图</strong> · <code>blueprint</code> — 深藏青底 + 青色强调色 + IBM Plex Mono. 工程蓝图 / 工业图纸气质, 适合系统架构与技术拆解.<br/>适合：技术架构 / 系统拆解 / 技术评测</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/terminal-green.png" width="100%" alt="terminal-green"/>
      <br/><sub><strong>终端绿</strong> · <code>terminal-green</code> — 纯黑底 + 磷光绿强调色, 全程等宽字体. Matrix 黑客 / 80 年代终端感, 最适合技术演示与 CLI 教程.<br/>适合：CLI 工具教程 / 黑客 / 安全话题 / 技术演示</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/neon-cyber.png" width="100%" alt="neon-cyber"/>
      <br/><sub><strong>霓虹赛博</strong> · <code>neon-cyber</code> — 深海军底 + 电光青 + 玫红双霓虹 + Clash Display / Satoshi 字体。签名：青色发光网格 + 双色霓虹描边。赛博朋克未来派审美。<br/>适合：AI / 大模型评测 / web3 / 区块链 / 网络安全 / 黑客向</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/bold-signal.png" width="100%" alt="bold-signal"/>
      <br/><sub><strong>焦点信号</strong> · <code>bold-signal</code> — 暗渐变底 + 大橙色焦点色卡 + Archivo Black / Space Grotesk 字体。签名：占位主角色卡 + 大编号制表数。适合 pitch deck、产品发布、宣言型章节。<br/>适合：pitch deck / 投资人路演 / 产品发布 / 新品宣传 / 营销片头 / brand keynote</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/creative-voltage.png" width="100%" alt="creative-voltage"/>
      <br/><sub><strong>电压创意</strong> · <code>creative-voltage</code> — 饱和电光蓝底 + 霓虹黄强调 + Syne 几何衬线 / Space Mono 等宽。签名：halftone 网点纹理（复古朋克工作室感）。适合设计周、创意工作室、视觉文化话题。<br/>适合：设计周 / 创意分享 / 工作室作品集 / showcase / 视觉文化 / 字体话题</sub>
    </td>
  </tr>
</table>

### 浅色 · 15 套

<table>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/paper-press.png" width="100%" alt="paper-press"/>
      <br/><sub><strong>亮色印刷</strong> · <code>paper-press</code> — 暖色奶油底 + 单一热橙强调色。杂志气质、柔和日间审美。<br/>适合：杂志型内容 / 生活方式 / 日常工具评测</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/newsroom.png" width="100%" alt="newsroom"/>
      <br/><sub><strong>报社</strong> · <code>newsroom</code> — 报纸奶油底 + 墨黑 serif + 报头红强调色. 老派大报 / 纪录片气质, 像一篇 NYT 特稿.<br/>适合：纪录片 / 报道 / 深度评测 / 时事评论</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/monochrome-print.png" width="100%" alt="monochrome-print"/>
      <br/><sub><strong>黑白印刷</strong> · <code>monochrome-print</code> — 微暖白底 + 墨黑 serif + 单一墙墨蓝强调色. 高对比印刷杂志气质, Monocle / Wallpaper / MIT Press 那种沉静讲究.<br/>适合：深度阅读改编 / 学术 / 思想型内容 / 品牌故事</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/vintage-editorial.png" width="100%" alt="vintage-editorial"/>
      <br/><sub><strong>复古编辑</strong> · <code>vintage-editorial</code> — 奶油底 + 厚体 Fraunces 斜体 + 暖陶强调色，有性格、会说话。签名：细线几何叠层（圆 + 线 + 点）。介于杂志专栏与艺术评论之间，俏皮、自信、有声音。<br/>适合：个人见解 / 评论 / 文化随笔 / 美学话题 / 有声音的博主</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/sunset-zine.png" width="100%" alt="sunset-zine"/>
      <br/><sub><strong>日落 Zine</strong> · <code>sunset-zine</code> — 暖蜗色纸底 + 玫红强调色 + 厚体 Fraunces serif. 独立杂志 / 丝网印 zine 风, 俏皮有人情味.<br/>适合：生活向 vlog / 创意分享 / 趣味评测</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/pastel-dream.png" width="100%" alt="pastel-dream"/>
      <br/><sub><strong>柔光梦</strong> · <code>pastel-dream</code> — 柔粉蓝灰底 + 奶油卡 + 单一鼠尾草绿强调色 + Plus Jakarta Sans。签名：单边多色 pill 色条。友好但不腻，适合女性向 / 教学 / onboarding。<br/>适合：产品 onboarding / 教程 / 友好教学 / 知识科普 / 女性向 / 生活方式</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/warm-keynote.png" width="100%" alt="warm-keynote"/>
      <br/><sub><strong>暖色 Keynote</strong> · <code>warm-keynote</code> — 奶油纸底 + 单一青色强调色 + 舞台上的暖色网格. SaaS Keynote 与编辑器气质.<br/>适合：SaaS 产品 keynote / B 端产品发布 / 工具产品讲解</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/electric-studio.png" width="100%" alt="electric-studio"/>
      <br/><sub><strong>电光企业</strong> · <code>electric-studio</code> — 净白底 + 单一电光蓝 + Manrope 全场。签名：贴底 4px 电蓝色块。企业感、清晰、自信，不冷漠，适合 B2B 与投资人场景。<br/>适合：B2B 产品演讲 / 投资人 / 路演 deck / 企业财报 / 季度更新</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/bauhaus-bold.png" width="100%" alt="bauhaus-bold"/>
      <br/><sub><strong>包豪斯</strong> · <code>bauhaus-bold</code> — 净色底 + 主色蓝强调色 + Archivo Black 黑体. 包豪斯 / 布鲁塔利风格, 适合观点鲜明的演讲与产品发布.<br/>适合：产品发布 / 观点宣言 / 设计演讲</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/swiss-ikb.png" width="100%" alt="swiss-ikb"/>
      <br/><sub><strong>瑞士克莱因蓝</strong> · <code>swiss-ikb</code> — 瑞士国际主义风。**极细 200 weight** Inter / Helvetica + 净暖白底 + 克莱因蓝（IKB）单一锚点色。签名：1px 发丝网格 + 200 重字 hero 数字。Massimo Vignelli / Helvetica Forever 那种克制冷静。<br/>适合：AI / 科技产品发布 / 年度总结 / 数据汇报 / 设计 / 工程领域分享</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/dune.png" width="100%" alt="dune"/>
      <br/><sub><strong>沙丘</strong> · <code>dune</code> — 炭褐当墨 + 沙底，几乎不用 accent —— 克制、高级。Inter 显示 + Source Serif 正文。像建筑作品集、画廊手册、沙漠黄昏的色温。<br/>适合：建筑 / 室内 / 空间 / 艺术展览 / 画廊手册 / 设计师 / 工作室作品集</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/indigo-porcelain.png" width="100%" alt="indigo-porcelain"/>
      <br/><sub><strong>靛蓝瓷</strong> · <code>indigo-porcelain</code> — 深靛蓝当墨（靛蓝就是字色本身，而非 accent）+ 瓷白纸。Playfair Display + Noto Serif SC + IBM Plex Sans。学术、有深度，像蓝印花瓷器或一本当代思想期刊。<br/>适合：学术 / 研究 / 论文解读 / AI / 数据 / 工程深度 / 中国当代文化</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/forest-ink.png" width="100%" alt="forest-ink"/>
      <br/><sub><strong>森林墨</strong> · <code>forest-ink</code> — 深森林绿当墨（绿就是字色本身）+ 象牙暖纸。Source Serif 正文 + Playfair Display + Noto Serif SC。像旧版《国家地理》，沉稳、有呼吸感、克制。<br/>适合：自然 / 可持续 / 环保 / 户外品牌 / 农业 / 纪录 / 非虚构</sub>
    </td>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/kraft-paper.png" width="100%" alt="kraft-paper"/>
      <br/><sub><strong>牛皮纸</strong> · <code>kraft-paper</code> — 深棕当墨 + 牛皮米。像老笔记本或手戳信封：暖、有年代感、手作味。Fraunces + Noto Serif SC + Source Serif 正文 + 紫铜色 accent。<br/>适合：书评 / 文学随笔 / 历史 / 怀旧 / 老物 / 独立杂志 / zine</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%" valign="top">
      <img src="theme-previews/split-canvas.png" width="100%" alt="split-canvas"/>
      <br/><sub><strong>双拼画布</strong> · <code>split-canvas</code> — 双色画布：暖蜜桃 + 冷薰衣草作为成对底色 + Outfit 几何无衬线 + 玫红强调。签名：双调底色（左桃 / 右紫），适合做对照与对话型章节。<br/>适合：双主题对比 / 辩论 / 故事讲述 / 对话 / 创意分享</sub>
    </td>
    <td></td>
  </tr>
</table>

---

## 内含内容

```
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
```

---

## 需求

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（提供 `skills` 服务）
- Node.js + npm（用于生成项目的 `npm install` / `npm run dev`）

## 许可与归属

MIT。DSH 插件壳与技能指令为本仓库原创；`themes/`、`templates/`、`scripts/scaffold.sh`、`references/EXAMPLES/` 源自 [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills)（MIT）—— 见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
