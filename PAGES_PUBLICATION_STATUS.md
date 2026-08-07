# GitHub Pages 公开访问状态

## 当前结论

2026-08-07 已直接检查预期 App Store URL，当前返回 404。  
因此这些 URL 还不能填写到 App Store Connect：

- `https://songfy0118.github.io/APP/support.html`
- `https://songfy0118.github.io/APP/privacy.html`
- `https://songfy0118.github.io/APP/terms.html`

## 已有配置

- Pages workflow：`.github/workflows/pages.yml`
- 触发分支：`master`
- 部署来源：仓库根目录
- `.nojekyll`：已存在
- 需要发布的页面：`support.html`、`privacy.html`、`terms.html`

## 最可能原因

1. GitHub Pages 还没有在仓库设置里启用。
2. Pages source 不是 `GitHub Actions`。
3. `Deploy static preview` workflow 没有成功完成。
4. 仓库权限或 Pages 权限阻止了部署。

## 最短修复路径

1. 打开 `https://github.com/songfy0118/APP/actions`。
2. 找到最新的 `Deploy static preview`。
3. 如果没有运行，点 `Run workflow`。
4. 如果失败，打开失败日志，优先看 `Deploy to GitHub Pages` 步骤。
5. 打开 `https://github.com/songfy0118/APP/settings/pages`。
6. 把 Source 设置为 `GitHub Actions`。
7. 等待部署完成，回到 Pages 设置页复制最终 URL。
8. 用未登录浏览器打开：
   - `https://songfy0118.github.io/APP/support.html`
   - `https://songfy0118.github.io/APP/privacy.html`
   - `https://songfy0118.github.io/APP/terms.html`

## 临时备用方案

如果 GitHub Pages 当天无法成功，可以把这 3 个 HTML 文件部署到任何 HTTPS 静态托管服务：

- `support.html`
- `privacy.html`
- `terms.html`

然后把实际 URL 更新到：

- `APP_STORE_CONNECT_FIELD_VALUES.md`
- `APP_STORE_CONNECT_SUBMISSION_RUNBOOK.md`
- `APP_STORE_ASSET_INVENTORY.md`
- `RELEASE_STATUS.md`

