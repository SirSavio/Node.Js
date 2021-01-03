const express = require('express')
const Category = require('../categories/Category')
const Article = require('../articles/Article');
const slugify = require('slugify');
const router = express.Router()
const auth = require('../middlewares/auth')

router.get('/admin/articles', auth,  (request, response) => {
    Article.findAll({
        include: [{model: Category}]
    }).then((articles) => {
        console.log(articles)
        response.render('admin/articles/index', {articles})
    })
})

router.get('/admin/articles/new', auth, (request, response) => {
    Category.findAll().then((categories) => {
        response.render('admin/articles/new', {categories})
    })
})

router.post('/articles/save', auth, (request, response) => {
    console.log(request.body)
    let title = request.body.title
    let body = request.body.body
    let category = request.body.category

    Article.create({
        title,
        slug: slugify(title),
        body,
        categoryId: category
    }).then(() => {
        response.redirect('/admin/articles')
    })
})

router.post('/articles/delete', auth, (request, response) => {
    let articleId = request.body.id

    if(!articleId || isNaN(articleId)) response.redirect('/admin/articles')
    else{
        Article.destroy({
            where: {
                id: articleId
            }
        }).then(() => {
            response.redirect('/admin/articles')
        })
    }
})

router.get('/admin/articles/edit/:id', auth, (request, response) => {
    let articleId = request.params.id
    
    Article.findOne({
        where: {id: articleId}
    }).then((article) => {
        if(article) Category.findAll().then((categories) => {
            response.render('admin/articles/edit', {article, categories})
        })
        else response.redirect('/admin/articles')
    })
})

router.post('/articles/update', auth, (request, response) => {
    let articleId = request.body.id
    let title = request.body.title
    let body = request.body.body
    let category = request.body.category

    Article.update({title, body, categoryId: category, slug: slugify(title)}, {
        where: {id: articleId}
    }).then(() => {
        response.redirect('/admin/articles')
    })
})

router.get('/articles/page/:num', (request, response) =>{
    let page = request.params.num
    page = parseInt(page)
    if(page < 1 || isNaN(page)) page = 1
    Article.findAndCountAll({
        limit: 4,
        offset: (page-1)*4,
        order: [['id', 'DESC']]
    }).then(articles => {
        let next = true

        if(page*4 > articles.count) next = false
        let result = {
            page,
            articles,
            next
        }

        Category.findAll().then((categories) => {
            response.render('admin/articles/page', {result, categories})
        })
    })
})

module.exports = router