# 发布状态看板

## 当前方向

主线：Apple Watch + iPhone 情绪记录与 10 秒腕上缓冲。

小游戏：保留为传播实验和主 App 引流入口。

## 已完成

### 产品原型

- iPhone 端：今晚记录、情绪选择、片刻保存、档案、周报、热力图、条形图、雷达图。
- Apple Watch 端：4 个情绪入口、触觉反馈、10 秒缓冲动画、倒计时。
- 手机端承接 Watch：本周触发次数、常见状态、最近腕上缓冲记录。
- 小游戏实验：找茬玩法、每日挑战、广告提示位、排行榜、好友挑战、引流到主 App。

### 上架材料

- App Store 提交路线：`APP_STORE_SUBMISSION.md`
- App Store 元数据草稿：`APP_STORE_METADATA_DRAFT.md`
- App Store 截图计划：`APP_STORE_SCREENSHOT_PLAN.md`
- 隐私政策草稿：`PRIVACY_POLICY_DRAFT.md`
- 隐私政策网页：`privacy.html`
- 用户协议网页：`terms.html`
- TestFlight 与隐私标签检查表：`TESTFLIGHT_AND_PRIVACY_CHECKLIST.md`
- WatchConnectivity 接入计划：`WATCH_CONNECTIVITY_XCODE_PLAN.md`

### 静态部署

- 已添加 GitHub Pages Actions 工作流：`.github/workflows/pages.yml`
- 已添加 `.nojekyll`
- 已添加部署说明：`GITHUB_PAGES_DEPLOYMENT.md`
- 已添加 Pages 排查清单：`GITHUB_PAGES_TROUBLESHOOTING.md`

## 当前阻塞

### 需要在 GitHub 网页确认

- GitHub Pages 是否已启用。
- Pages source 是否设置为 GitHub Actions。
- Actions 里的 Pages workflow 是否成功。
- 隐私政策 URL 是否可访问。
- 当前自动检查尚未确认公开 URL 可访问，需要在 GitHub 页面手动核对。

预期 URL：

- `https://songfy0118.github.io/APP/privacy.html`
- `https://songfy0118.github.io/APP/terms.html`

### 需要在 Mac/Xcode 完成

- Capacitor 生成 iOS 工程。
- Xcode 添加 watchOS target。
- 编译 `native/watchos/MoonWatchCompanion.swift`。
- 接 WatchConnectivity。
- 真机测试 iPhone + Apple Watch。
- Xcode Archive。
- 上传 TestFlight。

### 需要用户填写

- Apple Developer Program 是否已开通。
- 开发者联系邮箱。
- 隐私政策生效日期。
- App Store Connect 里的 App 名称、Bundle ID、SKU。
- 是否需要账号、云同步、广告、分析或订阅。

## 下一步优先级

1. 在 GitHub 页面确认 Pages 部署成功，拿到隐私政策 HTTPS URL。
2. 如果 Pages 没成功，按 `GITHUB_PAGES_TROUBLESHOOTING.md` 排查。
3. 在 Mac/Xcode 建立真实 iOS + watchOS 工程。
4. 接 WatchConnectivity，把 Watch 端事件写入 iPhone。
5. 生成 TestFlight build。

## 当前不建议继续做

- 不继续堆小游戏关卡。
- 不先做账号系统。
- 不先接广告 SDK。
- 不先写医疗或诊断相关文案。
