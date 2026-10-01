# 英文口播稿风格指南（English voiceover style）

适用：用户原文是英文，或要求英文口播。默认 **YouTube long-form** 风格，变体见末尾。
**语言选择仍遵循 [`SCRIPT-STYLE.md`](SCRIPT-STYLE.md)「保持原文语言」底线**：不主动翻译，英文文章出英文稿；
本文只规定**英文怎么写好**（中文稿见 SCRIPT-STYLE.md，两条规则共享"三条底线 + 自检协议"的骨架，但细节是英文自己的）。

---

## 三条底线（任一不过，整稿重写）

1. **信息保留度 ≥ 60%**：换说法不是摘要。删修辞/铺垫可以，删事实/数据/论证链不行。
2. **去 AI 味**：英文有自己的 AI 指纹词（见下文「英文指纹词」），比中文更隐蔽、更要扫。
3. **保持原文语言 + 保留术语**：不主动翻译；中英混排时英文术语/产品名/专名原样保留。

## 语速与句长基准（英文专属，替代中文的「4 字/秒、≤20 字」）

- 英文口播 ≈ **150 wpm**（每分钟 150 词）≈ **2.5 词/秒**。
- 单句 ≤ **20 words**；一个 breath = 一个 idea = 一个 `---` 节拍（`---` 切 step 的规则与中文版相同）。
- 时长估算：`narrations` 每 step 字数 ÷ 2.5 ≈ 秒数（对应中文版的「字数 ÷ 4」）。

## 八条形式原则

1. **contraction 必用**：书面 `do not` / `it is` / `that is` → 口播 `don't` / `it's` / `that's`。
   不缩写的英文念出来一定像朗读，一耳朵就是机器。唯一例外：要强调否定时故意拆开（"It does **not** work."）。
2. **短句 + 碎片句**：主句短，再用碎片句收尾砸重点。
   ✓ "It kept trying and failing. It cheated." / "Under the hood." / "Except it didn't."
3. **视角二选一，整片统一**：
   - **we（团队/品牌讲解）**：Anthropic 式——"We looked inside the model's brain."（权威、克制、包容）
   - **you（观众视角）**：财经观点式——"your mortgage, your car loan, your savings account."（把结论拉进观众口袋）
4. **cold open 钩子**（英文套路，四选一）：
   - **类比开场**："Think of the mind like an ocean."
   - **反直觉/否定开场**："The biggest risk was never X. It was never Y. It was never Z."
   - **反问开场**："Why does it do that?"
   - **微型故事开场**："A woman tells her old teacher how much they meant to her. That's love."
   - ❌ 禁："In today's fast-paced world…" / "Have you ever wondered…" / "In this video, I'm going to talk about…"
5. **节奏用 `---`**：一个聚焦想法 = 一个 `---` = 一个 step（与中文版同）。
6. **数字翻译成感受 + 用对比让数字落地**：保留冲击数字，但用**对照**框住它。
   ✓ "missed the target for **63 months in a row**" / "a **5-month-old story** to diagnose a **5-year-old problem**"
7. **不堆机械序数，但允许自然 signpost**（英文与中文的关键差异）：
   - ❌ 禁机械："Firstly… Secondly… Finally…"（英文口播里也很僵硬）
   - ✓ 用**反问式 signpost** 过渡："So, how should we think about these findings?" / "This led us to wonder…" / "But to understand why, you first have to rewind…"
8. **具体例子 + 一个贯穿隐喻**：英文讲解极度依赖**类比**，且常**一个隐喻用到底**（ocean / duct tape / pendulum / remote control）。挑一个，反复回扣，比一堆零散例子更抓人。

## 英文专属：rule of three 是合法修辞

> 中文指引把「排比堆砌」当 AI 味砍；英文的 **rule of three / anaphora 是经典修辞，要主动用**——但只在**强调点**用，别句句三连。

- ✓ "It was never the AI bubble. It was never China. It was never the orange man."
- ✓ "There was no invisible hand. There was a **real** one."
- ✓ "growth was steady, inflation was low, and the whole economy looked like it regulated itself."
- ✗ 滥用：每段都排比 = 机械（英文观众同样会腻）。

## 去 AI 味：英文指纹词（最重要，中文版没有）

写完专门扫一次。分三类，逐条砍：

**① 陈词滥调 / corporate speak（最重的 AI 指纹）**
`delve` / `dive deep` / `unlock` / `harness` / `leverage` / `empower` / `seamless` /
`game-changer` / `revolutionize` / `cutting-edge` / `state-of-the-art` / `robust` / `pivotal` /
`in today's fast-paced world` / `in an ever-evolving landscape` / `navigate the complexities`

**② 空转过渡 / 假深刻**
`furthermore` / `moreover` / `it's worth noting` / `it's important to understand` /
`in conclusion` / `in summary` / `needless to say` / `without further ado` /
`let's dive in` / `picture this` / `imagine a world where` / `at the end of the day`

**③ 科学/技术向的「万能铺垫」**
"The thing is, people use the word…"（用一次可以，滥用成瘾）——参考稿的正确做法是
**直接下 hedged 结论**："This research does not show that the model is feeling emotions."

> 改法：直接说那句话。去掉"furthermore/it's worth noting"后意思不变 → 删。
> **唯一判断标准**：这句话一个 native speaker 会不会这么说？不会就改。

## 语气/人设（voice）

| 人设 | 特征 | 参考稿 |
|---|---|---|
| **科技讲解（Anthropic 风）** | we + 克制 + 类比贯穿 + 科学诚实（hedging："does not show that… / can't tell us whether…"） | anthropic1 / anthropic2 |
| **财经/观点（casual finance 风）** | you + 反直觉开场 + meme/流行文化类比 + deadpan 冷幽默 + 短句轰炸 | casual_finance1 / casual_finance2 |
| **教程/技术 demo** | 清晰步骤化、直接给结论、少铺垫 | —— |

选一个人设，**整片统一**，别在"克制学术"和"meme 段子手"之间横跳。

## 平台风格变体

| 平台 | 基调 | wpm | 钩子节奏 | 信息密度 |
|---|---|---|---|---|
| **YouTube long-form（默认）** | 舒缓、叙事、可铺垫 | ~150 | 30 秒铺垫可 | 低（10s/idea） |
| YouTube Shorts / TikTok | 更短、更冲、更快 | 快 | 1–2 秒 | 高（3s/idea） |
| 技术 demo / 教程 | 清晰、步骤化 | ~140 | 直接给结论 | 中 |
| 播客 / 访谈风 | 对话感、we | ~140 | 闲聊开场 | 中 |

## 写完后：三层自检（与中文版同协议）

写完 `script.md` 走完自检 → 修改 → 再继续。优先 `spawn_teammate` / `subagent` 开 reviewer。

**形式层**：
- [ ] 信息保留度 ≥ 60%（英文按 words 计）
- [ ] 有 contraction（do not→don't / it is→it's）
- [ ] 单句 ≤ 20 words？一个 `---` 一个 idea？
- [ ] 开头是钩子（类比/否定/反问/微故事），不是 "In this video I'm going to…"
- [ ] 视角统一（we 还是 you）？数字用对比框住了？

**风骨层（英文指纹词，最重要）**：
- [ ] 全文无 `delve / unlock / harness / leverage / seamless / game-changer / revolutionize`
- [ ] 无 `furthermore / moreover / it's worth noting / in conclusion / without further ado`
- [ ] 无 "In today's fast-paced world / ever-evolving landscape / picture this / imagine a world where"
- [ ] 有且仅有一处"一个贯穿隐喻"，而不是一堆零散类比
- [ ] rule of three 用在强调点，没句句三连
- [ ] 科技向结论是否用了 hedging（does not show / can't tell whether），而非断言

**念出来（终极标准）**：挑 3 段真张嘴念英文。念到哪句像"朗读书面文章"→ 该加 contraction / 拆短句；
念到哪句一股 LinkedIn 味 → 该砍指纹词；念到哪句你想笑出声（因油腻）→ 该删。

> 去 AI 味不是降质：把"AI 在朗读"换成"真人在聊"，信息量一个不少。换了之后内容变蠢 = 它本来就蠢，该补内容了。
