# App Store 资产盘点

## 结论

当前仓库已经具备提交前的产品雏形、政策页面、元数据草稿和 Watch 原型代码。  
还不能直接提交 App Store，因为缺少真实 Xcode 构建、真机截图、最终 1024 图标和 App Store Connect 账号字段确认。

## 已有资产

### 产品与代码

- iPhone H5/PWA 雏形：`index.html`、`styles.css`、`app.js`
- 陪伴文案和配置：`config.js`
- PWA 配置：`manifest.json`、`service-worker.js`
- Capacitor 配置占位：`capacitor.config.json`
- Apple Watch SwiftUI 雏形：`native/watchos/MoonWatchCompanion.swift`
- 小游戏传播实验：`viral-game/`

### 图标

- SVG 图标：`assets/app-icon.svg`
- PWA 192 图标：`assets/app-icon-192.png`
- PWA 512 图标：`assets/app-icon-512.png`

### 政策与网页

- 隐私政策草稿：`PRIVACY_POLICY_DRAFT.md`
- 隐私政策网页：`privacy.html`
- 用户协议网页：`terms.html`
- 支持页面：`support.html`
- GitHub Pages 工作流：`.github/workflows/pages.yml`
- GitHub Pages 排查清单：`GITHUB_PAGES_TROUBLESHOOTING.md`

### 上架文案

- 提交路线：`APP_STORE_SUBMISSION.md`
- App Store 元数据草稿：`APP_STORE_METADATA_DRAFT.md`
- App Store Connect 填表值：`APP_STORE_CONNECT_FIELD_VALUES.md`
- App Review 备注：`APP_REVIEW_NOTES_DRAFT.md`
- 截图计划：`APP_STORE_SCREENSHOT_PLAN.md`
- TestFlight 与隐私标签检查表：`TESTFLIGHT_AND_PRIVACY_CHECKLIST.md`

## 仍缺资产

### 必须补齐

- Apple Developer Program 账号。
- App Store Connect App 记录。
- Bundle ID、SKU、App 名称最终确认。
- Xcode iOS 工程。
- watchOS App target。
- iPhone + Apple Watch 真机或模拟器可运行 build。
- Xcode Archive 上传到 App Store Connect。
- TestFlight build。
- App Store 1024 x 1024 图标。
- iPhone 截图。
- Apple Watch 截图。
- 可公开访问的 Support URL：预期为 `https://songfy0118.github.io/APP/support.html`。
- 可公开访问的 Privacy Policy URL：预期为 `https://songfy0118.github.io/APP/privacy.html`。

### 建议补齐

- 一封开发者支持邮箱。
- 第一版应用内反馈入口。
- 简短 FAQ 或支持页面。
- TestFlight 内测记录：设备、系统版本、是否通过。

## 截图清单

### iPhone

- 首页：今晚记录入口。
- 情绪选择：用户主动选择状态。
- 记录页：一句睡前想法和陪伴回应。
- 报告页：周报、热力图、条形图、雷达图。
- 我的页：Apple Watch 缓冲摘要。

### Apple Watch

- 情绪选择页：紧张、困、烦、低落。
- 10 秒缓冲页：倒计时和圆环动画。
- 完成页：一句安慰提示。

## App Store Connect 字段状态

- App 名称：已有草稿，需最终确认。
- Subtitle：已有草稿。
- Description：已有草稿。
- Keywords：已有草稿。
- Category：已有草稿。
- Pricing：建议 Free。
- Privacy：当前按本地存储、不收集数据准备。
- Review Notes：已有草稿。
- Demo Account：当前不需要。
- Support URL：已有 `support.html`，等待 GitHub Pages 或其他静态托管成功。
- Privacy Policy URL：已有 `privacy.html`，等待 GitHub Pages 或其他静态托管成功。

## 风险

- 不能把 App 写成“鼓励熬夜”。审核表述应保持“睡前状态记录、情绪记录、轻量陪伴”。
- 不能写“检测焦虑、治疗失眠、心理诊断、医疗级压力监测”。
- 如果加入账号、云同步、广告、分析、崩溃日志或订阅，需要重写隐私政策和 App Store 隐私标签。
- 如果 Apple Watch 依赖后台自动情绪检测，审核和技术难度都会上升；第一版应保持用户主动选择状态。

## 本周最短上架路线

1. 在 GitHub 确认 Pages 部署成功，拿到 Privacy Policy URL 和 Support URL。
2. 在 Mac 上按 `MAC_XCODE_HANDOFF.md` 生成 iOS 工程并添加 watchOS target。
3. 把 `native/watchos/MoonWatchCompanion.swift` 接入 watch target。
4. 用模拟器和真机各跑一遍 iPhone + Watch。
5. 截 iPhone 和 Apple Watch 上架图。
6. 准备 1024 x 1024 App Store 图标。
7. Xcode Archive 上传 TestFlight。
8. 在 App Store Connect 按 `APP_STORE_CONNECT_FIELD_VALUES.md` 填表。
9. 复制 `APP_REVIEW_NOTES_DRAFT.md` 到审核备注。
10. 提交审核。
