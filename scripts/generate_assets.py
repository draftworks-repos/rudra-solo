import os
import subprocess

TEMP_DIR = "/public/temp"
REELS_DIR = "/public/temp/reels"

os.makedirs(REELS_DIR, exist_ok=True)

def make_media(path, width, height, color="0x1A1A1D"):
    cmd = [
        "ffmpeg", "-y", "-f", "lavfi",
        "-i", f"color=c={color}:s={width}x{height}",
        "-vframes", "1",
        path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def make_video(path, poster_path):
    cmd = [
        "ffmpeg", "-y", "-loop", "1", "-i", poster_path,
        "-c:v", "libx264", "-t", "2", "-pix_fmt", "yuv420p",
        "-vf", "scale=720:1280",
        path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

print("1. Generating Hero & Artist photos...")
make_media(f"{TEMP_DIR}/hero.jpg", 800, 1000, "0x201F24")
make_media(f"{TEMP_DIR}/artist-01.jpg", 800, 1000, "0x292830")
make_media(f"{TEMP_DIR}/artist-02.jpg", 800, 800, "0x1B1A20")

print("2. Generating 12 Flash designs...")
flash_colors = [
    "0x1E1E22", "0x25252A", "0x202026", "0x2A2A32",
    "0x1C1C20", "0x232328", "0x1F1F24", "0x27272E",
    "0x1E1E23", "0x26262C", "0x212127", "0x282830"
]
for i, col in enumerate(flash_colors, start=1):
    num_str = f"{i:02d}"
    make_media(f"{TEMP_DIR}/flash-{num_str}.png", 800, 800, col)

print("3. Generating 12 Gallery pieces...")
gallery_specs = [
    (750, 1000, "0x202028"),
    (800, 1000, "0x1A1A22"),
    (720, 1280, "0x141418"),
    (800, 800, "0x282834"),
    (1000, 750, "0x22222B"),
    (800, 1000, "0x1E1E26"),
    (750, 1000, "0x171720"),
    (800, 800, "0x131316"),
    (800, 1000, "0x252530"),
    (800, 800, "0x2B2A35"),
    (750, 1000, "0x1D1D25"),
    (1000, 750, "0x16161C"),
]
for i, (w, h, col) in enumerate(gallery_specs, start=1):
    num_str = f"{i:02d}"
    make_media(f"{TEMP_DIR}/gallery-{num_str}.jpg", w, h, col)

print("4. Generating 3 Healed pairs...")
make_media(f"{TEMP_DIR}/healed-01-fresh.jpg", 800, 1000, "0x331C1C")
make_media(f"{TEMP_DIR}/healed-01-healed.jpg", 800, 1000, "0x1C2B1C")
make_media(f"{TEMP_DIR}/healed-02-fresh.jpg", 800, 1000, "0x331C1C")
make_media(f"{TEMP_DIR}/healed-02-healed.jpg", 800, 1000, "0x1C2B1C")
make_media(f"{TEMP_DIR}/healed-03-fresh.jpg", 800, 1000, "0x331C1C")
make_media(f"{TEMP_DIR}/healed-03-healed.jpg", 800, 1000, "0x1C2B1C")

print("5. Generating 5 Style covers...")
style_colors = {
    "fineline": "0x22222D",
    "blackgrey": "0x1A1A23",
    "blackwork": "0x121216",
    "realism": "0x282733",
    "traditional": "0x24232E",
}
for name, col in style_colors.items():
    make_media(f"{TEMP_DIR}/style-{name}.jpg", 1000, 600, col)

print("6. Generating 6 Reel posters & videos...")
for i in range(1, 7):
    num_str = f"{i:02d}"
    poster = f"{REELS_DIR}/reel-{num_str}.jpg"
    video = f"{REELS_DIR}/reel-{num_str}.mp4"
    make_media(poster, 720, 1280, f"0x1{i}1{i}2{i}")
    make_video(video, poster)

print("7. Generating 9 Instagram feed posts...")
for i in range(1, 10):
    num_str = f"{i:02d}"
    make_media(f"{TEMP_DIR}/insta-{num_str}.jpg", 800, 800, f"0x2{i}2{i}3{i}")

print("COMPLETED: All manifest media files generated!")
