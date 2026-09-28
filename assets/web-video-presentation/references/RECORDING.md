# 录制与后期合成

网页做完 + 音频合成完，**Auto 模式 + 屏幕录制一镜到底**，无需手动推进、无需后期对轨。

## 推荐流程：Auto 一镜到底

**前置**：每章有 narrations.ts；跑过 extract-narrations + synthesize-audio，`public/audio/` 全就位；`npm run dev` 跑着。

1. 浏览器全屏（F11 / Ctrl+Cmd+F），URL 改 `http://localhost:5173/?auto=1`
2. 看到 "Press SPACE to start" 蒙层 = Auto 就绪
3. 打开屏幕录制，开始录
4. 按一次 Space → 蒙层消失 → 1.mp3 自动播 → 播完自动推进 → … → 停在终态
5. 停止录制 → 裁掉头尾（按 Space 那下 + 终态尾巴）即成品

> Auto 严格按音频结束推进（+200ms），无"等动画"兜底。某步动画被切一半 = 动画长于口播，回章节改（更长口播/拆 step/调速度）。

**录屏工具**：macOS Cmd+Shift+5 或 QuickTime（选浏览器窗口，全屏后输出即 1920×1080）；跨平台 OBS（窗口捕获，Canvas 1920×1080，60fps）。

**模式速查**：

| URL / 快捷键 | 行为 |
|---|---|
| 直接打开（默认） | Manual：点击 / ←→ 推进，不播音频 |
| `?audio=1` 或按 `M` | Audio：进 step 自动播，手动点推进 |
| 再按 `M` | Auto：自动播 + 自动推进（录制用） |
| Auto 下首次按 `Space` | 启动 Auto（绕自动播放限制） |

鼠标移到右上角有隐藏的模式切换按钮。

## 备用流程：没合成音频时手动录屏

1. 浏览器全屏 → 打开 `localhost:5173`（Manual）
2. 刷新一次清空历史 step
3. 开始录屏 → 按口播节奏点击推进
4. 后期剪辑配音 + 调时间线

**后期工具**：DaVinci Resolve（跨平台免费）、iMovie（macOS 简单）、CapCut/剪映（加字幕）。

> Checkpoint Audio 后 agent **主动告诉用户** Auto 一镜到底路径，让用户知道怎么把网页变 mp4。
