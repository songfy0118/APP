# GitHub Pages 排查清单

## 当前现象

已提交 GitHub Pages Actions 工作流。2026-08-07 直接访问预期公开 URL 返回 404：

- `https://songfy0118.github.io/APP/privacy.html`
- `https://songfy0118.github.io/APP/terms.html`
- `https://songfy0118.github.io/APP/support.html`

详细状态记录见：`PAGES_PUBLICATION_STATUS.md`

## 手动检查顺序

### 1. 检查 Actions

打开：

`https://github.com/songfy0118/APP/actions`

查看最新 workflow：

`Deploy static preview`

如果是绿色成功，继续检查 Pages URL。

如果失败，点进去看失败步骤：

- Checkout
- Setup Pages
- Upload artifact
- Deploy to GitHub Pages

### 2. 检查 Pages 设置

打开：

`https://github.com/songfy0118/APP/settings/pages`

确认：

- Source 选择 `GitHub Actions`
- Branch 不要选错到空分支
- Custom domain 留空

### 3. 检查仓库可见性

如果仓库是 private，GitHub Pages 可能受账号套餐或仓库设置影响。

如果仓库是 public，通常可直接发布 Pages。

### 4. 等待部署

GitHub Pages 首次部署可能需要几分钟。部署成功后，Pages 设置页会显示最终 URL。

## 成功后需要记录

把实际 URL 更新到：

- `APP_STORE_SUBMISSION.md`
- `GITHUB_PAGES_DEPLOYMENT.md`
- `RELEASE_STATUS.md`
- `APP_STORE_CONNECT_FIELD_VALUES.md`
- `APP_STORE_ASSET_INVENTORY.md`

## 如果 Actions 无法部署

备用方案：

1. 在 `Settings -> Pages` 中选择从 `master` 分支根目录部署。
2. 或者把 `support.html`、`privacy.html` 和 `terms.html` 放到任意静态托管服务。
3. 确保 URL 是 HTTPS。
