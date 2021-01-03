const { response, request } = require('express')
const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcryptjs')
router.get('/admin/users', (request, response) => {
    User.findAll().then(users => {
        response.render('admin/users/index', {users})
    })
})

router.get('/admin/users/create', (request, response) => {
    response.render('admin/users/create')
})

router.post('/users/create', (request, response) => {
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

module.exports = router