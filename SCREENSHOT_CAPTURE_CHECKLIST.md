# App Store 截图采集执行表

## 目标

把 App Store 需要的 iPhone 和 Apple Watch 截图拆成可执行文件清单。  
当前 Windows 仓库只能准备脚本、文案和清单；真实 iPhone / Apple Watch 截图需要在 Mac、Xcode Simulator 或真机上生成。

## 输出目录建议

正式截图生成后放入：

- `screenshots/iphone/`
- `screenshots/watch/`

当前仓库尚未提交真实截图，避免用浏览器模拟图冒充 App Store 截图。

## iPhone 截图

建议先准备 5 张，使用同一设备尺寸、同一语言、同一视觉状态。

| 状态 | 文件名 | 页面 | 画面重点 | 截图文案 |
| --- | --- | --- | --- | --- |
| 待生成 | `iphone-01-tonight.png` | 今晚 | 开始记录、当前状态、小月亮回应 | 记录今晚的状态 |
| 待生成 | `iphone-02-note.png` | 今晚 | 输入框、保存片刻 | 写下一句就好 |
| 待生成 | `iphone-03-weekly-report.png` | 报告 | 本周报告、人格标题 | 看见这一周的夜晚 |
| 待生成 | `iphone-04-charts.png` | 报告 | 热力图、条形图、雷达图 | 把夜晚变成图表 |
| 待生成 | `iphone-05-watch-summary.png` | 我的 | Watch 本周触发、常见状态、最近记录 | 手腕上的 10 秒缓冲 |

## Apple Watch 截图

建议先准备 3 张，所有 Watch 截图保持同一尺寸。

| 状态 | 文件名 | 画面重点 | 截图文案 |
| --- | --- | --- | --- |
| 待生成 | `watch-01-mood-picker.png` | 紧张、困、烦、低落四个入口 | 选择此刻状态 |
| 待生成 | `watch-02-buffer.png` | 10 秒倒计时、进度环 | 停 10 秒再继续 |
| 待生成 | `watch-03-comfort.png` | 情绪表情、短陪伴语、完成状态 | 轻轻提醒你回来 |

## 拍摄前设置

- App 内不要出现“治疗、诊断、检测焦虑、医疗级监测、鼓励熬夜”等词。
- 所有截图使用中文界面，除非 App Store Connect 首发地区决定改英文。
- iPhone 截图尽量使用同一模拟器或同一真机。
- Apple Watch 截图必须保持同一种尺寸。
- 图片导出为 `.png` 或 `.jpg`，不要有透明区域。

## 采集步骤

1. 在 Mac 按 `MAC_XCODE_HANDOFF.md` 跑起 iPhone + watchOS 工程。
2. 在 iPhone 模拟器或真机中准备几条本地记录，让报告页有数据。
3. 在 Apple Watch 模拟器或真机中触发一次“紧张”或“困”的 10 秒缓冲。
4. 按上方文件名逐张截图。
5. 放入 `screenshots/iphone/` 和 `screenshots/watch/`。
6. 回到 App Store Connect 上传对应平台截图。

## 质量检查

- 截图文字没有被遮挡。
- 图表和按钮不空白。
- Watch 截图能看出“用户主动选择状态”，不是自动诊断。
- iPhone “我的”页能显示 Watch 最近记录。
- 截图没有系统通知、个人账号、真实隐私内容。

