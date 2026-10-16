export const realPortfolioData = {
  developer: {
    name: 'Hassan Abdikadir',
    title: 'Software Engineer • FullStack Developer • Data Analyst',
    bio: 'Bridging the gap between scalable Software Architecture and Data-Driven Insights. Building full-stack systems that perform, scale, and impress.',
    location: 'Hargeisa, Somaliland',
    email: 'hasanabdikadir15@gmail.com',
    phone: '+252 63 6364115',
    github: 'https://github.com/HassanAbdikadir',
    linkedin: 'https://linkedin.com/in/hassanabdikadir',
    kaggle: 'https://www.kaggle.com/hassanabdikadir',
    devto: 'https://dev.to/hassan-abdikadir',
    leetcode: 'https://leetcode.com/u/hassan_abdikadir/',
    stackoverflow: 'https://stackoverflow.com/users/33181258/hassan-abdikadir',
    medium: 'https://medium.com/@hassan_abdikadir',
    discord: 'https://discord.com/users/1362003780568354957',
    facebook: 'https://www.facebook.com/hassan.abdikadir.adam',
    whatsapp: 'https://wa.me/252636364115',
    instagram: 'https://www.instagram.com/the_albakri/',
    tiktok: 'https://www.tiktok.com/@hasan_abdikadir',
    telegram: 'https://t.me/HassanAbdikadir',
    telegramChannel: 'https://t.me/PostFiles',
    twitter: 'https://x.com/HasanAbdikadir8',
    youtube: 'https://www.youtube.com/@Hassan-AlBakri',
    reddit: 'https://www.reddit.com/user/This_Package5648/',
    status: 'Available for Work',
    experienceYears: 3,
    projectsCompleted: 20,
    flagshipSystems: 5
  },

  projects: [
    {
      id: 'fullstack-academy',
      title: 'FullStack Academy',
      subtitle: 'Digital Education Platform',
      image: '/projects/fullstack-academy.png',
      gif: '/projects/fullstack-academy-preview.gif',
      category: 'FullStack App',
      description: 'An enterprise-grade Digital Education Platform built with MERN stack, featuring multi-role authentication (Student, Instructor, Admin), AI Mock Interviewer, real-time Socket.io chat, course telemetry, and security suites.',
      longDesc: 'Built from the ground up with a microservices-inspired MERN architecture. Features real-time multi-room communication via Socket.io, AI-driven technical interview evaluation using GPT-4 APIs, full payment processing integration, mobile-responsive PWA, and a luxury dark glassmorphism design system.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'JWT Auth', 'Redux Toolkit', 'TailwindCSS', 'AI/GPT-4'],
      github: 'https://github.com/HassanAbdikadir/FullStack-Academy',
      live: 'https://github.com/HassanAbdikadir/FullStack-Academy',
      flagship: true,
      featured: true,
      stats: { users: '1,200+', courses: '85+', uptime: '99.9%' },
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
      caseStudy: {
        architecture: {
          frontend: 'React 18 + Redux Toolkit (State Management) + Tailwind Glassmorphism',
          backend: 'Express REST Controllers + Socket.io Stateful Gateway',
          database: 'MongoDB Replica Set with Indexing + Redis Cache Layer',
          security: 'Helmet CSP + Express Rate Limiting + Mongo Sanitize + JWT HttpOnly Cookies'
        },
        topology: ['React 18 SPA', 'Socket.io Gateway', 'Express REST Services', 'MongoDB Cluster'],
        challenges: [
          { problem: 'High latency during real-time student chat under multi-room broadcasts.', solution: 'Implemented Redis Pub/Sub adapter to decouple WebSocket connection handling from main thread.' },
          { problem: 'Automated brute-force attacks targeting auth endpoints.', solution: 'Added express-rate-limit and IP geo-fencing middlewares with automated temporary lockouts.' }
        ],
        benchmarks: [
          { label: 'Avg API Latency', value: '< 42ms' },
          { label: 'WebSocket Frame Rate', value: '60 FPS' },
          { label: 'Lighthouse Score', value: '98 / 100' }
        ]
      }
    },
    {
      id: 'data-analytics-dashboard',
      title: 'Data Analytics Dashboard',
      subtitle: 'Predictive Intelligence Platform',
      image: '/projects/data-analytics-dashboard.png',
      gif: '/projects/data-analytics-dashboard-preview.gif',
      category: 'Data & AI',
      description: 'A powerful data analytics platform with real-time visualization, predictive modeling, SQL/NoSQL query engine, and automated report generation for business decision telemetry.',
      longDesc: 'Engineered with Python (Pandas/NumPy) for data processing pipelines and React with Chart.js on the frontend. Serves interactive dashboards, automated CSV/PDF report export, and anomaly detection algorithms.',
      tech: ['Python', 'React.js', 'Node.js', 'MongoDB', 'Chart.js', 'Pandas', 'REST API'],
      github: 'https://github.com/HassanAbdikadir/Data-Analytics-Dashboard',
      live: 'https://github.com/HassanAbdikadir/Data-Analytics-Dashboard',
      flagship: true,
      featured: true,
      stats: { accuracy: '97.4%', queriesSec: '2,400+' },
      gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
      caseStudy: {
        architecture: {
          frontend: 'React.js + Chart.js + Dynamic Canvas Telemetry',
          backend: 'Python FastAPI Pipeline Microservice + Express Router',
          database: 'MongoDB Aggregation Pipeline + SQL Analytics Warehouse',
          security: 'Sanitized Parameter Queries & JWT Role Verification'
        },
        topology: ['React Chart Canvas', 'Python Data Processing Pipeline', 'MongoDB Aggregation Engine'],
        challenges: [
          { problem: 'Browser freeze when rendering 50,000+ data points on Chart.js canvas.', solution: 'Applied data downsampling algorithms in Python prior to sending payload to client.' }
        ],
        benchmarks: [
          { label: 'Query Throughput', value: '2.4k req/sec' },
          { label: 'Forecast Model Accuracy', value: '97.4%' }
        ]
      }
    },
    {
      id: 'ecommerce-platform',
      title: 'E-Commerce Enterprise System',
      subtitle: 'FullStack MERN Store',
      image: '/projects/ecommerce-platform.png',
      category: 'FullStack App',
      description: 'Production-ready e-commerce solution with dynamic inventory control, cart management, Stripe payment gateway, order lifecycle tracking, and an admin management suite.',
      longDesc: 'Complete MERN stack e-commerce store featuring real-time stock management, secure checkout with Stripe API, admin inventory tools, PDF invoice generation, and product review ratings.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Stripe API', 'Redux Toolkit'],
      github: 'https://github.com/HassanAbdikadir/E-Commerce-MERN',
      live: 'https://github.com/HassanAbdikadir/E-Commerce-MERN',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      caseStudy: {
        architecture: {
          frontend: 'React.js + Redux Toolkit Shopping Cart',
          backend: 'Node.js Express + Stripe Webhook Gateway',
          database: 'MongoDB Inventory & Order Lifecycle Models'
        },
        topology: ['Client Storefront', 'Node.js API + Stripe Gateway', 'MongoDB Transaction Store'],
        challenges: [
          { problem: 'Inventory discrepancy during concurrent checkouts.', solution: 'Implemented MongoDB ACID transactions to atomically update product stock during checkout.' }
        ],
        benchmarks: [
          { label: 'Payment Webhook Processing', value: '< 180ms' }
        ]
      }
    },
    {
      id: 'realtime-chat',
      title: 'Real-Time Messaging Engine',
      subtitle: 'Socket.io Communication Platform',
      image: '/projects/realtime-chat.png',
      category: 'System',
      description: 'Scalable real-time messaging system supporting dynamic multi-user channels, direct messages, read receipts, audio call integration, and payload encryption.',
      longDesc: 'Architected with Node.js and Socket.io for low-latency WebSocket communication. Includes message persistence with MongoDB, Redis caching layer, and WebRTC peer-to-peer audio/video connection support.',
      tech: ['Socket.io', 'React.js', 'Node.js', 'MongoDB', 'JWT Auth', 'Redis', 'WebRTC'],
      github: 'https://github.com/HassanAbdikadir/RealTime-Chat-Engine',
      live: 'https://github.com/HassanAbdikadir/RealTime-Chat-Engine',
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      caseStudy: {
        architecture: {
          frontend: 'React UI + WebRTC Peer-to-Peer Signaling',
          backend: 'Node.js Socket.io Server + Event Emitters',
          database: 'MongoDB Message Store + Redis Ephemeral Buffer'
        },
        topology: ['React Chat UI', 'Socket.io WebSocket Broker', 'Redis Pub/Sub', 'MongoDB Store'],
        challenges: [
          { problem: 'Message loss during transient mobile network switches.', solution: 'Added client message queue with acknowledgment IDs and automated re-sync upon reconnect.' }
        ],
        benchmarks: [
          { label: 'Message Delivery Latency', value: '< 25ms' }
        ]
      }
    },
    {
      id: 'ai-mock-interviewer',
      title: 'AI Technical Mock Interviewer',
      subtitle: 'Powered by GPT-4 & MERN',
      image: '/projects/ai-mock-interviewer.png',
      category: 'Data & AI',
      description: 'Interactive technical interview simulator delivering real-time candidate code evaluation, dynamic follow-up questioning, and instant performance report generation.',
      longDesc: 'Combines OpenAI GPT-4 API with a Node.js microservice to evaluate candidate code submissions, analyze syntax/complexity, ask contextual follow-up questions, and score technical performance.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'OpenAI GPT-4', 'Express.js'],
      github: 'https://github.com/HassanAbdikadir/AI-Mock-Interviewer',
      live: 'https://github.com/HassanAbdikadir/AI-Mock-Interviewer',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      caseStudy: {
        architecture: {
          frontend: 'Monaco Code Editor + React Real-Time Feedback',
          backend: 'Node.js GPT-4 Stream Middleware',
          database: 'MongoDB Candidate Evaluation Records'
        },
        topology: ['Code Editor UI', 'Express Stream Handler', 'OpenAI GPT-4 Engine'],
        challenges: [
          { problem: 'High API latency waiting for complete GPT-4 responses.', solution: 'Switched to Server-Sent Events (SSE) stream parsing for token-by-token response streaming.' }
        ],
        benchmarks: [
          { label: 'Time-to-First Token', value: '< 320ms' }
        ]
      }
    },
    {
      id: 'headless-portfolio-cms',
      title: 'Headless Portfolio CMS',
      subtitle: 'Dynamic Content Management',
      image: '/projects/headless-portfolio-cms.png',
      category: 'Web Platform',
      description: 'A headless CMS for managing portfolio content dynamically — projects, blog articles, skill metrics, and contact messages with instant Cloudinary image optimization.',
      longDesc: 'Designed to give developers full control over portfolio content via an intuitive React dashboard. Includes automated media compression via Cloudinary API and role-based access management.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Cloudinary API', 'JWT'],
      github: 'https://github.com/HassanAbdikadir/Portfolio-CMS',
      live: 'https://github.com/HassanAbdikadir/Portfolio-CMS',
      gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
      caseStudy: {
        architecture: {
          frontend: 'React Admin Dashboard + Dynamic Content Builder',
          backend: 'Express REST Endpoints + JWT Role Gatekeepers',
          database: 'MongoDB Content Store + Cloudinary Media CDN'
        },
        topology: ['Admin Dashboard', 'Node.js REST API', 'MongoDB / Cloudinary CDN'],
        challenges: [
          { problem: 'Large uncompressed asset uploads slowing down portfolio load speed.', solution: 'Integrated serverless Cloudinary transformations for auto-webp conversion and responsive scaling.' }
        ],
        benchmarks: [
          { label: 'Image Compression Ratio', value: '75% Saved' }
        ]
      }
    }
  ],

  skills: [
    // Frontend
    { name: 'React.js', category: 'Frontend', level: 94, color: '#61DAFB' },
    { name: 'JavaScript (ES6+)', category: 'Frontend', level: 92, color: '#F7DF1E' },
    { name: 'HTML5 & CSS3', category: 'Frontend', level: 95, color: '#E34F26' },
    { name: 'TailwindCSS', category: 'Frontend', level: 90, color: '#38BDF8' },
    { name: 'Redux Toolkit', category: 'Frontend', level: 88, color: '#764ABC' },
    { name: 'Next.js', category: 'Frontend', level: 86, color: '#ffffff' },

    // Backend
    { name: 'Node.js', category: 'Backend', level: 92, color: '#339933' },
    { name: 'Express.js', category: 'Backend', level: 90, color: '#ffffff' },
    { name: 'MongoDB / Mongoose', category: 'Backend', level: 88, color: '#47A248' },
    { name: 'RESTful API Architecture', category: 'Backend', level: 94, color: '#3B82F6' },
    { name: 'Socket.io', category: 'Backend', level: 85, color: '#61DAFB' },
    { name: 'JWT & Security Suite', category: 'Backend', level: 90, color: '#D63AFF' },

    // Data & Analytics
    { name: 'Python', category: 'Data & Analytics', level: 88, color: '#3776AB' },
    { name: 'Data Visualization (Chart.js)', category: 'Data & Analytics', level: 89, color: '#10B981' },
    { name: 'SQL & PostgreSQL', category: 'Data & Analytics', level: 85, color: '#06B6D4' },
    { name: 'Pandas & Data Telemetry', category: 'Data & Analytics', level: 84, color: '#150458' },

    // DevOps & Tools
    { name: 'Git & GitHub', category: 'DevOps & Tools', level: 92, color: '#F05032' },
    { name: 'Docker Containers', category: 'DevOps & Tools', level: 80, color: '#2496ED' },
    { name: 'Postman API Suite', category: 'DevOps & Tools', level: 90, color: '#FF6C37' },
    { name: 'Linux System Ops', category: 'DevOps & Tools', level: 85, color: '#FCC624' },
  ],

  experiences: [
    {
      type: 'work',
      title: 'Software Engineer & FullStack Architect',
      org: 'FullStack Academy Platform',
      period: '2024 — Present',
      desc: 'Architected and built an end-to-end digital education ecosystem serving hundreds of students. Developed Socket.io messaging infrastructure, JWT security suite, AI mock interviewer, and role-based permissions.',
      tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AI/GPT', 'TailwindCSS'],
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
    },
    {
      type: 'work',
      title: 'Data Analyst & Solutions Engineer',
      org: 'Analytics Solutions & Consulting',
      period: '2023 — 2024',
      desc: 'Designed interactive data visualization portals, automated data pipelines using Python, and implemented predictive query engines to assist clients with data-driven decision telemetry.',
      tags: ['Python', 'SQL', 'Data Viz', 'Chart.js', 'Pandas'],
      gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
    },
    {
      type: 'work',
      title: 'MERN Stack Web Developer',
      org: 'Tech Freelance & Open Source',
      period: '2022 — 2023',
      desc: 'Delivered high-performance web applications including full-stack e-commerce stores, CMS platforms, and real-time chat engines for client startups worldwide.',
      tags: ['React.js', 'Express.js', 'MongoDB', 'REST APIs'],
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    },
    {
      type: 'education',
      title: 'B.Sc. in Computer Science & Software Engineering',
      org: 'Amoud University — Faculty of Computing & IT',
      period: '2020 — 2024',
      desc: 'Graduated with Distinction. Comprehensive degree curriculum covering Software Engineering, Data Structures & Algorithms, Database Systems (SQL/NoSQL), Web Systems Architecture, and Data Telemetry.',
      tags: ['Amoud University', 'B.Sc. CS & SE', 'Software Engineering', 'Data Structures', 'Web Systems'],
      gradient: 'linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)',
    }
  ],

  certifications: [
    { id: 1, name: 'FullStack MERN Architect Master', issuer: 'FullStack Academy', year: '2024', badge: 'Certified', color: '#F59E0B' },
    { id: 2, name: 'Professional Data Analytics & Visualization', issuer: 'Analytics Engineering Institute', year: '2023', badge: 'Certified', color: '#10B981' },
    { id: 3, name: 'Node.js & Microservices Engineering', issuer: 'Backend Tech Guild', year: '2023', badge: 'Certified', color: '#06B6D4' },
    { id: 4, name: 'Advanced React.js & Architecture', issuer: 'Frontend Masters Academy', year: '2022', badge: 'Certified', color: '#8B5CF6' },
  ],

  testimonials: [
    {
      id: 1,
      name: 'Eng. Liban Abdi',
      role: 'Senior Tech Lead',
      company: 'InnovateTech Systems',
      text: 'Hassan is an exceptional software engineer. His architecture on FullStack Academy demonstrated mastery over full-stack MERN development, real-time WebSocket communications, and polished UI design.',
      rating: 5,
      avatar: 'LA'
    },
    {
      id: 2,
      name: 'Amina Nur',
      role: 'Lead Data Strategist',
      company: 'Global Data Insights',
      text: 'Working with Hassan on our data visualization telemetry was smooth and efficient. He turned complex raw datasets into interactive, beautiful React dashboards ahead of schedule.',
      rating: 5,
      avatar: 'AN'
    },
    {
      id: 3,
      name: 'Mohamed Ali',
      role: 'Product Manager',
      company: 'NextGen Digital Solutions',
      text: 'Hassan consistently produces clean, scalable code. His attention to detail, real-time error prevention, and commitment to project quality set him apart as a top engineer.',
      rating: 5,
      avatar: 'MA'
    }
  ],

  metrics: [
    { key: 'years_tech', value: 3, suffix: '+', label: 'Years in Tech' },
    { key: 'projects_built', value: 20, suffix: '+', label: 'Projects Built' },
    { key: 'flagships', value: 5, suffix: 'x', label: 'Flagship Systems' },
    { key: 'passion', value: 100, suffix: '%', label: 'Passion for Code' },
  ],

  articles: [
    {
      id: 'architecting-realtime-systems',
      title: 'Architecting Real-Time Systems with Socket.io & Node.js',
      title_so: 'Dhisidda Nidaamyo Live ah iyadoo la adeegsanayo Socket.io & Node.js',
      category: 'System Architecture',
      category_so: 'Dhismaha Nidaamyada',
      readTime: '6 min read',
      readTime_so: '6 daqiiqo oo akhris ah',
      date: 'Sep 2024',
      snippet: 'Learn how to build sub-50ms WebSocket communication pipelines, handle connection drops, multi-room broadcasting, and horizontal scaling with Redis adapters.',
      snippet_so: 'Baro sida loo dhiiso xiriirinta WebSocket ee ka yar 50ms, maaraynta xariirka goa, baahinta qolalka badan, iyo u weynaynta nidaamka iyadoo la adeegsanayo Redis.',
      content: `### Architecting Low-Latency Real-Time Platforms

Real-time interactivity is no longer optional for modern applications. Whether building live education portals, messaging engines, or financial dashboards, WebSocket architecture provides bi-directional, full-duplex communication over a single TCP connection.

#### 1. WebSocket Lifecycle & Connection Handshakes
Unlike standard HTTP request-response cycles, WebSockets start with an HTTP GET handshake requesting a protocol upgrade. Once established:
- The persistent connection remains open for instantaneous frames.
- Low overhead: standard HTTP headers are omitted from frame payloads.

#### 2. Scaling with Redis Pub/Sub Adapters
When scaling Socket.io servers across multiple Node.js instances behind a load balancer (e.g. NGINX), direct memory event emitters fail because sockets live on separate processes. Using Redis Pub/Sub as a adapter allows events to broadcast across all instances seamlessly.

#### 3. Security & Token Authentication
Always authenticate WebSockets during the initial handshake query:
\`\`\`javascript
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (verifyToken(token)) return next();
  next(new Error("Unauthorized connection"));
});
\`\`\`

*Engineered by Hassan Abdikadir for FullStack Academy.*`,
      content_so: `### Dhisidda Nidaamyo Live ah oo Xawaare Sare Leh

Wada-shaqaynta live-ka ah maaha wax la dhayalsan karo nidaamyada casriga ah. Haddii aad dhisayso portals-ka waxbarashada, engines-ka fariimaha, ama dashboards-ka maaliyadda, dhismaha WebSocket wuxuu bixiyaa xiriir laba-geesood ah (bi-directional) oo ku dhex maraya hal TCP connection.

#### 1. Habka Shaqada WebSocket & Is-dhaafsiga Ogolaanshaha
Si ka dhiillan HTTP-ga caadiga ah, WebSockets waxay ku bilaabmaan HTTP GET handshake oo codsanaya in loo beddelo protocol-ka. Marka uu ku guuleysto:
- Xiriirku wuxuu sii joogaa mid furan oo fariimaha toos loo kala diri karo.
- Miisaan yar: baakadaha fariimaha lagu ma daro HTTP headers-kii cawaanta ahaa.

#### 2. U-weynaynta Nidaamka iyadoo la adeegsanayo Redis Pub/Sub
Marka la ballaarinayo Socket.io servers badan oo ku shaqaynaya Node.js, event emitters-ka caadiga ah ma wada shaqayn karaan sababtoo o sockets-ku waxay ku jiraan processes kala duwan. Adeegsiga Redis Pub/Sub wuxuu u allowable-garaynayaa in fariimaha la gaarsiiyo dhammaan servers-ka si hufan.

#### 3. Amniga & Hubinta Token-ka (JWT)
Mar walba hubi aqoonsiga Socket-ka markay bilaabmayso:
\`\`\`javascript
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (verifyToken(token)) return next();
  next(new Error("Xiriir aan la fasaxin"));
});
\`\`\`

*Waxa diyaariyay Hassan Abdikadir.*`,
      gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
    },
    {
      id: 'data-analytics-telemetry',
      title: 'Data Analytics Telemetry: From Python Pipelines to React Visualizations',
      title_so: 'Data Analytics Telemetry: Laga bilaabo Python Pipelines ilaa React Visualizations',
      category: 'Data Engineering',
      category_so: 'Injineernimada Data-da',
      readTime: '8 min read',
      readTime_so: '8 daqiiqo oo akhris ah',
      date: 'Aug 2024',
      snippet: 'A deep dive into building end-to-end data pipelines using Python Pandas, MongoDB aggregation pipelines, and Chart.js for real-time telemetry dashboards.',
      snippet_so: 'Falanqayn dheer oo ku saabsan dhisida pipelines-ka data-da iyadoo la adeegsanayo Python Pandas, MongoDB Aggregations, iyo Chart.js si loo muujiyo dashboards-ka live-ka ah.',
      content: `### Transforming Raw Data into Executive Intelligence

Data analytics is only as powerful as the pipeline feeding it. Building a responsive telemetry dashboard requires clean ETL (Extract, Transform, Load) pipelines, optimized query indices, and reactive UI visualization.

#### 1. Python Pandas for Preprocessing & Anomaly Detection
Before streaming metrics to frontends, data must be cleaned and aggregated:
\`\`\`python
import pandas as pd

# Load operational telemetry
df = pd.read_csv('telemetry_logs.csv')
cleaned_df = df.dropna().query('response_time_ms < 5000')
summary = cleaned_df.groupby('endpoint').agg({'latency': 'mean', 'requests': 'count'})
\`\`\`

#### 2. MongoDB Aggregation Framework
Instead of fetching thousands of raw documents into Node.js memory, leverage MongoDB's native aggregation pipeline:
\`\`\`javascript
const telemetry = await MetricModel.aggregate([
  { $match: { createdAt: { $gte: startPeriod } } },
  { $group: { _id: "$category", avgValue: { $avg: "$value" } } }
]);
\`\`\`

#### 3. Reactive UI Rendering
Chart.js integrated with React hooks ensures smoothly animated charts that update without full DOM re-renders.`,
      content_so: `### U beddelidda Data-da Cayriin ee Warbixino Go-aan Qaadasho Leh

Data analytics-ku wuxuu leeyahay awood sare marka pipeline-ka quudinaya uu hufan yahay. Dhisida telemetry dashboard oo xawaare sare leh waxay u baahan tahay ETL (Extract, Transform, Load) nadiif ah iyo habaynta query indices.

#### 1. Python Pandas ee Nadiifinta Data-da & Ogaanshada Ciladaha
Haddii aanan data-da loo dirin frontend-ka, waa in la nadiifiyaa oo la baaraa:
\`\`\`python
import pandas as pd

# Akhriso logs-ka nidaamka
df = pd.read_csv('telemetry_logs.csv')
cleaned_df = df.dropna().query('response_time_ms < 5000')
summary = cleaned_df.groupby('endpoint').agg({'latency': 'mean', 'requests': 'count'})
\`\`\`

#### 2. MongoDB Aggregation Framework
Halka libaax oo data ah oo la saari lahaa memory-ga Node.js, adeegso MongoDB native aggregation pipeline:
\`\`\`javascript
const telemetry = await MetricModel.aggregate([
  { $match: { createdAt: { $gte: startPeriod } } },
  { $group: { _id: "$category", avgValue: { $avg: "$value" } } }
]);
\`\`\`

#### 3. Muujinta Jaantusyada Nidaamka Live-ka ah
Adeegsiga Chart.js oo ku xidhan React hooks wuxuu bixiyaa jaantusyo si smooth ah u guuraya iyadoon dhammaan boga mar kale lagu shubin.`,
      gradient: 'linear-gradient(135deg, #10B981, #06B6D4)'
    },
    {
      id: 'securing-mern-stack',
      title: 'Securing MERN Stack Applications: JWT, Rate Limiting & Geo-Fencing',
      title_so: 'Adkaynta Amniga Nidaamyada MERN Stack: JWT, Rate Limiting & Geo-Fencing',
      category: 'Web Security',
      category_so: 'Amniga Web-ka',
      readTime: '5 min read',
      readTime_so: '5 daqiiqo oo akhris ah',
      date: 'Jul 2024',
      snippet: 'Essential security hardening patterns for Node.js & React: Express rate limiting, Helmet CSP headers, HTTP-only cookies, and IP geo-fencing protections.',
      snippet_so: 'Tallaabooyinka muhiimka ah ee lagu adkeeyo amniga Node.js & React: Xaddidaada codsiyada (rate limiting), Helmet CSP headers, iyo HTTP-only cookies.',
      content: `### Hardening Full-Stack Web Applications

Production applications face constant automated vulnerability scanning and DDoS attempts. Hardening your Express backend and React frontend requires layered defense in depth.

#### Key Security Checklist:
1. **HTTP-Only Cookies:** Store JWTs in \`httpOnly\`, \`secure\`, \`sameSite: 'strict'\` cookies to prevent XSS token theft.
2. **Express Rate Limiting:** Prevent brute-force login attempts with \`express-rate-limit\`.
3. **Helmet Header Protection:** Sanitize response headers and restrict X-Powered-By leakage.
4. **Input Validation:** Use Joi or Zod schemas to sanitize request bodies before database insertion.`,
      content_so: `### Adkaynta Amniga Nidaamyada Web-ka ee Full-Stack

Nidaamyada ku shaqaynaya liven-ka waxay wajahayaan weeraro kala duwan oo bot-yo ah. Adkaynta Express backend-ka iyo React frontend-ka waxay u baahan tahay dhowr lakab oo amni ah (layered defense).

#### Tallaabooyinka Ugu Muhiimsan ee Amniga:
1. **HTTP-Only Cookies:** Ku kaydi JWT tokens-ka \`httpOnly\`, \`secure\` cookies si looga hortago in lagu xado XSS attacks.
2. **Express Rate Limiting:** Ka hortag weerarada login-ka ee brute-force ah adoo adeegsanaya \`express-rate-limit\`.
3. **Helmet Header Protection:** Nadiifi headers-ka jawaabaha servers-ka si aan xogta backend-ka la ogaanin.
4. **Input Validation:** Nadiifi dhammaan xogta uu isticmaaluqu soo qoro inta aan lagu kaydin MongoDB.`,
      gradient: 'linear-gradient(135deg, #EC4899, #8B5CF6)'
    }
  ]
}
