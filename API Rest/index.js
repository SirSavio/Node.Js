const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { response } = require('express');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let DB = {
    games: [
        {
            id: 1,
            title: 'Call Of Duty',
            year: 2020,
            price: 60
        },
        {
            id: 2,
            title: 'Sea of Thieves',
            year: 2018,
            price: 10
        },
        {
            id: 3,
            title: 'Minecraft',
            year: 2011,
            price: 10
        }
    ]
}

app.get('/games', (request, response) => {
    response.statusCode = 200
    response.json(DB.games)
})

app.get('/game/:id', (request, response) => {
    let id = request.params.id

    if (id && !isNaN(id)) {
        id = parseInt(id)
        let game = DB.games.find(g => g.id == id)

        if (!game) {
            response.statusCode = 404
            response.json({ message: 'Não encontrado' })
        } else {
            response.statusCode = 200
            response.json(game)
        }
    } else {
        response.statusCode = 400
        response.json({ message: 'ID inválido' })
    }
})

app.post('/game', (request, response) => {
    // let title = request.body.title
    // let year = request.body.year
    // let price = request.body.price

    const { title, year, price } = request.body

    DB.games.push({
        id: Math.ceil(Math.random() * 99999),
        title,
        year,
        price
    })
    response.sendStatus(200)
})

app.delete('/game/:id', (request, response) => {
    const id = request.params.id

    if (id && !isNaN(id)) {
        let gameIndex = DB.games.findIndex(g => g.id == id)
        if (gameIndex == -1) {
            response.statusCode = 404
            response.json({ message: 'ID Inválido' })
        } else {
            DB.games.splice(gameIndex, 1)
            response.statusCode = 200
            response.json({ message: 'Sucesso' })
        }
    } else {
        response.statusCode = 400
        response.json({ message: 'ID Inválido' })
    }
})

app.put('/game/:id', (request, response) => {
    let id = request.params.id

    if (id && !isNaN(id)) {
        id = parseInt(id)
        let game = DB.games.find(g => g.id == id)

        if (!game) {
            response.statusCode = 404
            response.json({ message: 'Não encontrado' })
        } else {
            response.statusCode = 200
            const { title, year, price } = request.body

            if(title) game.title = title
            if(price) game.price = price
            if(year) game.year = year
            response.sendStatus(200)
        }
    } else {
        response.statusCode = 400
        response.json({ message: 'ID inválido' })
    }
})

app.listen(8080, () => {
    console.log('Running')
})