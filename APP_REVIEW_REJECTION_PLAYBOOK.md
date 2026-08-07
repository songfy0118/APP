# App Review 拒审应对清单

## 原则

如果被拒，不要马上大改功能。先复制完整拒审理由、截图和条款编号，再按问题分类处理。  
第一版目标是证明这是“记录与陪伴工具”，不是医疗、心理诊断或鼓励熬夜产品。

## 1. URL 无法访问

常见现象：

- Privacy Policy URL 404。
- Support URL 404。
- 页面需要登录才能访问。

处理：

1. 先运行 `npm run check:pages`。
2. 如果仍 404，按 `PAGES_PUBLICATION_STATUS.md` 修复 GitHub Pages。
3. 确认未登录浏览器能打开：
   - `support.html`
   - `privacy.html`
   - `terms.html`
4. 重新提交前更新 App Store Connect 里的 URL。

回复思路：

```text
We have fixed the public Support URL and Privacy Policy URL. Both pages are now accessible without login.
```

## 2. 医疗、心理或睡眠诊断疑虑

常见现象：

- 审核认为 App 涉及心理健康声明。
- 审核要求解释是否提供诊断或治疗。

处理：

1. 检查 App 内文案，移除“检测、诊断、治疗、医疗级、焦虑识别”等词。
2. 保持 “user-selected state” 表述。
3. 在审核备注里强调 App 不自动检测、不诊断、不治疗。

回复思路：

```text
The app is a journaling and lightweight companion tool. It does not detect, diagnose, treat, or screen any mental health or sleep condition. All states are manually selected by the user.
```

## 3. 隐私标签不一致

常见现象：

- 审核认为 App 记录情绪或睡眠相关数据，但隐私标签没有说明。
- 审核询问数据是否上传服务器。

处理：

1. 如果第一版仍是本地保存，确认没有账号、云同步、广告 SDK、分析 SDK。
2. 隐私政策继续说明记录保存在本设备。
3. 如果加入任何远程服务，必须先更新隐私政策和隐私标签。

回复思路：

```text
The current version stores records locally on the user's device. The app does not use account login, cloud sync, advertising SDKs, or analytics SDKs.
```

## 4. Apple Watch 功能疑虑

常见现象：

- 审核找不到 Watch 功能。
- 审核以为 Watch 会自动检测情绪。
- Watch target 打不开或没有截图。

处理：

1. 确认 iPhone build 包含 watchOS App。
2. 确认 Watch App 可打开，并能选择“tense, sleepy, annoyed, low”。
3. 审核备注写清楚 Watch 是用户主动点击状态。
4. 上传 Apple Watch 截图。

回复思路：

```text
The Apple Watch companion is manually triggered. Users tap one of four states, and the watch displays a short supportive prompt with a 10-second buffer. It does not automatically detect emotions.
```

## 5. 截图或元数据问题

常见现象：

- 截图不是实际 App。
- 截图尺寸不符合要求。
- App 名称、描述或关键词包含高风险词。

处理：

1. 按 `SCREENSHOT_CAPTURE_CHECKLIST.md` 重新截真实模拟器/真机图。
2. 不使用浏览器模拟图冒充 App Store 截图。
3. 描述保留“记录、陪伴、用户主动选择”。
4. 删除“鼓励熬夜、治疗失眠、检测焦虑”等词。

## 6. Build 或版本问题

常见现象：

- Missing Compliance。
- Invalid Binary。
- Bundle ID 不一致。
- Build 号重复。

处理：

1. 按 `BUNDLE_ID_AND_VERSIONING.md` 核对 Bundle ID。
2. 每次重新上传递增 Build，例如 `1 -> 2 -> 3`。
3. Xcode iOS target、watchOS target、App Store Connect App 记录保持一致。
4. 如果 Apple 要求出口合规，根据 App Store Connect 问题如实填写；当前本地记录工具通常不涉及自定义加密。

## 提交前复核

- `npm run check`
- `npm run preflight:appstore`
- `npm run check:review-copy`
- `npm run check:pages`
- App Review Notes 使用 `APP_REVIEW_NOTES_DRAFT.md`
- 拒审回复前先保存完整拒审文本
