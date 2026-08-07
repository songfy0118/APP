# Apple Developer 与 App Store Connect 设置清单

## 目标

创建《今晚不睡》第一版 App Store 记录，并让 Xcode 上传 build 时使用同一套 Bundle ID、SKU、Version 和 Build。

## 前置条件

- Apple Developer Program 已开通。
- 能登录 Apple Developer 和 App Store Connect。
- 已确定开发者联系邮箱。
- 已确认第一版是否使用默认 Bundle ID：`com.jinwanbushui.app`。

## 1. 注册 Bundle ID

在 Apple Developer 后台创建 iOS App ID：

```text
com.jinwanbushui.app
```

建议名称：

```text
Tonight Not Sleeping
```

第一版能力尽量保持简单：

- App Groups：暂不启用，除非 Watch 与 iPhone 共享数据需要。
- iCloud：暂不启用。
- Push Notifications：暂不启用。
- Sign in with Apple：暂不启用。
- HealthKit：暂不启用。

如果 Apple 后台提示 ID 被占用，按 `BUNDLE_ID_AND_VERSIONING.md` 的备选值换一个，并同步修改：

- `capacitor.config.json`
- Xcode iOS target
- App Store Connect App 记录

## 2. 创建 App Store Connect 记录

在 App Store Connect 新建 App：

| 字段 | 候选值 |
| --- | --- |
| Platform | iOS |
| Name | 今晚不睡 |
| Primary Language | Chinese, Simplified |
| Bundle ID | `com.jinwanbushui.app` |
| SKU | `JINWANBUSHUI-IOS-001` |
| User Access | Full Access |

## 3. Xcode 中保持一致

iPhone target：

```text
Bundle Identifier: com.jinwanbushui.app
Version: 0.1.0
Build: 1
```

Apple Watch target 可使用 Xcode 自动生成，但前缀应来自 iPhone target，例如：

```text
com.jinwanbushui.app.watchkitapp
com.jinwanbushui.app.watchkitapp.watchkitextension
```

## 4. 第一版不建议开启的能力

- HealthKit：会增加隐私和审核解释成本。
- 后台持续情绪检测：第一版先做用户主动选择。
- 推送通知：容易带来权限和文案审核问题。
- 账号登录：会增加隐私政策、删除账号和审核账号要求。
- 云同步：会改变“本地保存、不收集数据”的隐私标签判断。

## 5. 完成后记录

把最终确认值写回：

- `BUNDLE_ID_AND_VERSIONING.md`
- `APP_STORE_CONNECT_FIELD_VALUES.md`
- `RELEASE_STATUS.md`

至少记录：

- Bundle ID
- SKU
- Version
- Build
- 开发者联系邮箱
- App Store Connect App 是否创建成功

