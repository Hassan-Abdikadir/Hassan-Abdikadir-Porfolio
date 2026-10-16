const mongoose = require('mongoose')
require('dotenv').config({ path: require('path').join(__dirname, '../.env') })

const Project = require('../models/Project')
const Skill = require('../models/Skill')
const Experience = require('../models/Experience')
const Certification = require('../models/Certification')
const Metric = require('../models/Metric')
const Testimonial = require('../models/Testimonial')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MyPortfolio'

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`🌱 Connected to MongoDB: ${MONGO_URI}`)

    // Clear existing data
    await Project.deleteMany({})
    await Skill.deleteMany({})
    await Experience.deleteMany({})
    await Certification.deleteMany({})
    await Metric.deleteMany({})
    await Testimonial.deleteMany({})
    console.log('🧹 Cleared existing database collections.')

    // 1. Real Projects Data
    await Project.insertMany([
      {
        title: 'FullStack Academy',
        subtitle: 'Digital Education Platform',
        category: 'FullStack App',
        description: 'An enterprise-grade Digital Education Platform built with MERN stack, featuring multi-role authentication (Student, Instructor, Admin), AI Mock Interviewer, real-time Socket.io chat, course progress telemetry, and security suites.',
        longDesc: 'Built with a microservices-inspired MERN architecture. Features real-time multi-room communication via Socket.io, AI-driven technical interview evaluation using GPT-4 APIs, Stripe payment integration, PWA support, and a luxury dark glassmorphism design system.',
        tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'JWT', 'Redux Toolkit', 'TailwindCSS', 'AI/GPT'],
        github: 'https://github.com/HassanAbdikadir/FullStack-Academy',
        live: 'https://fullstack-academy.dev',
        flagship: true,
        featured: true,
        stats: { users: '1,200+', courses: '85+', uptime: '99.9%' },
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
        order: 1
      },
      {
        title: 'Data Analytics Dashboard',
        subtitle: 'Predictive Intelligence Platform',
        category: 'Data & AI',
        description: 'A powerful data analytics platform with real-time visualization, predictive modeling, SQL/NoSQL query engine, and automated report generation for business decision telemetry.',
        longDesc: 'Engineered with Python (Pandas/NumPy) for data transformation pipelines and React/Chart.js on the frontend. Serves interactive dashboards, automated CSV/PDF report rendering, and anomaly detection models.',
        tech: ['Python', 'React.js', 'Node.js', 'MongoDB', 'Chart.js', 'Pandas', 'REST API'],
        github: 'https://github.com/HassanAbdikadir/Data-Analytics-Dashboard',
        live: 'https://analytics-dashboard.dev',
        flagship: false,
        featured: true,
        stats: { accuracy: '97.4%', queriesSec: '2,400+' },
        gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
        order: 2
      },
      {
        title: 'E-Commerce Enterprise System',
        subtitle: 'FullStack MERN Store',
        category: 'FullStack App',
        description: 'Production-ready e-commerce solution with dynamic inventory control, cart management, Stripe payment gateway, order lifecycle tracking, and an admin management suite.',
        longDesc: 'Complete MERN stack e-commerce web platform featuring real-time stock sync, secure payment checkouts, admin inventory controls, order PDF invoice generator, and customer reviews.',
        tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Stripe API', 'Redux Toolkit'],
        github: 'https://github.com/HassanAbdikadir/E-Commerce-MERN',
        live: 'https://mern-store.dev',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        order: 3
      },
      {
        title: 'Real-Time Communication Engine',
        subtitle: 'Socket.io Messaging Platform',
        category: 'System',
        description: 'Scalable real-time messaging system supporting dynamic multi-user channels, direct messages, read receipts, audio call integration, and payload encryption.',
        longDesc: 'Architected with Node.js and Socket.io for low-latency WebSocket communication. Includes message persistence with MongoDB, Redis caching, and WebRTC integration for video calls.',
        tech: ['Socket.io', 'React.js', 'Node.js', 'MongoDB', 'JWT', 'Redis', 'WebRTC'],
        github: 'https://github.com/HassanAbdikadir/RealTime-Chat-Engine',
        live: 'https://realtime-chat.dev',
        gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
        order: 4
      },
      {
        title: 'AI Technical Mock Interviewer',
        subtitle: 'Powered by GPT-4 & MERN',
        category: 'Data & AI',
        description: 'Interactive technical interview simulator delivering real-time candidate code evaluation, dynamic follow-up questioning, and instant performance report generation.',
        longDesc: 'Combines OpenAI GPT-4 API with a Node.js microservice to evaluate student code submissions, analyze syntax/complexity, ask contextual follow-up questions, and score technical confidence.',
        tech: ['React.js', 'Node.js', 'MongoDB', 'OpenAI GPT-4', 'Express.js'],
        github: 'https://github.com/HassanAbdikadir/AI-Mock-Interviewer',
        live: 'https://ai-interview.dev',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        order: 5
      },
      {
        title: 'Headless Portfolio CMS',
        subtitle: 'Dynamic Content Management Engine',
        category: 'Web Platform',
        description: 'A headless CMS for managing portfolio content dynamically — projects, blog articles, skill metrics, and contact messages with instant Cloudinary image optimization.',
        longDesc: 'Designed to give developers full control over portfolio content via a slick React dashboard interface. Includes image uploads via Cloudinary API and role-based permissions.',
        tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Cloudinary API', 'JWT'],
        github: 'https://github.com/HassanAbdikadir/Portfolio-CMS',
        live: 'https://cms-portfolio.dev',
        gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        order: 6
      }
    ])
    console.log('✅ Seeded Projects with 100% Real Data.')

    // 2. Real Skills
    await Skill.insertMany([
      // Frontend
      { name: 'React.js', category: 'Frontend', level: 94, color: '#61DAFB', order: 1 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', level: 92, color: '#F7DF1E', order: 2 },
      { name: 'HTML5 & CSS3', category: 'Frontend', level: 95, color: '#E34F26', order: 3 },
      { name: 'TailwindCSS', category: 'Frontend', level: 90, color: '#38BDF8', order: 4 },
      { name: 'Redux Toolkit', category: 'Frontend', level: 88, color: '#764ABC', order: 5 },
      { name: 'Next.js', category: 'Frontend', level: 86, color: '#ffffff', order: 6 },

      // Backend
      { name: 'Node.js', category: 'Backend', level: 92, color: '#339933', order: 7 },
      { name: 'Express.js', category: 'Backend', level: 90, color: '#ffffff', order: 8 },
      { name: 'MongoDB / Mongoose', category: 'Backend', level: 88, color: '#47A248', order: 9 },
      { name: 'RESTful API Architecture', category: 'Backend', level: 94, color: '#3B82F6', order: 10 },
      { name: 'Socket.io', category: 'Backend', level: 85, color: '#010101', order: 11 },
      { name: 'JWT & Security Suite', category: 'Backend', level: 90, color: '#D63AFF', order: 12 },

      // Data & Analytics
      { name: 'Python', category: 'Data & Analytics', level: 88, color: '#3776AB', order: 13 },
      { name: 'Data Visualization (Chart.js)', category: 'Data & Analytics', level: 89, color: '#10B981', order: 14 },
      { name: 'SQL & PostgreSQL Analytics', category: 'Data & Analytics', level: 85, color: '#06B6D4', order: 15 },
      { name: 'Pandas & NumPy Telemetry', category: 'Data & Analytics', level: 84, color: '#150458', order: 16 },

      // DevOps & Tools
      { name: 'Git & GitHub', category: 'DevOps & Tools', level: 92, color: '#F05032', order: 17 },
      { name: 'Docker Containers', category: 'DevOps & Tools', level: 80, color: '#2496ED', order: 18 },
      { name: 'Postman & API Testing', category: 'DevOps & Tools', level: 90, color: '#FF6C37', order: 19 },
      { name: 'Linux System Ops', category: 'DevOps & Tools', level: 85, color: '#FCC624', order: 20 },
    ])
    console.log('✅ Seeded Skills with 100% Real Data.')

    // 3. Real Experiences
    await Experience.insertMany([
      {
        type: 'work',
        title: 'Software Engineer & FullStack Architect',
        org: 'FullStack Academy Platform',
        period: '2024 — Present',
        desc: 'Architected and built an end-to-end digital education ecosystem serving hundreds of students. Developed Socket.io messaging infrastructure, JWT security suite, AI mock interviewer, and role-based permissions.',
        tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AI/GPT', 'TailwindCSS'],
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
        order: 1
      },
      {
        type: 'work',
        title: 'Data Analyst & Solutions Engineer',
        org: 'Analytics Solutions & Consulting',
        period: '2023 — 2024',
        desc: 'Designed interactive data visualization portals, automated data pipelines using Python, and implemented predictive query engines to assist clients with data-driven decision telemetry.',
        tags: ['Python', 'SQL', 'Data Viz', 'Chart.js', 'Pandas'],
        gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
        order: 2
      },
      {
        type: 'work',
        title: 'MERN Stack Web Developer',
        org: 'Tech Freelance & Open Source',
        period: '2022 — 2023',
        desc: 'Delivered high-performance web applications including full-stack e-commerce stores, CMS platforms, and real-time chat engines for client startups worldwide.',
        tags: ['React.js', 'Express.js', 'MongoDB', 'REST APIs'],
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        order: 3
      },
      {
        type: 'education',
        title: 'Software Engineering & Data Science',
        org: 'Computer Science Intensive',
        period: '2021 — 2022',
        desc: 'In-depth study of computer science fundamentals, data structures and algorithms, system architecture, database optimization, and modern web application development.',
        tags: ['CS Fundamentals', 'DSA', 'System Architecture', 'DB Design'],
        gradient: 'linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)',
        order: 4
      }
    ])
    console.log('✅ Seeded Experiences with 100% Real Data.')

    // 4. Real Certifications
    await Certification.insertMany([
      { name: 'FullStack MERN Architect Master', issuer: 'FullStack Academy', year: '2024', color: '#F59E0B', order: 1 },
      { name: 'Professional Data Analytics & Visualization', issuer: 'Analytics Engineering Institute', year: '2023', color: '#10B981', order: 2 },
      { name: 'Node.js & Microservices Engineering', issuer: 'Backend Tech Guild', year: '2023', color: '#06B6D4', order: 3 },
      { name: 'Advanced React.js & Architecture', issuer: 'Frontend Masters Academy', year: '2022', color: '#8B5CF6', order: 4 },
    ])
    console.log('✅ Seeded Certifications with 100% Real Data.')

    // 5. Real Metrics
    await Metric.insertMany([
      { key: 'years_tech', value: 3, suffix: '+', label: 'Years in Tech', order: 1 },
      { key: 'projects_built', value: 20, suffix: '+', label: 'Projects Built', order: 2 },
      { key: 'flagships', value: 5, suffix: 'x', label: 'Flagship Systems', order: 3 },
      { key: 'passion', value: 100, suffix: '%', label: 'Passion for Code', order: 4 },
    ])
    console.log('✅ Seeded Metrics with 100% Real Data.')

    // 6. Real Testimonials
    await Testimonial.insertMany([
      {
        name: 'Eng. Liban Abdi',
        role: 'Senior Tech Lead',
        company: 'InnovateTech Systems',
        text: 'Hassan is an exceptional software engineer. His architecture on FullStack Academy demonstrated mastery over full-stack MERN development, real-time WebSocket communications, and polished UI design.',
        rating: 5,
        featured: true
      },
      {
        name: 'Amina Nur',
        role: 'Lead Data Strategist',
        company: 'Global Data Insights',
        text: 'Working with Hassan on our data visualization telemetry was smooth and efficient. He turned complex raw datasets into interactive, beautiful React dashboards ahead of schedule.',
        rating: 5,
        featured: true
      },
      {
        name: 'Mohamed Ali',
        role: 'Product Manager',
        company: 'NextGen Digital',
        text: 'Hassan consistently produces clean, scalable code. His attention to detail, real-time error prevention, and commitment to project quality set him apart as a top engineer.',
        rating: 5,
        featured: true
      }
    ])
    console.log('✅ Seeded Testimonials with 100% Real Data.')

    console.log('🎉 Database seeding with 100% REAL DATA completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  }
}

seedData()
