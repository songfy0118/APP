from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


def make_icon(size):
    img = Image.new("RGBA", (size, size), (9, 13, 24, 255))
    draw = ImageDraw.Draw(img)
    cx = cy = size // 2

    moon_r = int(size * 0.36)
    draw.ellipse((cx - moon_r, cy - moon_r, cx + moon_r, cy + moon_r), fill=(244, 202, 103, 255))

    cut_r = int(size * 0.32)
    cut_x = cx + int(size * 0.12)
    cut_y = cy - int(size * 0.10)
    draw.ellipse((cut_x - cut_r, cut_y - cut_r, cut_x + cut_r, cut_y + cut_r), fill=(9, 13, 24, 255))

    eye_r = max(4, int(size * 0.025))
    for eye_x, eye_y in [(cx - int(size * 0.12), cy - int(size * 0.08)), (cx, cy - int(size * 0.04))]:
        draw.ellipse((eye_x - eye_r, eye_y - eye_r, eye_x + eye_r, eye_y + eye_r), fill=(238, 243, 255, 255))

    return img


if __name__ == "__main__":
    ASSETS.mkdir(exist_ok=True)
    for icon_size in (192, 512):
        make_icon(icon_size).save(ASSETS / f"app-icon-{icon_size}.png")
