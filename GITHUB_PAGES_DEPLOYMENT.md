# GitHub Pages 部署说明

## 目的

把当前静态原型、隐私政策和用户协议发布成 HTTPS 网页，方便后续填写 App Store Connect。

## 已加入的配置

- `.github/workflows/pages.yml`
- `.nojekyll`

推送到 `master` 后，GitHub Actions 会尝试部署整个仓库根目录。

## 需要在 GitHub 仓库里确认

打开仓库：

`https://github.com/songfy0118/APP`

进入：

`Settings -> Pages`

如果 GitHub 没有自动启用，需要选择：

- Source: GitHub Actions

部署成功后，常见访问地址会类似：

- App 预览：`https://songfy0118.github.io/APP/`
- 隐私政策：`https://songfy0118.github.io/APP/privacy.html`
- 用户协议：`https://songfy0118.github.io/APP/terms.html`
- 小游戏实验：`https://songfy0118.github.io/APP/viral-game/`

实际 URL 以 GitHub Pages 页面显示为准。

## App Store Connect 填写

隐私政策 URL：

`https://songfy0118.github.io/APP/privacy.html`

用户协议 URL：

`https://songfy0118.github.io/APP/terms.html`

## 注意

这些页面现在仍是上线前草稿。正式提交前需要补：

- 开发者联系邮箱
- 生效日期
- 如果接入广告、云同步、账号或分析服务，需要更新隐私说明

