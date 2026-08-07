# App Store Connect 填表值草稿

## App Information

### Name

今晚不睡

### Subtitle

睡前情绪记录与腕上缓冲

### Bundle ID / SKU / Version

详见：`BUNDLE_ID_AND_VERSIONING.md`

建议第一版：

- Bundle ID: `com.jinwanbushui.app`
- SKU: `JINWANBUSHUI-IOS-001`
- Version: `0.1.0`
- Build: `1`

### Category

Primary:

- Lifestyle

Secondary:

- Health & Fitness

说明：当前 App 是记录和陪伴工具，不建议主打医疗健康。

## Pricing

第一版建议：

- Free

原因：先降低下载门槛，等 TestFlight 和真实留存验证后再考虑订阅、买断或小游戏广告漏斗。

## App Privacy

当前 MVP 方向：

- Records stay on device.
- No account.
- No cloud sync.
- No ads SDK.
- No analytics SDK.

如果正式版保持以上条件，App Store Connect 隐私问答可按“不收集数据”方向准备。

如果加入账号、云同步、广告、分析、崩溃日志上传或订阅用户标识，需要重新填写。

## Description

《今晚不睡》是一款睡前状态记录与轻量陪伴工具。

你可以在 iPhone 上记录夜晚开始和结束的时间、选择此刻状态、写下一句睡前想法，并生成本周报告、夜晚热力图和状态摘要。

如果你使用 Apple Watch，可以在手腕上快速选择“紧张、困、烦、低落”等状态，启动一个 10 秒缓冲动画，并获得轻触觉反馈和一句简短陪伴提示。

这个 App 不做诊断，也不替代专业帮助。它更像一个安静的记录本和轻量陪伴入口，帮助你把夜晚状态看清楚一点。

## Keywords

睡前记录, 情绪记录, Apple Watch, 睡眠习惯, 日记, 周报, 陪伴, 压力记录, 夜晚

## Promotional Text

记录夜晚状态，在 iPhone 和 Apple Watch 上获得轻量陪伴回应。

## What's New

首个 TestFlight 版本：支持夜晚状态记录、本周报告、Apple Watch 10 秒腕上缓冲原型。

## Support URL

上线前可暂用：

`https://songfy0118.github.io/APP/support.html`

前提：GitHub Pages 已成功部署。

## Privacy Policy URL

上线前可暂用：

`https://songfy0118.github.io/APP/privacy.html`

前提：GitHub Pages 已成功部署。

## Terms URL

如果 App Store Connect 或 App 页面需要填写：

`https://songfy0118.github.io/APP/terms.html`

前提：GitHub Pages 已成功部署。

## Review Notes

可复制到 App Review Notes：

Tonight Not Sleeping is a bedtime state journal and lightweight companion app. Users can record the start and end time of a night session, choose their current state, write a short bedtime note, and review weekly summaries and charts.

The Apple Watch companion provides four user-selected states: tense, sleepy, annoyed, and low. After the user taps a state, the watch displays a short supportive prompt and can start a 10-second buffering animation with haptic feedback.

This app does not detect, diagnose, or treat any mental health or sleep condition. It does not automatically identify anxiety, stress, or emotional abnormalities. All states are manually selected by the user.

The current MVP stores records locally on the user's device. If account sync, cloud storage, ads, or analytics are added later, the privacy policy and App Store privacy details will be updated.

## Demo Account

当前 MVP 不需要登录。

如果后续加入账号系统，需要在这里提供审核账号。

## Age Rating Notes

建议按普通记录工具填写，不包含：

- 赌博
- 付费抽奖
- 成人内容
- 医疗诊断
- 用户生成内容公开社区

需要注意：如果后续加入用户社区、好友互动、广告 SDK 或外链内容，年龄分级需要重新评估。

## Rejection Risk Checklist

提交前确认：

- App 内不要写“治疗失眠”。
- App 内不要写“检测焦虑”。
- App 内不要写“诊断压力”。
- App 内不要写“医疗级监测”。
- App 内不要鼓励用户熬夜。
- 隐私政策 URL 可访问。
- 如果 Watch target 随 iPhone App 提交，watchOS App 可正常启动。
