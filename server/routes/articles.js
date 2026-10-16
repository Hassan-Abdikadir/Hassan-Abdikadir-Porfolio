const express = require('express')
const router = express.Router()
const { getArticles, getArticleById, createArticle } = require('../controllers/articleController')

router.get('/', getArticles)
router.get('/:id', getArticleById)
router.post('/', createArticle)

module.exports = router
