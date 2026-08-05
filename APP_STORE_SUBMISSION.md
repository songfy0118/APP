# 《今晚不睡》App Store 提交路线

## 结论

App Store 最后上传的不是 `html/css/js`，而是 Xcode 生成的 iOS 构建版本。  
如果带 Apple Watch，需要在同一个 Xcode 项目里包含 iPhone App 和 watchOS App。

## 需要上传什么

- iPhone：Xcode Archive 上传到 App Store Connect 的 iOS Build
- Apple Watch：随 iPhone App 一起打包的 watchOS App
- Android：后续单独生成 `.apk` 或 `.aab`

## 当前项目里已有的东西

- 手机 App 前端雏形：`index.html`、`styles.css`、`app.js`
- PWA 配置：`manifest.json`、`service-worker.js`
- App 图标：`assets/`
- Capacitor 占位配置：`capacitor.config.json`
- 手表交互雏形：`native/watchos/MoonWatchCompanion.swift`

## 上 App Store 前必须准备

1. Apple Developer Program 账号
2. Mac 和 Xcode
3. App Store Connect App 记录
4. iPhone App 构建
5. watchOS App target
6. App 图标
7. iPhone 截图
8. Apple Watch 截图
9. 隐私政策网址
10. 用户协议网址
11. App 描述、关键词、年龄分级

## 审核措辞

推荐写法：

> 《今晚不睡》是一款睡眠与情绪记录陪伴工具。用户可以记录夜晚状态、睡前想法和情绪变化，并在手机与 Apple Watch 上获得轻量陪伴回应。

避免写法：

- 检测焦虑
- 诊断情绪异常
- 治疗失眠
- 自动识别心理问题
- 鼓励熬夜

## 第一版 MVP 范围

iPhone:

- 记录今晚
- 选择情绪
- 写一句
- 小月亮回应
- 夜晚档案
- 周报/雷达图

Apple Watch:

- 快捷选择紧张、困、烦、低落
- 显示一句轻量陪伴提示
- 10 秒缓冲动画和倒计时
- 轻触觉反馈
- 后续通过 WatchConnectivity 同步到 iPhone

## 后续真实工程步骤

1. 安装 Capacitor 依赖
2. 生成 iOS 工程
3. 在 Xcode 添加 watchOS App target
4. 把 `native/watchos/MoonWatchCompanion.swift` 放入 watch target
5. 真机测试 iPhone + Apple Watch
6. 上传 TestFlight
7. 准备截图和隐私材料
8. 提交 App Store 审核

## 当前元数据草稿

- App Store 文案：`APP_STORE_METADATA_DRAFT.md`
- 隐私政策草稿：`PRIVACY_POLICY_DRAFT.md`
- WatchConnectivity 计划：`WATCH_CONNECTIVITY_XCODE_PLAN.md`
