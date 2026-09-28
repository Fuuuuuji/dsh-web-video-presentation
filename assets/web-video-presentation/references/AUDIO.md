# 音频合成

把每章 `narrations.ts` 的口播文字按 **step 颗粒度**合成 mp3，落到
`presentation/public/audio/<chapter-id>/<step-N>.mp3`，Auto 模式自动播 + 自动推进，录屏一镜到底。

> **真相源**：每章 `src/chapters/<NN>-<id>/narrations.ts` 是 step 数 + 口播文本的唯一来源。outline 不参与音频合成，章节代码不手写 totalSteps。

合成器 **provider-agnostic**：runner 不绑任何 TTS 后端，每个后端是 `scripts/tts-providers/<name>.sh` 一个文件。

| Provider | 默认 | 何时用 |
|---|---|---|
| `minimax` | ✓ | 中文口播首选（`mmx-cli`，要 MiniMax API key） |
| `openai` | —— | 多数已有 `OPENAI_API_KEY`；curl-based 响应快 |

换/加 provider 见 [`../templates/scripts/tts-providers/README.md`](../templates/scripts/tts-providers/README.md)
（脚手架跑完路径为 `presentation/scripts/tts-providers/README.md`），附 5 套可粘贴片段（ElevenLabs / edge-tts / macOS say / Azure / Google）+ 三函数契约。

## 文件命名约定

```
presentation/public/audio/<chapter-id>/<step-N>.mp3   # 1-indexed，对齐 narrations 数组 index+1
```

## 标准流程

### 1. 抽取 segments

```bash
cd presentation
npm run extract-narrations   # 扫所有 narrations.ts → audio-segments.json
```

产出 `audio-segments.json`（`[{chapter, step, text, audio}]`）。让用户**先扫一眼 json** 确认文本和切分对，再烧 token 合成。空串 narration 自动跳过（Auto 模式按字数估时撑过）。

### 2. 选 provider 合成

```bash
npm run synthesize-audio              # 默认 minimax，增量：跳过已存在 mp3
npm run synthesize-audio -- --force   # 全部重合成
npm run synthesize-audio -- --voice=<voice-id>  # 指定音色
# 或 openai：
export OPENAI_API_KEY=sk-...
PRESENTATION_TTS=openai npm run synthesize-audio
```

- minimax 启动先 `tts_check`：未装 mmx → 打印安装说明；未登录 → 提示登录命令。
- openai 可选 env：`OPENAI_API_KEY`（必须）/ `OPENAI_BASE_URL` / `OPENAI_TTS_MODEL`（tts-1 快 / tts-1-hd 高清 2×价）/ `--voice=`（alloy/echo/fable/onyx/nova/shimmer）。
- 合成串行（避免 rate limit），自动跳过已存在文件（断点续合）。

### 3. 换 / 加自定义 provider

从 `scripts/tts-providers/README.md` 挑片段 → 存为 `scripts/tts-providers/<name>.sh` → 设 env → 切换：

```bash
PRESENTATION_TTS=elevenlabs npm run synthesize-audio
```

自研 TTS 按三函数契约写：`tts_synthesize <text> <out_path> [<voice>]`（必填）、`tts_check`（可选，环境校验）、`tts_install_help`（可选，修法提示）。

### 4. 退化路径

两个内置 provider 都没就绪时告诉用户：①用 openai（已有 key）②装 mmx-cli ③换 README 里 5 种 provider ④暂时跳过（稿子和 narrations 都在，自行按 audio-segments.json 命名即可）。**不要假装合成成功。**

## 校验时长

```bash
for f in public/audio/*/*.mp3; do
  d=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f")
  echo "$f  ${d}s"
done
```

重点看 **≥15s** 的条目：口播过密或 step 没拆够，让用户决定改稿重合还是回章节拆 step。

## 运行时模式

脚手架 `App.tsx` 已接好，合成后无需额外配置：

| 模式 | 触发 | 行为 |
|---|---|---|
| Manual（默认） | 直接打开 | 不播音频，点击/方向键推进 |
| Audio（半自动） | `?audio=1` 或按 `M` | 进 step 自动播音频，手动推进 |
| Auto（全自动） | `?auto=1` 或按两次 `M` | 音频播完自动 next()，一镜到底 |

Auto 首次按 `Space` 启动（绕浏览器自动播放限制）。**推进规则**：每段音频播完 +200ms 缓冲 → next，没有"等动画跑完"兜底；音频缺失/空串 → 退化字数估时（`max(1500ms, 字数×250ms)`）。

## 故障排查（常见）

| 现象 | 修法 |
|---|---|
| `chapter id "X" registered but no matching folder` | 章节文件夹应为 `NN-<id>`，id 等于 chapters.ts 注册值 |
| `narrations.ts ... must export an array named "narrations"` | 导出名为 `narrations` 的数组 |
| `TTS provider 'X' not found` / `does not define tts_synthesize` | 缺 `<X>.sh` 或没定义必需函数，看 README 契约 |
| 中间断几条没合成 | 重跑 `npm run synthesize-audio`（已存在跳过） |
| 浏览器没播音频 | Auto/Audio 首次要用户手势，确认按了 Space / 点过页面 |
| `mmx: command not found` | `npm install -g mmx-cli` |
| `mmx is not authenticated` | `mmx auth login --api-key sk-xxxxx` |
| 整段被截断 | 单段超 mmx 上限（~5000 字符），拆成两条（= 拆两个 step） |
| `OPENAI_API_KEY is not set` | `export OPENAI_API_KEY=sk-...` |
| 全 FAILED 但 key 对 | model/voice 名错；`bash -x scripts/synthesize-audio.sh` 看请求体 |
| 走代理/Azure | `OPENAI_BASE_URL=https://your-proxy/v1` |
| 自定义 provider 合成的 mp3 播不了 | `file public/audio/*/*.mp3` 看是否真 mp3（不是 wav/opus） |
