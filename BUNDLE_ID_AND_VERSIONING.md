# Bundle ID 与版本号草案

## 结论

第一版建议沿用当前 Capacitor 配置里的 App ID：

```text
com.jinwanbushui.app
```

这个值后续应同时用于：

- Capacitor：`capacitor.config.json`
- Xcode iOS target Bundle Identifier
- Xcode watchOS app / extension 的 Bundle Identifier 前缀
- App Store Connect App 记录

## 当前字段

| 字段 | 建议值 | 状态 |
| --- | --- | --- |
| App Name | 今晚不睡 | 已有草稿 |
| Bundle ID | `com.jinwanbushui.app` | 候选，需 Apple Developer 后台确认可注册 |
| SKU | `JINWANBUSHUI-IOS-001` | 候选 |
| Version | `0.1.0` | 候选，对齐 `package.json` |
| Build | `1` | 首个 TestFlight build 候选 |
| Primary category | Lifestyle | 已有草稿 |
| Secondary category | Health & Fitness | 已有草稿 |

## Watch Bundle ID 建议

在 Xcode 添加 Apple Watch target 时，常见命名方式：

```text
com.jinwanbushui.app.watchkitapp
com.jinwanbushui.app.watchkitapp.watchkitextension
```

具体名称以 Xcode 自动生成和 Apple Developer 后台可注册结果为准。不要让 Watch target 使用和 iPhone target 完全相同的 Bundle ID。

## 修改规则

- 如果要换 Bundle ID，先改 `capacitor.config.json`，再重新生成/同步 iOS 工程。
- App Store Connect 里创建 App 后，Bundle ID 不要再随意换。
- `Version` 面向用户，例如 `0.1.0`、`0.1.1`、`1.0.0`。
- `Build` 面向上传次数，每次重新上传 TestFlight 都要递增，例如 `1`、`2`、`3`。

## 本周提交建议

第一版 TestFlight：

```text
Version: 0.1.0
Build: 1
SKU: JINWANBUSHUI-IOS-001
Bundle ID: com.jinwanbushui.app
```

如果 Apple Developer 后台提示 Bundle ID 已被占用，备选：

```text
com.songfy0118.jinwanbushui
com.songfy0118.tonightcompanion
```

