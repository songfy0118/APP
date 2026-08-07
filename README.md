# 今晚不睡

一个面向手机和 Apple Watch 的深夜记录与情绪陪伴 App 雏形。

## 当前功能

- 手机 App 雏形界面，包含 `今晚 / 档案 / 报告 / 我的` 四个页面
- 记录今晚开始时间和结束时间
- 选择情绪状态并写一句深夜记录
- 小月亮陪伴回复
- 夜晚档案、本周报告卡、热力图、条形图、夜猫人格雷达图
- 手表陪伴模式预览：选择情绪后显示表情和安慰语
- PWA 基础配置：manifest、service worker、App 图标
- App Store 提交路线说明
- watchOS SwiftUI 雏形代码

## 本地预览

双击：

```bat
start-preview.bat
```

然后在电脑浏览器打开：

```text
http://127.0.0.1:5173/index.html
```

如果要用手机预览，手机和电脑需要在同一个 Wi-Fi，再打开：

```text
http://电脑的局域网IP:5173/index.html
```

## 关键文件

- `DO_THIS_NEXT.md`：当前最短下一步行动清单
- `QUALITY_GATES.md`：本地检查命令、当前预期结果和提交前通过条件
- `index.html`：手机 App 页面结构
- `styles.css`：手机 App 外观样式
- `app.js`：核心交互和本地数据逻辑
- `config.js`：陪伴文案、人格标签、手表情绪配置
- `manifest.json`：PWA 安装配置
- `service-worker.js`：离线缓存基础
- `capacitor.config.json`：后续打包 iOS/Android 的 Capacitor 配置
- `assets/app-icon-1024.png`：App Store 1024 图标候选
- `native/watchos/MoonWatchCompanion.swift`：Apple Watch 端 SwiftUI 雏形
- `APP_STORE_SUBMISSION.md`：App Store 提交路线
- `privacy.html` / `terms.html`：上架前隐私政策和用户协议网页
- `support.html`：App Store Connect 支持网址页面
- `.github/workflows/pages.yml`：GitHub Pages 静态部署工作流
- `RELEASE_STATUS.md`：当前完成度、阻塞项和下一步
- `APP_STORE_ASSET_INVENTORY.md`：上架所需图标、截图、URL 和账号材料盘点
- `SCREENSHOT_CAPTURE_CHECKLIST.md`：iPhone 和 Apple Watch 截图文件名与采集执行表
- `APP_STORE_CONNECT_SUBMISSION_RUNBOOK.md`：App Store Connect 提交当天流程
- `APP_REVIEW_REJECTION_PLAYBOOK.md`：App Review 拒审后的分类处理清单
- `PAGES_PUBLICATION_STATUS.md`：GitHub Pages 公开访问状态和 404 修复路径
- `SCREENSHOT_DEMO_MODE.md`：用于 App Store 截图采集的稳定示例数据模式
- `BUNDLE_ID_AND_VERSIONING.md`：Bundle ID、SKU、Version、Build 候选值
- `APPLE_DEVELOPER_SETUP_CHECKLIST.md`：Apple Developer 和 App Store Connect 创建记录清单
- `MAC_XCODE_HANDOFF.md`：在 Mac/Xcode 中继续打包和接 Apple Watch 的执行清单

## GitHub Pages

仓库已加入 GitHub Pages Actions 配置。推送到 `master` 后，可在 GitHub 仓库的 `Settings -> Pages` 中启用或查看部署状态。

常见访问地址：

```text
https://songfy0118.github.io/APP/
https://songfy0118.github.io/APP/support.html
https://songfy0118.github.io/APP/privacy.html
https://songfy0118.github.io/APP/terms.html
```

## 上架方向

当前项目还不是可直接上传 App Store 的 Xcode 工程。后续正规路径：

1. 完善手机 App MVP
2. 接 Capacitor 生成 iOS/Android 工程
3. 在 Mac/Xcode 中创建 iOS App 和 watchOS target
4. 将 `native/watchos/MoonWatchCompanion.swift` 放入 watchOS target
5. 用 TestFlight 内测
6. 准备隐私政策、用户协议、截图和描述
7. 提交 App Store 审核

提交前可先运行本地预检：

```bat
npm run preflight:appstore
```

GitHub Pages 设置修好后，可检查 App Store URL 是否公开可达：

```bat
npm run check:pages
```

提交审核前也可以扫描公开文案中的高风险表述：

```bat
npm run check:review-copy
```

## 审核表述建议

推荐定位为：

> 睡眠与情绪记录陪伴工具，帮助用户记录夜晚状态、睡前想法和情绪变化，并提供轻量陪伴回应。

避免使用：

- 治疗失眠
- 检测焦虑
- 心理诊断
- 医疗级压力监测
- 鼓励熬夜
