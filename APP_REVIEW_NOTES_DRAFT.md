# App Review 备注草稿

## 中文说明

《今晚不睡》是一款睡前状态记录与轻量陪伴工具。用户可以记录夜晚开始和结束时间、选择当前状态、写下一句睡前想法，并查看本周报告和图表。

Apple Watch 端提供 4 个主动选择的状态入口：紧张、困、烦、低落。用户点击后会看到一句轻量陪伴提示，并可启动 10 秒缓冲动画和触觉反馈。

本 App 不检测、不诊断、不治疗任何心理或睡眠问题，也不会自动识别焦虑、压力或情绪异常。所有状态均由用户主动选择。

当前 MVP 的记录保存在用户设备本地。若后续接入账号、云同步、广告或分析服务，将更新隐私政策和 App Store 隐私标签。

## English Notes

Tonight Not Sleeping is a bedtime state journal and lightweight companion app. Users can record the start and end time of a night session, choose their current state, write a short bedtime note, and review weekly summaries and charts.

The Apple Watch companion provides four user-selected states: tense, sleepy, annoyed, and low. After the user taps a state, the watch displays a short supportive prompt and can start a 10-second buffering animation with haptic feedback.

This app does not detect, diagnose, or treat any mental health or sleep condition. It does not automatically identify anxiety, stress, or emotional abnormalities. All states are manually selected by the user.

The current MVP stores records locally on the user's device. If account sync, cloud storage, ads, or analytics are added later, the privacy policy and App Store privacy details will be updated.

## Reviewer Test Steps

1. Open the iPhone app.
2. Tap "开始记录今晚".
3. Choose a current state.
4. Write a short note.
5. Tap "让小月亮回一句" or "保存片刻".
6. Open "报告" to view the weekly report, heatmap, bar chart, and radar chart.
7. Open "我的" to view the Apple Watch companion preview.
8. Tap one Watch state, such as "紧张".
9. Confirm the Watch summary updates: weekly count, common state, latest time, and recent Watch records.
10. If testing the native watchOS target, open the Watch app, select a state, and start the 10-second buffer.

## App Review Boundary

Recommended framing:

- Mood and bedtime state journaling
- Lightweight companion response
- 10-second buffer
- User-selected state
- Local records

Avoided framing:

- Anxiety detection
- Stress diagnosis
- Insomnia treatment
- Mental health screening
- Medical-grade monitoring
- Encouraging users to stay up late

如果被拒审，按 `APP_REVIEW_REJECTION_PLAYBOOK.md` 先分类处理，不要临时扩大功能范围。
