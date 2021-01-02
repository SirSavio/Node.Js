const { response, request } = require("express");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
    .authenticate()
    .then(() => {
        console.log('conexao OK');
    }).catch((error) => {
        console.log(error);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (request, response) => {
    Pergunta.findAll({raw: true, order: [
        ['id','DESC']
    ]}).then(perguntas => {
        response.render('index', {perguntas});
    });
});

app.get('/perguntar', (request, response) => {
    response.render('perguntar');
});

app.get('/pergunta/:id', (request, response) => {
    let id = request.params.id;
    Pergunta.findOne({
        where: {id}
    }).then((pergunta) => {
        if(pergunta){
            Resposta.findAll({
                where: {pergunta_id: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                response.render('pergunta', {pergunta, respostas});
            })
        }else{
            response.redirect('/');
        }
    })
});

app.post('/salvar-pergunta', (request, response) => {
    let titulo = request.body.titulo;
    let descricao = request.body.descricao;

    Pergunta.create({
        titulo,
        descricao
    }).then(() => {
        response.redirect('/');
    })
});

app.post('/responder', (request, response) => {
    let corpo = request.body.corpo;
    let pergunta_id = request.body.perguntaId;

    Resposta.create({
        corpo,
        pergunta_id
    }).then(() => {
        response.redirect('/pergunta/' + pergunta_id);
    });
});

app.listen(8080, () => {
    console.log('Running');
});