# TestFlight 与隐私标签检查表

## 依据

本检查表按 Apple 官方文档整理：

- App Store Connect workflow
- Upload builds
- Manage app privacy
- App privacy details
- Watch Connectivity / WCSession

## TestFlight 前置条件

- Apple Developer Program 账号已开通。
- App Store Connect 里已创建 App 记录。
- Bundle ID 与 Xcode 工程一致。
- 已在 Mac/Xcode 中生成 iOS App target。
- 已在同一个 Xcode 工程中加入 watchOS App target。
- iPhone 和 Apple Watch 真机可用于测试。
- 已准备 App 图标、截图、App 描述、关键词和隐私政策 URL。

## 上传 Build 的路线

1. 在 Xcode 中选择正确 Team、Bundle ID、版本号和 Build 号。
2. Product -> Archive。
3. 在 Organizer 中选择 Distribute App。
4. 上传到 App Store Connect。
5. 等 Apple 处理 build。
6. 在 App Store Connect -> TestFlight 里查看状态。
7. 如果出现 Missing Compliance、Invalid Binary 等状态，按 Apple 提示修复后重新上传。

## 当前项目对应材料

- App Store 文案：`APP_STORE_METADATA_DRAFT.md`
- 提交路线：`APP_STORE_SUBMISSION.md`
- 隐私政策网页：`privacy.html`
- 用户协议网页：`terms.html`
- GitHub Pages 部署：`GITHUB_PAGES_DEPLOYMENT.md`
- WatchConnectivity 计划：`WATCH_CONNECTIVITY_XCODE_PLAN.md`
- Watch SwiftUI 原型：`native/watchos/MoonWatchCompanion.swift`

## 隐私标签初步判断

当前 MVP 设计为本地设备保存：

- 用户主动选择情绪状态。
- 用户主动写睡前文字。
- App 在本机生成报告。
- Apple Watch 触发记录同步到 iPhone 本机。

如果正式版仍不上传服务器、不接入广告、不接入分析、不接账号系统，App Store Connect 里的数据收集问答可以按“不收集数据”方向准备。

一旦接入以下任一能力，需要重新填写隐私标签：

- 账号登录
- 云同步
- 广告 SDK
- 第三方统计分析
- 崩溃日志或诊断上传
- 远程文案/配置后台
- 支付或订阅用户标识

## WatchConnectivity 注意点

- iOS App 和 watchOS App 都需要配置并激活 `WCSession`。
- 发送消息前先检查支持状态。
- Watch 端适合发送小数据：mood、reply、createdAt、source。
- iPhone 端接收后写入本地记录，保持和当前 `app.js` 数据结构一致。

## 不能在 Windows 完成的事情

- Xcode Archive。
- watchOS target 编译。
- TestFlight 上传。
- 真机 Apple Watch 联调。

这些必须在 Mac/Xcode 上完成。

