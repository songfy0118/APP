# Xcode / WatchConnectivity 接入计划

## 目标

把当前原型从“网页预览 + SwiftUI 文件”推进到可在 Xcode 里调试的 iPhone + Apple Watch 双端工程。

## 需要的环境

- Mac
- Xcode
- Apple Developer Program 账号
- iPhone 真机
- Apple Watch 真机，且与 iPhone 配对

## 工程步骤

1. 用 Capacitor 生成 iOS 工程。
2. 在 Xcode 中打开 iOS 工程。
3. 新增 watchOS App target。
4. 把 `native/watchos/MoonWatchCompanion.swift` 放入 Watch App target。
5. iPhone target 和 Watch target 都开启 WatchConnectivity capability。
6. 在 Watch 端选择情绪后发送 message：

```swift
[
  "source": "watch",
  "mood": selected.mood,
  "reply": selected.reply,
  "createdAt": ISO8601DateFormatter().string(from: Date())
]
```

7. iPhone 端接收后写入本地记录，字段保持和当前 `app.js` 一致：

```json
{
  "source": "watch",
  "mood": "紧张",
  "note": "Apple Watch 10 秒缓冲：紧张",
  "savedOnly": true
}
```

## 审核边界

推荐描述：

> 记录情绪与夜晚状态，并提供轻量陪伴提示。

避免描述：

- 自动检测焦虑
- 诊断压力
- 治疗失眠
- 识别心理异常
- 鼓励熬夜

## 当前 Windows 上不能完成的验证

- 不能编译 watchOS target。
- 不能测试 WatchConnectivity。
- 不能生成 App Store 可上传 archive。

这些必须到 Mac/Xcode 环境完成。

