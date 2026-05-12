from __future__ import annotations

import json
import math
import random
import subprocess
import textwrap
import wave
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "exports" / "ai-bodycam-stories-001"
SCENES = OUT / "scenes"
AUDIO_WAV = OUT / "voiceover.wav"
MUSIC_WAV = OUT / "ambient.wav"
CAPTIONS_ASS = OUT / "captions.ass"
CONCAT_TXT = OUT / "concat.txt"
PACKAGE_MD = OUT / "production-package.md"
FINAL_MP4 = OUT / "ai-bodycam-stories-001.mp4"

WIDTH = 720
HEIGHT = 1280
FPS = 30

FONT_REGULAR = Path("C:/Windows/Fonts/arial.ttf")
FONT_BOLD = Path("C:/Windows/Fonts/arialbd.ttf")
FONT_BLACK = Path("C:/Windows/Fonts/ariblk.ttf")


VIDEO = {
    "selected_niche": "AI Bodycam Stories",
    "auto_niche_score": "91/100",
    "title": "The Bodycam Started Before He Arrived",
    "platforms": "YouTube Shorts, TikTok, Instagram Reels",
    "length": "45-60 seconds",
    "style": "Cinematic bodycam, tense narration, realistic documentary tone, strong twist ending.",
    "voiceover": (
        "At 2:13 a.m., Officer Hayes answered a silent emergency call from a house "
        "that had been vacant for six years. The bodycam shows the front door already open. "
        "No lights. No voices. Then the radio picks up a whisper: he's behind you. "
        "Hayes turns, but the hallway is empty. On the kitchen table, he finds a drawing "
        "of himself entering the house. The ink is still wet. Dispatch says the number "
        "that called him was disconnected in 2018. Then the camera glitches. One frame "
        "shows a small hand pointing at the basement. Hayes asks, is someone down there? "
        "No answer. Just three knocks from inside the wall. The last frame is the front porch. "
        "The door closes by itself. But look closely. The bodycam timestamp says 2:12 a.m. "
        "This footage started before he arrived."
    ),
    "scenes": [
        {
            "file": "scene_01_open_door.png",
            "title": "Silent call",
            "subtitle": "2:13 A.M. / VACANT HOUSE",
            "caption": "THE CALL CAME FROM AN EMPTY HOUSE",
            "prompt": "Vertical cinematic bodycam view of a quiet suburban house at night, front door open, rain, flashlight beam, realistic documentary tone, no real logos, no gore.",
            "duration": 8.0,
        },
        {
            "file": "scene_02_hallway.png",
            "title": "The whisper",
            "subtitle": "AUDIO SPIKE DETECTED",
            "caption": "THEN THE RADIO WHISPERED",
            "prompt": "Dark empty hallway from bodycam perspective, flashlight cone, subtle motion blur, tense but non-graphic, cinematic realism.",
            "duration": 8.0,
        },
        {
            "file": "scene_03_drawing.png",
            "title": "Fresh ink",
            "subtitle": "EVIDENCE TABLE / KITCHEN",
            "caption": "THE DRAWING SHOWED HIM INSIDE",
            "prompt": "Kitchen table under flashlight, childlike drawing of an officer entering a house, wet ink shine, suspense documentary style.",
            "duration": 8.0,
        },
        {
            "file": "scene_04_glitch.png",
            "title": "One frame",
            "subtitle": "FRAME CORRUPTION",
            "caption": "ONE FRAME POINTED TO THE BASEMENT",
            "prompt": "Bodycam glitch frame, basement door with a small shadowy hand shape pointing, safe stylized horror, no graphic content.",
            "duration": 8.0,
        },
        {
            "file": "scene_05_basement.png",
            "title": "Three knocks",
            "subtitle": "AUDIO: WALL IMPACTS",
            "caption": "THREE KNOCKS CAME FROM THE WALL",
            "prompt": "Basement stairwell from first person bodycam, cracked wall, flashlight glow, analog video noise, tense atmosphere.",
            "duration": 8.0,
        },
        {
            "file": "scene_06_timestamp.png",
            "title": "Wrong time",
            "subtitle": "TIMESTAMP: 02:12:44",
            "caption": "THE FOOTAGE STARTED BEFORE HE ARRIVED",
            "prompt": "Final bodycam frame of porch door closing, timestamp visible, mysterious twist ending, cinematic documentary tone.",
            "duration": 9.5,
        },
    ],
}


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, cwd=OUT, check=True)


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def fit_text(draw: ImageDraw.ImageDraw, text: str, font_obj: ImageFont.ImageFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        bbox = draw.textbbox((0, 0), test, font=font_obj)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_centered_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    font_obj: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    stroke: int = 0,
    stroke_fill: tuple[int, int, int] = (0, 0, 0),
) -> None:
    bbox = draw.textbbox((0, 0), text, font=font_obj, stroke_width=stroke)
    x = xy[0] - (bbox[2] - bbox[0]) // 2
    y = xy[1] - (bbox[3] - bbox[1]) // 2
    draw.text((x, y), text, font=font_obj, fill=fill, stroke_width=stroke, stroke_fill=stroke_fill)


def base_frame(seed: int) -> Image.Image:
    random.seed(seed)
    img = Image.new("RGB", (WIDTH, HEIGHT), (6, 13, 18))
    pixels = img.load()
    for y in range(HEIGHT):
        for x in range(WIDTH):
            nx = x / WIDTH
            ny = y / HEIGHT
            glow = int(38 * math.exp(-((nx - 0.48) ** 2 / 0.16 + (ny - 0.46) ** 2 / 0.28)))
            noise = random.randint(-10, 13)
            blue = int(18 + glow + noise)
            green = int(24 + glow * 0.8 + noise)
            red = int(10 + glow * 0.35 + noise)
            pixels[x, y] = (max(0, red), max(0, green), max(0, blue))
    img = img.filter(ImageFilter.GaussianBlur(radius=0.35))
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for y in range(0, HEIGHT, 6):
        draw.line((0, y, WIDTH, y), fill=(255, 255, 255, 12), width=1)
    for i in range(120):
        x = random.randint(0, WIDTH - 1)
        y = random.randint(0, HEIGHT - 1)
        alpha = random.randint(18, 60)
        draw.point((x, y), fill=(210, 240, 255, alpha))
    vignette = Image.new("L", (WIDTH, HEIGHT), 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse((-230, -80, WIDTH + 230, HEIGHT + 80), fill=205)
    vignette = vignette.filter(ImageFilter.GaussianBlur(130))
    dark = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 160))
    overlay = Image.composite(overlay, Image.alpha_composite(overlay, dark), Image.eval(vignette, lambda v: 255 - v))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def draw_bodycam_overlay(img: Image.Image, scene: dict[str, str], index: int) -> None:
    draw = ImageDraw.Draw(img, "RGBA")
    hud_font = font(FONT_BOLD, 25)
    small_font = font(FONT_REGULAR, 20)
    title_font = font(FONT_BLACK, 42)
    caption_font = font(FONT_BLACK, 39)

    draw.rounded_rectangle((24, 24, 226, 74), radius=10, fill=(210, 20, 20, 218))
    draw.text((42, 39), "REC", font=hud_font, fill=(255, 255, 255, 255))
    draw.ellipse((156, 41, 176, 61), fill=(255, 255, 255, 255))
    draw.text((196, 39), "BWC", font=small_font, fill=(255, 255, 255, 230))
    draw.text((352, 36), f"AXON-FICTIONAL / {index:02d}", font=small_font, fill=(205, 230, 240, 205))
    draw.text((34, HEIGHT - 90), "CAM 01  AUDIO: ON  GPS: REDACTED", font=small_font, fill=(205, 230, 240, 215))
    draw.text((34, HEIGHT - 58), "02:12:44  FILE RECOVERED", font=small_font, fill=(205, 230, 240, 210))

    for corner in [(32, 112), (WIDTH - 118, 112), (32, HEIGHT - 190), (WIDTH - 118, HEIGHT - 190)]:
        x, y = corner
        draw.line((x, y, x + 70, y), fill=(210, 240, 245, 135), width=4)
        draw.line((x, y, x, y + 70), fill=(210, 240, 245, 135), width=4)

    draw.rounded_rectangle((46, 834, WIDTH - 46, 1016), radius=18, fill=(0, 0, 0, 145))
    lines = fit_text(draw, scene["caption"], caption_font, WIDTH - 120)
    y = 865
    for line in lines[:3]:
        draw_centered_text(draw, (WIDTH // 2, y), line, caption_font, (255, 255, 255), 3, (0, 0, 0))
        y += 49

    draw.text((54, 116), scene["title"].upper(), font=title_font, fill=(240, 250, 255, 236))
    draw.text((56, 168), scene["subtitle"], font=small_font, fill=(95, 220, 206, 225))


def draw_scene_1(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img, "RGBA")
    draw.polygon([(145, 430), (360, 280), (575, 430)], fill=(24, 32, 38, 245))
    draw.rectangle((180, 430, 540, 760), fill=(19, 29, 34, 242))
    draw.rectangle((330, 500, 420, 760), fill=(3, 7, 10, 255))
    draw.polygon([(332, 500), (448, 530), (448, 780), (332, 760)], fill=(39, 50, 53, 245))
    draw.line((0, 770, WIDTH, 820), fill=(180, 220, 230, 55), width=4)
    draw.polygon([(80, 1030), (370, 600), (650, 1070), (520, 1180), (210, 1160)], fill=(210, 240, 235, 36))
    for x in range(85, 650, 80):
        draw.line((x, 0, x - 150, HEIGHT), fill=(125, 180, 205, 45), width=2)


def draw_scene_2(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img, "RGBA")
    draw.polygon([(85, 295), (635, 295), (545, 1120), (170, 1120)], fill=(8, 17, 21, 250))
    draw.line((360, 300, 360, 1120), fill=(150, 190, 200, 45), width=3)
    draw.rectangle((510, 540, 565, 800), fill=(20, 31, 36, 245))
    draw.ellipse((532, 650, 544, 662), fill=(145, 194, 195, 210))
    draw.polygon([(220, 940), (365, 500), (510, 940)], fill=(230, 245, 232, 24))
    whisper_font = font(FONT_BLACK, 40)
    draw.text((126, 670), '"HE IS BEHIND YOU"', font=whisper_font, fill=(150, 235, 225, 140), stroke_width=2, stroke_fill=(0, 0, 0, 190))


def draw_scene_3(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img, "RGBA")
    draw.polygon([(75, 785), (642, 705), (710, 1098), (38, 1166)], fill=(72, 58, 43, 248))
    draw.rounded_rectangle((188, 605, 536, 860), radius=12, fill=(219, 210, 179, 245))
    draw.rectangle((223, 644, 501, 826), fill=(236, 232, 205, 255))
    ink = (25, 38, 45, 230)
    draw.rectangle((312, 707, 390, 805), outline=ink, width=5)
    draw.line((352, 665, 352, 706), fill=ink, width=5)
    draw.ellipse((327, 625, 377, 675), outline=ink, width=5)
    draw.line((270, 743, 312, 733), fill=ink, width=5)
    draw.line((390, 733, 445, 750), fill=ink, width=5)
    draw.line((332, 805, 305, 847), fill=ink, width=5)
    draw.line((373, 805, 402, 847), fill=ink, width=5)
    draw.ellipse((422, 788, 438, 804), fill=(0, 0, 0, 160))
    draw.ellipse((443, 804, 459, 820), fill=(0, 0, 0, 110))
    draw.polygon([(130, 1010), (365, 616), (601, 1012)], fill=(250, 250, 225, 28))


def draw_scene_4(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img, "RGBA")
    for i in range(22):
        y = random.randint(240, 980)
        draw.rectangle((0, y, WIDTH, y + random.randint(5, 18)), fill=(random.randint(0, 70), random.randint(80, 180), random.randint(85, 190), random.randint(40, 115)))
    draw.rectangle((232, 384, 492, 878), fill=(11, 18, 21, 255), outline=(190, 224, 216, 80), width=4)
    draw.polygon([(250, 410), (455, 460), (455, 884), (250, 860)], fill=(30, 38, 39, 235))
    hand = [(408, 580), (510, 562), (535, 581), (512, 606), (414, 614), (376, 665), (350, 644)]
    draw.polygon(hand, fill=(190, 215, 205, 85))
    draw.line((245, 950, 580, 640), fill=(235, 255, 238, 42), width=70)


def draw_scene_5(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img, "RGBA")
    draw.polygon([(196, 300), (524, 300), (610, 1118), (116, 1118)], fill=(7, 14, 17, 255))
    for i in range(7):
        y = 560 + i * 78
        draw.polygon([(210 - i * 12, y), (520 + i * 12, y), (555 + i * 20, y + 42), (170 - i * 20, y + 42)], fill=(28, 35, 38, 242), outline=(120, 150, 150, 35))
    draw.rectangle((85, 330, 188, 1100), fill=(41, 47, 45, 242))
    draw.line((110, 490, 175, 570), fill=(12, 16, 16, 255), width=5)
    draw.line((136, 570, 181, 680), fill=(12, 16, 16, 255), width=4)
    knock_font = font(FONT_BLACK, 50)
    for i, y in enumerate([452, 535, 618]):
        draw.text((88, y), "KNOCK", font=knock_font, fill=(230, 245, 235, 58 + i * 28))


def draw_scene_6(img: Image.Image) -> None:
    draw = ImageDraw.Draw(img, "RGBA")
    draw.rectangle((188, 336, 532, 885), fill=(16, 22, 25, 252), outline=(165, 205, 198, 65), width=4)
    draw.polygon([(190, 336), (470, 380), (470, 902), (190, 885)], fill=(42, 47, 45, 240))
    draw.ellipse((428, 620, 446, 638), fill=(205, 232, 225, 190))
    draw.polygon([(92, 1112), (360, 628), (636, 1112)], fill=(210, 240, 228, 30))
    time_font = font(FONT_BLACK, 66)
    draw.rounded_rectangle((68, 480, 652, 618), radius=18, fill=(0, 0, 0, 174))
    draw_centered_text(draw, (WIDTH // 2, 535), "02:12 A.M.", time_font, (255, 255, 255), 3, (0, 0, 0))
    small = font(FONT_BOLD, 27)
    draw_centered_text(draw, (WIDTH // 2, 594), "BUT THE CALL WAS LOGGED AT 02:13", small, (120, 236, 220), 2, (0, 0, 0))


SCENE_DRAWERS = [draw_scene_1, draw_scene_2, draw_scene_3, draw_scene_4, draw_scene_5, draw_scene_6]


def make_images() -> None:
    SCENES.mkdir(parents=True, exist_ok=True)
    for idx, scene in enumerate(VIDEO["scenes"], start=1):
        img = base_frame(100 + idx)
        SCENE_DRAWERS[idx - 1](img)
        draw_bodycam_overlay(img, scene, idx)
        img.convert("RGB").save(SCENES / scene["file"], quality=94)


def powershell_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def make_voiceover() -> None:
    script = f"""
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice('Microsoft Zira Desktop')
$synth.Rate = 1
$synth.Volume = 100
$synth.SetOutputToWaveFile({powershell_quote(str(AUDIO_WAV))})
$synth.Speak({powershell_quote(VIDEO["voiceover"])})
$synth.Dispose()
"""
    subprocess.run(["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script], check=True)


def wav_duration(path: Path) -> float:
    with wave.open(str(path), "rb") as wav:
        return wav.getnframes() / float(wav.getframerate())


def make_ambient(duration: float) -> None:
    # Quiet synthetic bed: low sine hum plus filtered noise. Kept subtle under narration.
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=52:duration={duration:.2f}:sample_rate=44100",
            "-f",
            "lavfi",
            "-i",
            f"anoisesrc=color=brown:duration={duration:.2f}:sample_rate=44100:amplitude=0.15",
            "-filter_complex",
            "[0:a]volume=0.08[a0];[1:a]lowpass=f=900,volume=0.12[a1];[a0][a1]amix=inputs=2:duration=first,afade=t=in:st=0:d=1.2,afade=t=out:st="
            + f"{max(0, duration - 1.5):.2f}:d=1.5",
            "-c:a",
            "pcm_s16le",
            str(MUSIC_WAV.name),
        ]
    )


def fmt_ass_time(seconds: float) -> str:
    seconds = max(0, seconds)
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    cs = int(round((seconds - int(seconds)) * 100))
    if cs == 100:
        s += 1
        cs = 0
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"


def make_captions(total_duration: float) -> None:
    caption_lines = [
        "THE CALL CAME FROM AN EMPTY HOUSE",
        "THE FRONT DOOR WAS ALREADY OPEN",
        "THEN THE RADIO WHISPERED",
        "HE'S BEHIND YOU",
        "THE HALLWAY WAS EMPTY",
        "THE DRAWING SHOWED HIM INSIDE",
        "THE INK WAS STILL WET",
        "THE NUMBER WAS DISCONNECTED IN 2018",
        "ONE FRAME POINTED TO THE BASEMENT",
        "THREE KNOCKS CAME FROM THE WALL",
        "THE DOOR CLOSED BY ITSELF",
        "LOOK AT THE TIMESTAMP",
        "THE FOOTAGE STARTED BEFORE HE ARRIVED",
    ]
    weights = [len(line) for line in caption_lines]
    usable = total_duration - 1.6
    current = 0.8
    events = []
    for line, weight in zip(caption_lines, weights):
        dur = max(2.15, usable * weight / sum(weights))
        start = current
        end = min(total_duration - 0.35, current + dur)
        events.append((start, end, line))
        current = end + 0.08

    header = textwrap.dedent(
        f"""
        [Script Info]
        ScriptType: v4.00+
        PlayResX: {WIDTH}
        PlayResY: {HEIGHT}
        ScaledBorderAndShadow: yes

        [V4+ Styles]
        Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
        Style: Caption,Arial Black,42,&H00FFFFFF,&H0000FFFF,&H00000000,&H99000000,-1,0,0,0,100,100,0,0,1,4,1,2,54,54,172,1
        Style: TopHud,Arial,22,&H00D9FFF7,&H0000FFFF,&H00000000,&H66000000,-1,0,0,0,100,100,0,0,1,2,0,8,30,30,26,1

        [Events]
        Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
        """
    ).strip()
    lines = [header]
    for start, end, line in events:
        safe = line.replace(",", "\\,")
        lines.append(f"Dialogue: 0,{fmt_ass_time(start)},{fmt_ass_time(end)},Caption,,0,0,0,,{safe}")
    CAPTIONS_ASS.write_text("\n".join(lines) + "\n", encoding="utf-8")


def make_concat(audio_duration: float) -> None:
    base_total = sum(float(scene["duration"]) for scene in VIDEO["scenes"])
    scale = audio_duration / base_total
    lines = []
    for scene in VIDEO["scenes"]:
        lines.append(f"file '{(SCENES / scene['file']).as_posix()}'")
        lines.append(f"duration {float(scene['duration']) * scale:.3f}")
    lines.append(f"file '{(SCENES / VIDEO['scenes'][-1]['file']).as_posix()}'")
    CONCAT_TXT.write_text("\n".join(lines) + "\n", encoding="utf-8")


def make_package(audio_duration: float) -> None:
    scene_lines = []
    for idx, scene in enumerate(VIDEO["scenes"], start=1):
        scene_lines.append(
            f"{idx}. {scene['title']} - {scene['caption']}\n"
            f"   Prompt: {scene['prompt']}"
        )
    PACKAGE_MD.write_text(
        textwrap.dedent(
            f"""
            # Production Package - {VIDEO['title']}

            Selected Niche: {VIDEO['selected_niche']}
            Auto Niche Score: {VIDEO['auto_niche_score']}
            Recommended Platforms: {VIDEO['platforms']}
            Recommended Video Length: {VIDEO['length']}
            Final Duration: {audio_duration:.1f} seconds
            Recommended Style: {VIDEO['style']}

            ## Voiceover

            {VIDEO['voiceover']}

            ## Scenes And Visual Prompts

            {chr(10).join(scene_lines)}

            ## Exported Files

            - Final video: `{FINAL_MP4.name}`
            - Voiceover: `{AUDIO_WAV.name}`
            - Captions: `{CAPTIONS_ASS.name}`
            - Scene images: `scenes/`
            """
        ).strip()
        + "\n",
        encoding="utf-8",
    )


def make_video(audio_duration: float) -> None:
    escaped_ass = str(CAPTIONS_ASS).replace("\\", "/").replace(":", "\\:")
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(CONCAT_TXT),
            "-i",
            str(AUDIO_WAV),
            "-i",
            str(MUSIC_WAV),
            "-filter_complex",
            (
                f"[0:v]scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=increase,"
                f"crop={WIDTH}:{HEIGHT},setsar=1,"
                f"fps={FPS},format=yuv420p,"
                f"ass='{escaped_ass}'[v];"
                "[1:a]volume=1.0[a1];[2:a]volume=0.32[a2];"
                "[a1][a2]amix=inputs=2:duration=first:dropout_transition=0,"
                "acompressor=threshold=-18dB:ratio=2:attack=20:release=250[a]"
            ),
            "-map",
            "[v]",
            "-map",
            "[a]",
            "-t",
            f"{audio_duration:.2f}",
            "-r",
            str(FPS),
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-movflags",
            "+faststart",
            str(FINAL_MP4.name),
        ]
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    make_images()
    make_voiceover()
    audio_duration = wav_duration(AUDIO_WAV)
    make_ambient(audio_duration)
    make_captions(audio_duration)
    make_concat(audio_duration)
    make_package(audio_duration)
    make_video(audio_duration)
    metadata = {
        "final_mp4": str(FINAL_MP4),
        "duration_seconds": audio_duration,
        "selected_niche": VIDEO["selected_niche"],
        "auto_niche_score": VIDEO["auto_niche_score"],
        "title": VIDEO["title"],
    }
    (OUT / "metadata.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    print(json.dumps(metadata, indent=2))


if __name__ == "__main__":
    main()
