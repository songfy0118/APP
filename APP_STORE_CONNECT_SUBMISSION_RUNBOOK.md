# App Store Connect 提交当天流程

## 目标

把《今晚不睡》从本仓库材料推进到 App Store Connect 提交审核。  
当前 Windows 仓库负责准备材料；真实 iOS / watchOS build、截图和上传必须在 Mac/Xcode 完成。

## 0. 提交前确认

- 本地运行 `npm run preflight:appstore`，确认没有 errors。
- Apple Developer Program 已开通。
- 已按 `APPLE_DEVELOPER_SETUP_CHECKLIST.md` 注册 Bundle ID 并创建 App Store Connect App 记录。
- GitHub Pages 已成功部署。若仍是 404，先按 `PAGES_PUBLICATION_STATUS.md` 修复。
- Support URL 可访问：`https://songfy0118.github.io/APP/support.html`
- Privacy Policy URL 可访问：`https://songfy0118.github.io/APP/privacy.html`
- Terms URL 可访问：`https://songfy0118.github.io/APP/terms.html`
- 开发者联系邮箱已确定。
- App 不使用“鼓励熬夜、检测焦虑、治疗失眠、心理诊断、医疗级监测”等审核高风险表述。

## 1. 在 Mac/Xcode 准备 Build

1. 按 `MAC_XCODE_HANDOFF.md` 拉取 GitHub 最新代码。
2. 安装依赖并生成 iOS 工程。
3. 添加 watchOS target。
4. 接入或放入 `native/watchos/MoonWatchCompanion.swift`。
5. 设置 Team、Bundle ID、Version、Build。
   - 第一版候选值见 `BUNDLE_ID_AND_VERSIONING.md`。
6. 在 iPhone Simulator / 真机运行。
7. 在 Apple Watch Simulator / 真机运行。
8. Product -> Archive。
9. Organizer -> Distribute App -> App Store Connect。
10. 上传后等待 App Store Connect 处理 build。

## 2. 准备截图

按 `SCREENSHOT_CAPTURE_CHECKLIST.md` 生成：

- iPhone 5 张：`screenshots/iphone/`
- Apple Watch 3 张：`screenshots/watch/`

截图必须来自真实 App、模拟器或真机，不用浏览器模拟图冒充上架截图。

## 3. App Store Connect 填表

按 `APP_STORE_CONNECT_FIELD_VALUES.md` 填：

- Name：今晚不睡
- Subtitle：睡前情绪记录与腕上缓冲
- Primary Category：Lifestyle
- Secondary Category：Health & Fitness
- Pricing：Free
- Support URL：`https://songfy0118.github.io/APP/support.html`
- Privacy Policy URL：`https://songfy0118.github.io/APP/privacy.html`
- Demo Account：当前 MVP 不需要

## 4. 隐私标签

如果第一版保持：

- 本地保存
- 无账号
- 无云同步
- 无广告 SDK
- 无分析 SDK

则按 `TESTFLIGHT_AND_PRIVACY_CHECKLIST.md` 的“不收集数据”方向填写。  
如果临时加入任何账号、云同步、广告、分析、崩溃日志上传或订阅标识，必须先改隐私政策，再重新填隐私标签。

## 5. 审核备注

复制 `APP_REVIEW_NOTES_DRAFT.md` 的 English Notes 和 Reviewer Test Steps。  
重点说明：

- 情绪状态由用户主动选择。
- App 不做检测、诊断或治疗。
- 当前记录保存在本地设备。
- Watch 端是 10 秒缓冲和轻触觉陪伴。

## 6. 提交审核前最后检查

- Build 已在 App Store Connect 选择到当前版本。
- iPhone 截图已上传。
- Apple Watch 截图已上传。
- App 图标已使用 `assets/app-icon-1024.png` 或最终替换版。
- Support URL、Privacy Policy URL 能在未登录浏览器访问。
- 年龄分级没有误填医疗、赌博、成人、公开社区等不相关内容。
- App Review Notes 没有中文乱码。
- App 内没有“治疗、诊断、检测焦虑、鼓励熬夜”等高风险词。

## 7. 提交后

- 记录提交时间、版本号和 build 号。
- 如果被拒，先复制完整拒审理由，再按问题分类处理。
- 不要为了通过审核临时添加未经测试的功能。
