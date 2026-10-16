import os
import math
from PIL import Image, ImageDraw, ImageFont

def draw_fullstack_frame(frame_num, total_frames, width=800, height=450):
    img = Image.new('RGB', (width, height), color=(10, 15, 28))
    draw = ImageDraw.Draw(img)

    # Background gradient or grid
    for y in range(0, height, 30):
        draw.line([(0, y), (width, y)], fill=(20, 30, 50), width=1)
    for x in range(0, width, 30):
        draw.line([(x, 0), (x, height)], fill=(20, 30, 50), width=1)

    # Top Navbar Mock
    draw.rectangle([(0, 0), (width, 40)], fill=(15, 23, 42))
    draw.ellipse([(15, 15), (25, 25)], fill=(255, 95, 87))
    draw.ellipse([(35, 15), (45, 25)], fill=(254, 188, 46))
    draw.ellipse([(55, 15), (65, 25)], fill=(40, 200, 64))
    
    # Header Title
    draw.text((90, 12), "FULLSTACK ACADEMY — LIVE AI MOCK INTERVIEW & SOCKET.IO CHAT", fill=(0, 240, 255))
    
    # Pulse dot
    pulse = int((math.sin(frame_num / 3.0) + 1) * 127)
    draw.ellipse([(730, 15), (742, 27)], fill=(0, 255, 136, pulse))
    draw.text((750, 12), "LIVE", fill=(0, 255, 136))

    # Left Panel: Code Editor Mock
    draw.rectangle([(20, 60), (480, 410)], fill=(18, 24, 38), outline=(59, 130, 246), width=1)
    draw.text((35, 72), "// Real-Time AI Code Evaluator (GPT-4 SSE Stream)", fill=(148, 163, 184))
    
    code_lines = [
        "const socket = io('https://fullstack-academy.dev');",
        "socket.emit('code_submission', { studentId: 'ST-9021', language: 'javascript' });",
        "const evaluation = await gpt4Engine.analyzeComplexity(code);",
        "console.log('AI Rating:', evaluation.score); // 98/100 EXCELLENT",
        "return { status: 'OPTIMIZED', executionMs: 14 };"
    ]

    visible_lines = min(len(code_lines), 1 + frame_num // 3)
    y_pos = 100
    for idx in range(visible_lines):
        line = code_lines[idx]
        # Typing animation effect on current line
        if idx == visible_lines - 1:
            char_count = max(1, min(len(line), (frame_num % 3 + 1) * (len(line) // 3 + 1)))
            line = line[:char_count] + "█"
        draw.text((35, y_pos), line, fill=(243, 244, 246) if idx < visible_lines - 1 else (236, 72, 153))
        y_pos += 26

    # Right Panel: Socket.io Chat Stream
    draw.rectangle([(500, 60), (780, 410)], fill=(15, 23, 42), outline=(139, 92, 246), width=1)
    draw.text((515, 72), "💬 SOCKET.IO LIVE MULTI-ROOM", fill=(192, 132, 252))
    draw.line([(500, 95), (780, 95)], fill=(139, 92, 246), width=1)

    chat_messages = [
        ("Instructor AI", "Explain React useEffect cleanup phase.", (59, 130, 246)),
        ("Hassan (Student)", "It returns a teardown function to clear timers/subscriptions.", (16, 185, 129)),
        ("Instructor AI", "Perfect! Score: 100%. Next: Socket.io reconnection strategy.", (59, 130, 246)),
        ("Hassan (Student)", "Exponential backoff retry buffer via Redis Pub/Sub.", (16, 185, 129))
    ]

    msg_count = min(len(chat_messages), 1 + frame_num // 4)
    cy = 110
    for idx in range(msg_count):
        sender, msg, color = chat_messages[idx]
        draw.text((515, cy), f"{sender}:", fill=color)
        cy += 18
        # Wrap simple msg
        draw.text((515, cy), f"  {msg[:35]}", fill=(226, 232, 240))
        if len(msg) > 35:
            cy += 16
            draw.text((515, cy), f"  {msg[35:]}", fill=(226, 232, 240))
        cy += 24

    return img

def draw_analytics_frame(frame_num, total_frames, width=800, height=450):
    img = Image.new('RGB', (width, height), color=(6, 15, 25))
    draw = ImageDraw.Draw(img)

    # Grid background
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=(15, 30, 50), width=1)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=(15, 30, 50), width=1)

    # Header
    draw.rectangle([(0, 0), (width, 40)], fill=(10, 22, 40))
    draw.text((20, 12), "DATA ANALYTICS TELEMETRY — PYTHON PANDAS & CHART.JS ENGINE", fill=(16, 185, 129))
    draw.text((650, 12), f"ACCURACY: 97.4%", fill=(6, 182, 212))

    # Metric Cards Top
    metrics = [
        ("QUERY THROUGHPUT", "2,480 req/sec", (16, 185, 129)),
        ("MODEL ACCURACY", "97.4%", (6, 182, 212)),
        ("AVG LATENCY", "14.2 ms", (139, 92, 246)),
    ]

    cx = 20
    for title, val, color in metrics:
        draw.rectangle([(cx, 55), (cx + 240, 115)], fill=(15, 28, 48), outline=color, width=1)
        draw.text((cx + 12, 65), title, fill=(148, 163, 184))
        draw.text((cx + 12, 85), val, fill=color)
        cx += 260

    # Chart Canvas Box
    draw.rectangle([(20, 130), (780, 410)], fill=(10, 20, 36), outline=(6, 182, 212), width=1)
    draw.text((35, 142), "📈 REAL-TIME PREDICTIVE DATA TELEMETRY (CANVAS RENDER)", fill=(243, 244, 246))

    # Draw Line Chart with animated wave
    points = []
    num_points = 20
    spacing = 730 / (num_points - 1)
    for i in range(num_points):
        x = 35 + i * spacing
        # Sine wave with dynamic movement
        y = 280 + math.sin((i * 0.5) + (frame_num * 0.4)) * 60 - (i * 3)
        points.append((x, y))

    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=(16, 185, 129), width=3)
        draw.ellipse([(points[i][0]-3, points[i][1]-3), (points[i][0]+3, points[i][1]+3)], fill=(6, 182, 212))

    # Anomaly marker moving
    anomaly_idx = int((frame_num * 1.5) % num_points)
    ax, ay = points[anomaly_idx]
    draw.ellipse([(ax-8, ay-8), (ax+8, ay+8)], outline=(245, 158, 11), width=2)
    draw.text((ax - 20, ay - 24), "ANOMALY 99.8%", fill=(245, 158, 11))

    return img

def main():
    pub_dir = r"d:\MyPortFolio\client\public\projects"
    dist_dir = r"d:\MyPortFolio\client\dist\projects"
    os.makedirs(pub_dir, exist_ok=True)
    os.makedirs(dist_dir, exist_ok=True)

    # 1. FullStack Academy GIF
    frames_fullstack = []
    total_f = 16
    for f in range(total_f):
        frames_fullstack.append(draw_fullstack_frame(f, total_f))

    out_fs_pub = os.path.join(pub_dir, "fullstack-academy-preview.gif")
    out_fs_dist = os.path.join(dist_dir, "fullstack-academy-preview.gif")
    frames_fullstack[0].save(out_fs_pub, save_all=True, append_images=frames_fullstack[1:], duration=250, loop=0)
    frames_fullstack[0].save(out_fs_dist, save_all=True, append_images=frames_fullstack[1:], duration=250, loop=0)

    # 2. Data Analytics GIF
    frames_analytics = []
    for f in range(total_f):
        frames_analytics.append(draw_analytics_frame(f, total_f))

    out_da_pub = os.path.join(pub_dir, "data-analytics-dashboard-preview.gif")
    out_da_dist = os.path.join(dist_dir, "data-analytics-dashboard-preview.gif")
    frames_analytics[0].save(out_da_pub, save_all=True, append_images=frames_analytics[1:], duration=250, loop=0)
    frames_analytics[0].save(out_da_dist, save_all=True, append_images=frames_analytics[1:], duration=250, loop=0)

    print("Generated dynamic GIF previews for flagship projects successfully!")

if __name__ == '__main__':
    main()
