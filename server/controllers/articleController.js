const Article = require('../models/Article')

// Default articles seed array in case MongoDB collection is empty
const seedArticles = [
  {
    title: 'Architecting Scalable Microservices with Node.js & Redis Cluster',
    snippet: 'A deep dive into distributed state management, event-driven message queuing, and multi-region failover strategies.',
    content: `Building high-throughput microservices requires thoughtful architecture choices. In this paper, we explore how combining Node.js asynchronous event loops with Redis Cluster enables sub-10ms response times across multi-tenant educational platforms like FullStack Academy.\n\nKey takeaways:\n1. Non-blocking I/O optimization in Express controllers.\n2. Pub/Sub event queues for asynchronous telemetry processing.\n3. Cache invalidation patterns for persistent MongoDB queries.`,
    category: 'Architecture',
    readTime: '8 min read',
    date: 'Sep 2026',
    author: 'Hassan Abdikadir',
    gradient: 'linear-gradient(135deg, #2563EB, #7C3AED)',
    views: 1240,
    likes: 98,
    tags: ['Node.js', 'Redis', 'Microservices', 'System Design']
  },
  {
    title: 'Predictive Analytics & Real-Time Data Pipelines using Python & Pandas',
    snippet: 'How to ingest, transform, and visualize streaming telemetry data using statistical modeling and clean REST APIs.',
    content: `Data Analytics is more than just bar charts. It is about understanding system behavior in real-time. This paper demonstrates a complete pipeline connecting Python data processing scripts with React dashboard visualizers.\n\nHighlights:\n- Time-series anomaly detection.\n- Automated dataset aggregation with Pandas.\n- Serving vectorized telemetry metrics over WebSockets.`,
    category: 'Data Analytics',
    readTime: '6 min read',
    date: 'Aug 2026',
    author: 'Hassan Abdikadir',
    gradient: 'linear-gradient(135deg, #059669, #06B6D4)',
    views: 890,
    likes: 74,
    tags: ['Python', 'Pandas', 'Data Science', 'Telemetry']
  },
  {
    title: 'Securing MERN Stack Applications: OWASP Top 10 Best Practices',
    snippet: 'Practical guide on JWT authentication, rate limiting, MongoDB injection prevention, and CORS hardening.',
    content: `Security must be built into web applications from line one. This article covers practical defense-in-depth strategies implemented in Hassan's production portfolio and enterprise web platforms.\n\nTopics:\n- Helmet.js security header policies.\n- Mongo-sanitize middleware for NoSQL injection prevention.\n- Strict JWT token rotation & refresh token strategies.`,
    category: 'Security',
    readTime: '7 min read',
    date: 'Jul 2026',
    author: 'Hassan Abdikadir',
    gradient: 'linear-gradient(135deg, #D97706, #DC2626)',
    views: 1520,
    likes: 135,
    tags: ['Security', 'MERN', 'JWT', 'OWASP']
  }
]

// GET /api/v1/articles
exports.getArticles = async (req, res) => {
  try {
    let articles = await Article.find().sort({ createdAt: -1 })
    if (!articles || articles.length === 0) {
      articles = await Article.insertMany(seedArticles)
    }
    res.json({ success: true, count: articles.length, data: articles })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET /api/v1/articles/:id
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' })
    article.views += 1
    await article.save()
    res.json({ success: true, data: article })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST /api/v1/articles
exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body)
    res.status(201).json({ success: true, data: article })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}
