const path = require('path')
const express = require('express')
const xss = require('xss')


const ArticlesService = require('./articles-service')

const articleRouter = express.Router()
const bodyParser = express.json()

const cleanArticle = article => ({
    id: article.id,
    title: xss(article.title),
    content: xss(article.content),
    style: article.style,
    date_published: xss(article.date_published)
  
  })

articleRouter
    .route('/')
    .get((req, res, next) =>{

      const knexInstance = req.app.get('db')
      ArticlesService.getAllArticles(knexInstance)
      .then(article => {
        res.json(article.map(cleanArticle))
      })
      .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const { title, content, date_published, style } = req.body;
        const newArticle =  { title, content, date_published, style };


        for (const [key, value] of Object.entries(newArticle))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    ArticlesService.insertArticle(
      req.app.get('db'),
      newArticle
    )
    .then(article => {
      res
        .status(201)
        .location(`/articles/${article.id}`)
        .json(cleanArticle(article))
    })
    .catch(next)
})

articleRouter
    .route('/:id')
    .get((req, res, next) =>{
        ArticlesService.getById(
          req.app.get('db'),
          req.params.id
        )
      .then(article => {
        if (!article){
          return res.status(404).json({
            error: { message: `Article doesnt exist`}
          })
        }
        res.article = article;
        next()
      })
      .catch(next)
    })
    .delete((req, res, next) =>{
      ArticlesService.deleteItem(
        req.app.get('db'),
        req.params.id
      )

      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next);

    })

module.exports = articleRouter;