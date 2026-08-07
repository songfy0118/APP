# 现在下一步

## 先做这 4 件事

### 1. 修 GitHub Pages 404

打开：

```text
https://github.com/songfy0118/APP/settings/pages
```

优先选择：

```text
Deploy from a branch
Branch: master
Folder: /root
```

保存后等几分钟，再在本地运行：

```bat
npm run check:pages
```

必须看到 support、privacy、terms 都是 OK，才能把 URL 填进 App Store Connect。

### 2. 开 Apple Developer 并创建 App 记录

按：

```text
APPLE_DEVELOPER_SETUP_CHECKLIST.md
```

第一版候选值：

```text
Bundle ID: com.jinwanbushui.app
SKU: JINWANBUSHUI-IOS-001
Version: 0.1.0
Build: 1
```

### 3. 到 Mac/Xcode 打包

按：

```text
MAC_XCODE_HANDOFF.md
```

目标：

- 生成 iOS 工程
- 添加 watchOS target
- 放入 `native/watchos/MoonWatchCompanion.swift`
- 真机或模拟器跑通 iPhone + Watch
- 上传 TestFlight

### 4. 截 App Store 图

先用截图准备模式：

```text
index.html?demo=screenshot&tab=tonight
index.html?demo=screenshot&tab=report
index.html?demo=screenshot&tab=mine
```

再按：

```text
SCREENSHOT_CAPTURE_CHECKLIST.md
```

准备 iPhone 5 张、Apple Watch 3 张。

## 当前不要做

- 不要先接广告 SDK。
- 不要先做账号系统。
- 不要先开 HealthKit。
- 不要写“鼓励熬夜、治疗失眠、检测焦虑、心理诊断”。
- 不要把当前 404 的 Pages URL 填进 App Store Connect。

## 提交前最后运行

```bat
npm run check
npm run preflight:appstore
npm run check:pages
```

