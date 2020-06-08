const express = require('express');
const server = express();
const { Entidade }  = require('./app/models/');
const bodyParser = require('body-parser');
const { Op } = require("sequelize");

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.static('public'))


server.get("/", (req, res) => {
    return res.render('index.html') 
})


server.get("/create-point", (req, res) => {
    return res.render('create-point.html')
    
})

server.post('/savepoint', (req, res) =>{
       try {
        Entidade.create({
            name: req.body.name,
            endereco: req.body.address,
            estado: req.body.state,
            endereco2: req.body.address2,
            cidade: req.body.city,
            image: req.body.image,
            items: req.body.items
        });
        return res.render('create-point.html', {saved: true})
    } catch (error) {
        console.log('Erro no cadastro: ' + error)
        res.send('Erro no cadastro')
    }

    
})

server.get("/search", async (req, res) => {
    const search = req.query.search

    if(search === ''){
        return res.render('search-results.html', {total: 0})
    }

    //Enviar os resultados da busca no banco de dados para a página search-results
    try {
        await Entidade.findAll({
            where: {
                cidade: {
                    [Op.like]: `%${search}%`
                }
            }
        }).then(  function(entidades) {
            const total = entidades.length
            res.render('search-results.html', {places: entidades, total})
        })
    } catch (error) {
        return console.log(error)
    }

})

// Entidade.create({
//     name: 'PaperSider',
//     endereco: 'Guilherme Gemabala, Jardim América',
//     estado: 'Santa Catarina',
//     endereco2: 'Nº 260',
//     cidade: 'Rio do Sul',
//     image: 'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
//     items: 'Papéis e Papelão'
// });



server.listen(3000);