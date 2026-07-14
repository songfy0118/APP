from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "pdf"
PDF_PATH = OUT_DIR / "jinwan-bushui-product-brief.pdf"
FONT_REGULAR = r"C:\Windows\Fonts\simhei.ttf"
FONT_SERIF = r"C:\Windows\Fonts\simsun.ttc"


W, H = A4
MARGIN = 22 * mm
INK = colors.HexColor("#EAF0FF")
MUTED = colors.HexColor("#9BA6C8")
PANEL = colors.HexColor("#151A2E")
PANEL_2 = colors.HexColor("#202744")
ACCENT = colors.HexColor("#F3C969")
BLUE = colors.HexColor("#6B8CFF")
PINK = colors.HexColor("#FF89B6")
GREEN = colors.HexColor("#62D6A4")
BG = colors.HexColor("#090D1A")


def setup_fonts():
    pdfmetrics.registerFont(TTFont("CN-Bold", FONT_REGULAR))
    pdfmetrics.registerFont(TTFont("CN", FONT_SERIF))


def wrap_text(text, max_chars):
    lines = []
    for paragraph in text.split("\n"):
        current = ""
        for char in paragraph:
            if len(current) >= max_chars:
                lines.append(current)
                current = char
            else:
                current += char
        lines.append(current)
    return lines


def draw_bg(c, page_no, title=None):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#111733"))
    c.circle(W - 25 * mm, H - 22 * mm, 52 * mm, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#0E2740"))
    c.circle(15 * mm, 30 * mm, 42 * mm, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("CN", 8)
    c.drawRightString(W - MARGIN, 13 * mm, f"今晚不睡 Product Brief / {page_no}")
    if title:
        c.setFillColor(ACCENT)
        c.setFont("CN-Bold", 13)
        c.drawString(MARGIN, H - 24 * mm, title)


def draw_card(c, x, y, w, h, title, body, color=INK):
    c.setFillColor(PANEL)
    c.roundRect(x, y, w, h, 8, fill=1, stroke=0)
    c.setFillColor(color)
    c.setFont("CN-Bold", 13)
    c.drawString(x + 10 * mm, y + h - 15 * mm, title)
    c.setFillColor(MUTED)
    c.setFont("CN", 10)
    ty = y + h - 27 * mm
    max_chars = max(14, int((w / mm) / 4.4))
    for line in wrap_text(body, max_chars):
        c.drawString(x + 10 * mm, ty, line)
        ty -= 6.2 * mm


def draw_bullets(c, x, y, items, width_chars=34, gap=9 * mm):
    c.setFont("CN", 11)
    ty = y
    for label, body in items:
        c.setFillColor(ACCENT)
        c.circle(x + 2 * mm, ty + 1.5 * mm, 1.6 * mm, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("CN-Bold", 11)
        c.drawString(x + 7 * mm, ty, label)
        c.setFillColor(MUTED)
        c.setFont("CN", 10)
        line_y = ty - 6 * mm
        for line in wrap_text(body, width_chars):
            c.drawString(x + 7 * mm, line_y, line)
            line_y -= 5.7 * mm
        ty = line_y - gap + 5 * mm
    return ty


def draw_moon(c, x, y, r):
    c.setFillColor(ACCENT)
    c.circle(x, y, r, fill=1, stroke=0)
    c.setFillColor(BG)
    c.circle(x + r * 0.38, y + r * 0.18, r * 0.82, fill=1, stroke=0)
    c.setFillColor(INK)
    c.circle(x - r * 0.28, y + r * 0.1, 1.1 * mm, fill=1, stroke=0)
    c.circle(x - r * 0.03, y + r * 0.02, 1.1 * mm, fill=1, stroke=0)
    c.setStrokeColor(INK)
    c.setLineWidth(1.2)
    c.arc(x - r * 0.28, y - r * 0.35, x + r * 0.2, y + r * 0.08, 200, 120)


def page_cover(c):
    draw_bg(c, 1)
    c.setFillColor(ACCENT)
    c.setFont("CN-Bold", 18)
    c.drawString(MARGIN, H - 47 * mm, "产品定位简报")
    c.setFillColor(INK)
    c.setFont("CN-Bold", 43)
    c.drawString(MARGIN, H - 72 * mm, "今晚不睡")
    c.setFillColor(MUTED)
    c.setFont("CN", 15)
    c.drawString(MARGIN, H - 84 * mm, "记录你没睡的夜晚，也陪你把这一晚过完。")
    draw_moon(c, W - 55 * mm, H - 80 * mm, 26 * mm)
    draw_card(
        c,
        MARGIN,
        77 * mm,
        W - 2 * MARGIN,
        58 * mm,
        "一句话定位",
        "一个面向夜猫子的深夜记录与陪伴产品。它不强调健康说教，而是记录熬夜时间、情绪原因和夜晚轨迹，并用轻陪伴角色生成周报、月报、年报。",
        ACCENT,
    )
    draw_card(
        c,
        MARGIN,
        38 * mm,
        (W - 2 * MARGIN - 8 * mm) / 2,
        28 * mm,
        "差异点",
        "Apple 健康告诉你睡了多久；今晚不睡告诉你为什么没睡。",
        GREEN,
    )
    draw_card(
        c,
        MARGIN + (W - 2 * MARGIN + 8 * mm) / 2,
        38 * mm,
        (W - 2 * MARGIN - 8 * mm) / 2,
        28 * mm,
        "第一形态",
        "手机 Web/PWA 先验证，后续再做原生 App 和 PC 桌宠。",
        BLUE,
    )


def page_users(c):
    draw_bg(c, 2, "01 用户与场景")
    c.setFillColor(INK)
    c.setFont("CN-Bold", 26)
    c.drawString(MARGIN, H - 45 * mm, "谁会在深夜打开它？")
    items = [
        ("夜猫子用户", "不是每天失眠，但经常在 0 点后仍清醒，想记录自己为什么还没睡。"),
        ("焦虑/拖延人群", "脑子停不下来，舍不得今天结束，想要一个不催促、不批判的地方。"),
        ("年轻打工人/学生", "白天被安排，深夜才感觉时间属于自己，愿意看周报、月报和人格标签。"),
        ("轻社交用户", "不一定想发朋友圈，但想知道朋友里谁也还醒着。"),
    ]
    draw_bullets(c, MARGIN, H - 68 * mm, items, 37)
    draw_card(
        c,
        MARGIN,
        28 * mm,
        W - 2 * MARGIN,
        36 * mm,
        "产品语气",
        "不劝你早睡，不鼓励你硬熬。它像一盏还亮着的小夜灯：接住、记录、轻轻提醒，必要时陪你退出今晚。",
        PINK,
    )


def page_features(c):
    draw_bg(c, 3, "02 MVP 功能")
    c.setFillColor(INK)
    c.setFont("CN-Bold", 26)
    c.drawString(MARGIN, H - 45 * mm, "第一版只做 6 件事")
    cards = [
        ("今晚记录", "自动记录打开时间、未睡时长；用户点“准备睡了”结束本晚。", ACCENT),
        ("写一句", "记录为什么还没睡、现在的情绪、脑子里最吵的事。", BLUE),
        ("小月亮回应", "从语言库给一句陪伴、吐槽或记录引导，AI 后续再接。", GREEN),
        ("夜晚档案", "按日期保存每晚时间、情绪、文字、陪伴回复和称号。", PINK),
        ("同伴房间", "可邀请朋友进入深夜房间，看谁还醒着，目标是一起下线。", ACCENT),
        ("分享卡", "生成周报/月报卡片，适合截图分享。", BLUE),
    ]
    x1 = MARGIN
    x2 = MARGIN + (W - 2 * MARGIN + 8 * mm) / 2
    y = H - 92 * mm
    cw = (W - 2 * MARGIN - 8 * mm) / 2
    for i, (title, body, color) in enumerate(cards):
        x = x1 if i % 2 == 0 else x2
        if i and i % 2 == 0:
            y -= 44 * mm
        draw_card(c, x, y, cw, 34 * mm, title, body, color)


def page_reports(c):
    draw_bg(c, 4, "03 数据报告")
    c.setFillColor(INK)
    c.setFont("CN-Bold", 26)
    c.drawString(MARGIN, H - 45 * mm, "让用户看见自己的夜晚")
    c.setFillColor(MUTED)
    c.setFont("CN", 11)
    c.drawString(MARGIN, H - 56 * mm, "报告不是体检单，而是“深夜人格档案”。")

    grid_x = MARGIN
    grid_y = H - 105 * mm
    c.setFillColor(PANEL)
    c.roundRect(grid_x, grid_y, 74 * mm, 38 * mm, 8, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("CN-Bold", 11)
    c.drawString(grid_x + 8 * mm, grid_y + 29 * mm, "夜晚热力网格")
    colors_grid = [colors.HexColor("#222A46"), colors.HexColor("#3A4772"), BLUE, PINK]
    for row in range(4):
        for col in range(12):
            shade = colors_grid[(row + col * 2) % 4]
            c.setFillColor(shade)
            c.roundRect(grid_x + 8 * mm + col * 4.7 * mm, grid_y + 6 * mm + row * 4.7 * mm, 3.5 * mm, 3.5 * mm, 1, fill=1, stroke=0)

    bx = MARGIN + 84 * mm
    by = grid_y
    c.setFillColor(PANEL)
    c.roundRect(bx, by, 74 * mm, 38 * mm, 8, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("CN-Bold", 11)
    c.drawString(bx + 8 * mm, by + 29 * mm, "本周熬夜条形图")
    bars = [19, 27, 12, 31, 22, 35, 16]
    for i, bar in enumerate(bars):
        c.setFillColor([ACCENT, BLUE, GREEN, PINK][i % 4])
        c.roundRect(bx + 9 * mm + i * 8 * mm, by + 7 * mm, 5 * mm, bar * 0.55 * mm, 2, fill=1, stroke=0)

    items = [
        ("周报", "熬夜次数、最晚一晚、平均结束时间、常见情绪、本周称号。"),
        ("月报", "夜晚热力网格、情绪分布、关键词、深夜人格、月度旁白。"),
        ("年报", "年度最晚时间、累计清醒时长、最常熬夜星期、四季变化、年度称号。"),
        ("人格分析", "用轻标签表达，不做医学诊断：凌晨常驻居民、明天抵抗者、脑内开会型。"),
    ]
    draw_bullets(c, MARGIN, H - 130 * mm, items, 38, 7 * mm)


def page_plan(c):
    draw_bg(c, 5, "04 产品路线")
    c.setFillColor(INK)
    c.setFont("CN-Bold", 26)
    c.drawString(MARGIN, H - 45 * mm, "先验证场景，再扩平台")
    phases = [
        ("阶段 1：手机 PWA 原型", "今晚记录、写一句、小月亮回应、夜晚档案、简版周报。"),
        ("阶段 2：移动 App", "系统通知、隐私锁、Apple 健康/Android Health Connect、桌面小组件。"),
        ("阶段 3：社交与桌宠", "深夜同伴房间、PC 悬浮小月亮、跨端同步、月报/年报分享。"),
    ]
    y = H - 78 * mm
    for i, (title, body) in enumerate(phases, start=1):
        c.setFillColor(PANEL_2 if i == 1 else PANEL)
        c.roundRect(MARGIN, y - 18 * mm, W - 2 * MARGIN, 30 * mm, 8, fill=1, stroke=0)
        c.setFillColor(ACCENT if i == 1 else INK)
        c.setFont("CN-Bold", 13)
        c.drawString(MARGIN + 10 * mm, y, title)
        c.setFillColor(MUTED)
        c.setFont("CN", 10)
        c.drawString(MARGIN + 10 * mm, y - 8 * mm, body)
        y -= 40 * mm
    draw_card(
        c,
        MARGIN,
        35 * mm,
        W - 2 * MARGIN,
        44 * mm,
        "当前建议",
        "第一版不要先做重 AI，也不要先做复杂桌宠。先把“深夜记录 + 小月亮语言库 + 周报图表”做扎实。等用户真的愿意每天夜里打开，再升级 AI 对话、朋友房间和原生 App。",
        GREEN,
    )


def build_pdf():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    setup_fonts()
    c = canvas.Canvas(str(PDF_PATH), pagesize=A4)
    for page in [page_cover, page_users, page_features, page_reports, page_plan]:
        page(c)
        c.showPage()
    c.save()
    return PDF_PATH


if __name__ == "__main__":
    print(build_pdf())
