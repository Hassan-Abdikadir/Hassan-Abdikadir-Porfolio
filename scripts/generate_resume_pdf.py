import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def create_resume():
    out_dir_1 = r"d:\MyPortFolio\client\public"
    out_dir_2 = r"d:\MyPortFolio\client\dist"
    os.makedirs(out_dir_1, exist_ok=True)
    os.makedirs(out_dir_2, exist_ok=True)

    file_path_1 = os.path.join(out_dir_1, "Hassan_Abdikadir_Resume.pdf")
    file_path_2 = os.path.join(out_dir_2, "Hassan_Abdikadir_Resume.pdf")

    doc = SimpleDocTemplate(
        file_path_1,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Colors
    primary_color = colors.HexColor("#1E3A8A")  # Deep Navy Blue
    accent_color = colors.HexColor("#0284C7")   # Vibrant Cyan Blue
    dark_neutral = colors.HexColor("#1F2937")   # Dark Charcoal
    light_neutral = colors.HexColor("#4B5563")  # Slate Gray

    # Custom Paragraph Styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        alignment=TA_CENTER
    )

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=accent_color,
        alignment=TA_CENTER
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=light_neutral,
        alignment=TA_CENTER
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4
    )

    bold_text = ParagraphStyle(
        'BoldText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=dark_neutral
    )

    body_text = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=dark_neutral
    )

    bullet_text = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=dark_neutral,
        leftIndent=12
    )

    story = []

    # Header
    story.append(Paragraph("HASSAN ABDIKADIR", name_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("SOFTWARE ENGINEER • FULLSTACK MERN ARCHITECT • DATA ANALYST", title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Hargeisa, Somaliland | +252 63 6364115 | hasanabdikadir15@gmail.com | Portfolio: hassanabdikadir.dev | GitHub: github.com/HassanAbdikadir", contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=accent_color, spaceBefore=0, spaceAfter=8))

    # Executive Summary
    story.append(Paragraph("EXECUTIVE SUMMARY", section_heading))
    summary_txt = (
        "High-impact Software Engineer and Data Analyst with 3+ years of experience designing, building, and deploying "
        "production-grade FullStack MERN web platforms, microservices architectures, low-latency Socket.io real-time engines, "
        "and data analytics telemetry dashboards. Dedicated to clean code, robust backend security, and sleek user interfaces."
    )
    story.append(Paragraph(summary_txt, body_text))
    story.append(Spacer(1, 8))

    # Education
    story.append(Paragraph("EDUCATION", section_heading))
    edu_header = "<b>Amoud University — Faculty of Computing & IT</b>"
    story.append(Paragraph(f"{edu_header} <font color='#6B7280' size=9>(2020 — 2024)</font>", bold_text))
    story.append(Paragraph("Bachelor of Science (B.Sc.) in Computer Science & Software Engineering — <i>Graduated with Distinction</i>", body_text))
    story.append(Paragraph("• <b>Relevant Coursework:</b> Software Engineering Principles, Data Structures & Algorithms, Database Management Systems (SQL & NoSQL), Web Systems Architecture, Data Science & Telemetry.", bullet_text))
    story.append(Spacer(1, 8))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    skills_data = [
        [Paragraph("<b>Frontend:</b>", body_text), Paragraph("React.js, Next.js, Redux Toolkit, JavaScript (ES6+), HTML5, CSS3, TailwindCSS, Glassmorphism UI", body_text)],
        [Paragraph("<b>Backend & API:</b>", body_text), Paragraph("Node.js, Express.js, RESTful Architecture, JWT Authentication, Security Suite (Helmet, Rate Limiting)", body_text)],
        [Paragraph("<b>Databases & Realtime:</b>", body_text), Paragraph("MongoDB, Mongoose, SQL / PostgreSQL, Socket.io WebSocket, WebRTC, Redis Caching", body_text)],
        [Paragraph("<b>Data & Intelligence:</b>", body_text), Paragraph("Python, Pandas, NumPy, Chart.js, Data Visualization, OpenAI GPT-4 Integration", body_text)],
        [Paragraph("<b>DevOps & Tools:</b>", body_text), Paragraph("Git, GitHub, Docker, Linux Ops, Postman API Testing, CI/CD, Cloud Deployment (Vercel/Render)", body_text)]
    ]
    t = Table(skills_data, colWidths=[110, 430])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t)
    story.append(Spacer(1, 8))

    # Key Projects & Professional Experience
    story.append(Paragraph("PROJECTS & PROFESSIONAL EXPERIENCE", section_heading))

    # Project 1
    story.append(Paragraph("<b>FullStack Academy Digital Education Platform</b> | <i>Lead Architect & FullStack Developer</i> <font color='#6B7280' size=8.5>(2024 — Present)</font>", bold_text))
    story.append(Paragraph("• Built an enterprise-grade digital learning portal with MERN Stack featuring multi-role authentication (Student, Instructor, Admin).", bullet_text))
    story.append(Paragraph("• Engineered AI Technical Mock Interviewer integrated with OpenAI GPT-4 for automated student evaluation and real-time feedback.", bullet_text))
    story.append(Paragraph("• Implemented sub-30ms Socket.io multi-room chat communication and Redis pub/sub adapter for high scalability.", bullet_text))
    story.append(Spacer(1, 6))

    # Project 2
    story.append(Paragraph("<b>Data Analytics & Predictive Intelligence Dashboard</b> | <i>Data Analyst & Solutions Engineer</i> <font color='#6B7280' size=8.5>(2023 — 2024)</font>", bold_text))
    story.append(Paragraph("• Designed interactive data telemetry dashboards rendering complex data streams with Chart.js and React.", bullet_text))
    story.append(Paragraph("• Automated ETL pipelines in Python (Pandas/NumPy) with MongoDB aggregation pipelines achieving 97.4% model accuracy.", bullet_text))
    story.append(Paragraph("• Delivered benchmark query throughput handling 2,400+ requests per second with custom downsampling filters.", bullet_text))
    story.append(Spacer(1, 6))

    # Project 3
    story.append(Paragraph("<b>E-Commerce Enterprise System & Real-Time Messaging Engine</b> | <i>FullStack Developer</i> <font color='#6B7280' size=8.5>(2022 — 2023)</font>", bold_text))
    story.append(Paragraph("• Developed full-featured MERN store with Stripe payment gateway, MongoDB ACID transaction handling, and automated PDF invoice generation.", bullet_text))
    story.append(Paragraph("• Built scalable messaging backend with end-to-end payload validation, token authorization, and network failure re-syncing.", bullet_text))
    story.append(Spacer(1, 8))

    # Certifications & Languages
    story.append(Paragraph("CERTIFICATIONS & LANGUAGES", section_heading))
    story.append(Paragraph("• <b>Certifications:</b> FullStack MERN Architect Master (2024) | Professional Data Analytics (2023) | Node.js Microservices Engineering (2023)", body_text))
    story.append(Paragraph("• <b>Languages:</b> English (Fluent / Professional), Somali (Native)", body_text))

    doc.build(story)

    # Copy to dist as well
    with open(file_path_1, 'rb') as f_src:
        content = f_src.read()
    with open(file_path_2, 'wb') as f_dst:
        f_dst.write(content)

    print(f"Resume generated successfully at:\n{file_path_1}\n{file_path_2}")

if __name__ == '__main__':
    create_resume()
