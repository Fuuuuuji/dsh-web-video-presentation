# 内置主题索引（Checkpoint Plan 选主题时读这一份）

共 23 套，每套独立设计 DNA（非简单换色）。Checkpoint Plan 时按 `bestFor` 匹配内容类型，
主动挑 2~3 套推荐给用户；用户指定或"帮我选"时以 `id` 为准传给 `scaffold.sh --theme=<id>`。
完整 token 契约 / 自创主题流程见 [`THEMES.md`](THEMES.md)。

## 深色 · 8 套

| id | nameZh | 气质 | 适合 |
|---|---|---|---|
| `midnight-press` | 暗色印刷 | 暖色暗底 + 热橙，电影感终端/开发者审美 | 开发者教程、AI/工具评测、极客向产品 |
| `dark-botanical` | 暗夜植物 | 高级暗底 + 暖陶/玫粉/鎏金，时尚刊物/博物馆图录 | 品牌故事、时尚/美妆、生活方式 |
| `chalk-garden` | 粉笔花园 | 深石板黑板 + 手写 + 粉笔黄，教室课堂风 | 科普讲解、教学课堂、知识分享 |
| `blueprint` | 蓝图 | 深藏青 + 制图青 + 等宽，工程图纸气质 | 技术架构、系统拆解、技术评测 |
| `terminal-green` | 终端绿 | 纯黑 + 磷光绿 + 全等宽，Matrix/80s 终端 | CLI 教程、黑客/安全、技术演示 |
| `neon-cyber` | 霓虹赛博 | 深海军 + 电光青/玫红双霓虹，赛博朋克未来派 | AI/大模型评测、web3、网络安全 |
| `bold-signal` | 焦点信号 | 暗渐变 + 大橙焦点卡，pitch deck 主舞台 | pitch deck/路演、产品发布、brand keynote |
| `creative-voltage` | 电压创意 | 饱和电光蓝 + 霓虹黄 + halftone，复古朋克工作室 | 设计周/创意分享、作品集、视觉文化 |

## 浅色 · 15 套

| id | nameZh | 气质 | 适合 |
|---|---|---|---|
| `paper-press` | 亮色印刷 | 暖奶油 + 热橙，杂志柔和日间审美 | 杂志型内容、生活方式、日常工具评测 |
| `newsroom` | 报社 | 报纸奶油 + 墨黑 serif + 报头红，NYT 特稿 | 纪录片/报道、深度评测、时事评论 |
| `monochrome-print` | 黑白印刷 | 微暖白 + 墨黑 + 墨蓝，Monocle/Wallpaper 沉静 | 深度阅读改编、学术/思想型、品牌故事 |
| `vintage-editorial` | 复古编辑 | 奶油 + Fraunces 斜体 + 细线几何叠层，专栏作家感 | 个人见解/评论、文化随笔、有声音的博主 |
| `sunset-zine` | 日落 Zine | 暖蜗色纸 + 玫红 + 厚体 serif，独立杂志/丝网印 | 生活向 vlog、创意分享、趣味评测 |
| `pastel-dream` | 柔光梦 | 柔粉蓝灰 + 鼠尾草绿 + pill 色条，友好不腻 | 产品 onboarding、友好教学、女性向 |
| `warm-keynote` | 暖色 Keynote | 奶油纸 + 青色 + 暖网格，SaaS Keynote 编辑器 | SaaS keynote、B 端产品发布、工具讲解 |
| `electric-studio` | 电光企业 | 净白 + 电光蓝 + 贴底色条，企业清晰自信 | B2B 演讲、投资人路演、企业财报 |
| `bauhaus-bold` | 包豪斯 | 净色 + 主色蓝 + 黑体，包豪斯/布鲁塔利宣言 | 产品发布、观点宣言、设计演讲 |
| `swiss-ikb` | 瑞士克莱因蓝 | 极细 200 字重 + 暖白 + IKB + 1px 发丝网格 | AI/科技发布、年度数据汇报、设计/工程 |
| `dune` | 沙丘 | 炭褐当墨 + 沙底，几乎无 accent，画廊手册 | 建筑/室内/空间、艺术展览、作品集 |
| `indigo-porcelain` | 靛蓝瓷 | 靛蓝当墨 + 瓷白，学术/当代思想期刊 | 学术/论文解读、AI/数据深度、中国当代文化 |
| `forest-ink` | 森林墨 | 森林绿当墨 + 象牙纸，旧版国家地理 | 自然/可持续、户外、纪录/非虚构 |
| `kraft-paper` | 牛皮纸 | 深棕当墨 + 牛皮米，老笔记本/手戳信封 | 书评/文学随笔、历史/怀旧、独立杂志 |
| `split-canvas` | 双拼画布 | 蜜桃左 + 薰衣草右 50/50 硬切分，对照对话 | 双主题对比/辩论、故事讲述、创意分享 |

## 列出 / 自创主题

```bash
bash scripts/scaffold.sh --list-themes      # 打印全部可用主题
```

自创主题：复制一个最接近的 `themes/<id>/` 起步，改 `tokens.css` + `theme.json`，流程见 [`THEMES.md`](THEMES.md)「创作新主题」。
