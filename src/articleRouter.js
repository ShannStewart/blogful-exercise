const express = require('express')
//const { v4: uuid } = require('uuid')

const ArticlesService = require('./articles-service')

const articleRouter = express.Router()
const bodyParser = express.json()

articleRouter
    .route('/articles')
    .get((res, req, next) => {
        ArticlesService.getAllArticles(
            /* need knex instance here */)
        .then(articles => {
            res.json(articles)
        })
     .catch(next)
    })

module.exports = articleRouter;