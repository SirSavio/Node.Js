const { response, request } = require('express')
const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth')

router.get('/admin/users', auth, (request, response) => {
    User.findAll().then(users => {
        response.render('admin/users/index', {users})
    })
})

router.get('/admin/users/create', auth, (request, response) => {
    response.render('admin/users/create')
})

router.post('/users/create', auth, (request, response) => {
    let email = request.body.email
    let password = request.body.password


    User.findOne({ where: { email } }).then(user => {
        if (user) response.redirect('/admin/users/create')
        else {
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)

            User.create({
                email,
                password: hash
            }).then(() => {
                response.redirect('/')
            }).catch(error => {
                response.redirect('/')
            })
        }
    })
})

router.get('/login', (request, response) => {
    response.render('admin/users/login')
})

router.post('/authenticate', (request, response) => {
    let email = request.body.email
    let password = request.body.password

    User.findOne({
        where: {email}
    }).then(user => {
        if(user){
            let correct = bcrypt.compareSync(password, user.password)
            if(correct) {
                request.session.user = {
                    id: user.id,
                    email: user.email
                }
                response.redirect('/admin/articles')
            }
            else response.redirect('/login')
        }else response.redirect('/login')
    })
})

router.get('/logout', (request, response) => {
    request.session.user = null
    response.redirect('/login')
})

module.exports = router