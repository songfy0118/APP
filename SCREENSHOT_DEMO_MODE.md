# 截图准备模式

## 目的

为 App Store 截图准备稳定示例数据。  
这个模式只用于截图采集，不应被当作真实用户数据或产品统计。

## 使用方式

本地预览启动后，打开：

```text
http://127.0.0.1:5173/index.html?demo=screenshot
```

可直接跳到指定页面：

```text
http://127.0.0.1:5173/index.html?demo=screenshot&tab=tonight
http://127.0.0.1:5173/index.html?demo=screenshot&tab=records
http://127.0.0.1:5173/index.html?demo=screenshot&tab=report
http://127.0.0.1:5173/index.html?demo=screenshot&tab=mine
```

## 会生成什么

- 6 条夜晚记录。
- 3 条 Apple Watch 腕上缓冲记录。
- 报告页有周报、热力图、条形图、雷达图。
- 我的页有 Watch 本周触发、常见状态、最近记录。
- 今晚页会预填一句适合截图的记录。

## 注意

- 这个模式会覆盖浏览器本地的演示记录。
- 正式用户不会看到这个入口，除非手动加 URL 参数。
- App Store 截图仍应来自真实 App、模拟器或真机；这个模式只是让截图时页面有稳定内容。

