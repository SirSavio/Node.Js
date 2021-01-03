const { request, response } = require('express');
const express = require('express')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../middlewares/auth')

const Category = require('./Category');

router.get('/admin/categories/new', auth, (request, response) => {
    response.render('admin/categories/new')
})

router.post('/categories/save', auth, (request, response) => {
    console.log(request.body)
    let title = request.body.title
    if(!title) response.redirect('/admin/categories/new')
    else Category.create({
        title,
        slug: slugify(title)
    }).then(() => {
        response.redirect('/admin/categories')
    })
})

router.get('/admin/categories', auth, (request, response) =>{
    Category.findAll().then((categories) => {
        response.render('admin/categories/index', {categories})
    })
})

router.post('/categories/delete', auth, (request, response) => {
    let categoryId = request.body.id

    if(!categoryId || isNaN(categoryId)) response.redirect('/admin/categories')
    else{
        Category.destroy({
            where: {
                id: categoryId
            }
        }).then(() => {
            response.redirect('/admin/categories')
        })
    }
})

router.get('/admin/categories/edit/:id', auth, (request, response) => {
    let id = request.params.id
    if(isNaN(id)) response.redirect('/admin/categories')
    Category.findByPk(id).then((category) => {
        if(category) response.render('admin/categories/edit', {category})
        else response.redirect('/admin/categories')
    })
})

router.post('/categories/update', auth, (request, response) => {
    let id = request.body.id
    let title = request.body.title

    Category.update({title, slug: slugify(title)}, {
        where: {id}
    }).then(() => {
        response.redirect('/admin/categories')
    })
})

module.exports = router