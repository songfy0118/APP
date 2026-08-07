# 质量门禁清单

## 当前应通过

### 代码语法检查

```bat
npm run check
```

用途：

- 检查 App 主脚本、配置、service worker、小游戏脚本和工具脚本语法。

当前预期：

- 应通过。

### App Store 本地材料预检

```bat
npm run preflight:appstore
```

用途：

- 检查关键文件是否存在。
- 检查 1024 图标尺寸是否正确。
- 列出仍需人工或 Mac/Xcode 完成的事项。

当前预期：

- `Errors: none`
- 仍会提示 Pages、账号、截图、TestFlight、开发者邮箱等 manual checks。

### App Review 文案风险扫描

```bat
npm run check:review-copy
```

用途：

- 扫描公开页面、配置文案和上架文案草稿里是否出现高风险审核表述。

当前预期：

- `Risky phrases: none`

## 当前会失败，但属于已知外部卡点

### GitHub Pages URL 检查

```bat
npm run check:pages
```

用途：

- 检查 Support URL、Privacy Policy URL、Terms URL 是否公开可访问。

当前预期：

- 现在会失败，因为 2026-08-07 直接检查仍返回 404。
- 修复方式见 `PAGES_PUBLICATION_STATUS.md`。

通过条件：

- `support.html`
- `privacy.html`
- `terms.html`

三者都返回 OK。

### App Store 截图检查

```bat
npm run check:screenshots
```

用途：

- 检查 iPhone 5 张和 Apple Watch 3 张截图是否按指定文件名放好。

当前预期：

- 现在会失败，因为真实截图必须在 Mac/Xcode 或真机/模拟器生成。
- 采集方式见 `SCREENSHOT_CAPTURE_CHECKLIST.md`。

通过条件：

- `screenshots/iphone/iphone-01-tonight.png`
- `screenshots/iphone/iphone-02-note.png`
- `screenshots/iphone/iphone-03-weekly-report.png`
- `screenshots/iphone/iphone-04-charts.png`
- `screenshots/iphone/iphone-05-watch-summary.png`
- `screenshots/watch/watch-01-mood-picker.png`
- `screenshots/watch/watch-02-buffer.png`
- `screenshots/watch/watch-03-comfort.png`

## 提交 App Store 前必须全部通过

在真正提交审核前，这些命令都应该通过：

```bat
npm run check
npm run preflight:appstore
npm run check:review-copy
npm run check:pages
npm run check:screenshots
```

如果 `check:pages` 或 `check:screenshots` 仍失败，不要提交 App Store 审核。

