# Mac / Xcode 交接执行清单

## 目的

把当前 Windows 上完成的网页原型、watchOS SwiftUI 文件和上架材料，交接到 Mac/Xcode 环境，继续生成 iOS + Apple Watch 真机版本。

## 1. 拉取仓库

```bash
git clone https://github.com/songfy0118/APP.git
cd APP
```

如果已经有仓库：

```bash
git pull origin master
```

## 2. 本地预览

```bash
python3 -m http.server 5173
```

打开：

```text
http://127.0.0.1:5173/index.html
```

确认：

- iPhone 页面可以打开。
- “我的”页里有 Watch 陪伴模式。
- 点击“紧张/困/烦/低落”后，手表摘要会更新。
- `privacy.html` 和 `terms.html` 可以打开。

## 3. 生成 iOS 工程

当前项目已有 `capacitor.config.json`，但还没有提交 `ios/` 原生工程。

在 Mac 上安装依赖后执行：

```bash
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```

如果项目没有安装 Capacitor 包，需要先补依赖：

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
```

生成后的 `ios/` 目录目前被 `.gitignore` 忽略。第一阶段可以先不提交，确认 Xcode 能跑通后再决定是否纳入仓库。

## 4. Xcode 基础设置

在 Xcode 中确认：

- Team 选择你的 Apple Developer 账号。
- Bundle Identifier 与 App Store Connect 记录一致。
- Version 和 Build 填写清楚，例如 `0.1.0` / `1`。
- Signing 自动管理。
- Deployment Target 选择当前 Xcode 推荐的稳定版本。

## 5. 添加 watchOS App target

在 Xcode：

1. File -> New -> Target
2. 选择 watchOS App
3. 命名为 `MoonWatchCompanion` 或同类名称
4. 确认它随 iPhone App 一起打包
5. 把 `native/watchos/MoonWatchCompanion.swift` 加入 Watch target

## 6. WatchConnectivity 接入

参考：

- `WATCH_CONNECTIVITY_XCODE_PLAN.md`

首版数据只需要：

```swift
[
  "source": "watch",
  "mood": selected.mood,
  "reply": selected.reply,
  "createdAt": ISO8601DateFormatter().string(from: Date())
]
```

iPhone 端接收后写入本地记录，保持字段：

```json
{
  "source": "watch",
  "mood": "紧张",
  "note": "Apple Watch 10 秒缓冲：紧张",
  "savedOnly": true
}
```

## 7. 真机验证

### iPhone

- App 能启动。
- 本地记录能保存。
- 报告页能生成。
- 隐私政策和用户协议链接能打开。

### Apple Watch

- Watch App 能启动。
- 4 个情绪按钮能点击。
- 10 秒缓冲能倒计时。
- 触觉反馈能播放。
- 事件能同步回 iPhone。

## 8. TestFlight 上传

参考：

- `TESTFLIGHT_AND_PRIVACY_CHECKLIST.md`

路径：

1. Product -> Archive
2. Distribute App
3. Upload to App Store Connect
4. 等待 Apple 处理 build
5. 在 TestFlight 中添加内部测试员

## 9. App Store Connect 填表

参考：

- `APP_STORE_CONNECT_FIELD_VALUES.md`
- `APP_STORE_METADATA_DRAFT.md`
- `APP_REVIEW_NOTES_DRAFT.md`
- `APP_STORE_SCREENSHOT_PLAN.md`

必须确认：

- Privacy Policy URL 可访问。
- Support URL 可访问。
- 截图无透明通道。
- Review Notes 不写医疗、诊断、治疗。

## 10. 当前不要做

- 不先接广告 SDK。
- 不先接云同步。
- 不先加账号系统。
- 不先写“检测焦虑/治疗失眠/诊断压力”。
- 不把小游戏当唯一主产品继续堆关卡。

