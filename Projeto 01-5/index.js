const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use((request, response) => {
    response.send('OLA')
})

app.get('/', (request, response) => {
    response.send('OLA')
})

app.listen(3000, () => console.log("Running"))