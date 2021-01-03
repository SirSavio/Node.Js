const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const session = require('express-session')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/articlesController')
const UsersController = require('./users/UsersController')

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

app.use(session({
    secret: 'qualquercoisa',
    cookie: {maxAge: 60000000}
}))

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection.authenticate()
    .then(() => {
        console.log('DB OK')
    })
    .catch((error) => {
        console.log(error)
    })

app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', UsersController)

app.get('/', (request, response) => {
    Article.findAll({
        order: [['id', 'DESC']],
        limit: 4
    }).then((articles) => {
        Category.findAll().then((categories) => {
            response.render('index', {articles, categories})
        })
    })
})

app.get('/:slug', (request, response) => {
    let slug = request.params.slug
    Article.findOne({
        where: {slug},
    }).then((article) => {
        if(article) Category.findAll().then((categories) => {
            response.render('article', {article, categories})
        })
        else response.redirect('/')
    }).catch((error) => {
        response.redirect('/')
    })
})

app.get('/category/:slug', (request, response) => {
    let slug = request.params.slug
    Category.findOne({
        where: {slug}
    }).then((category) => {
        if(category){
            Category.findAll().then((categories) => {
                response.render('index', {articles: category.articles, categories})
            })
        }
        else response.redirect('/')
    })
})

app.listen(8080, () => {
    console.log('Running')
})