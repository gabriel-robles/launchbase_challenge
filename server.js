const express = require('express')
const nunjucks = require('nunjucks')
const classes = require('./data')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false
})

server.get('/', function (req, res) {
    return res.render('courses', {
        items: classes
    })
})

server.get('/courses/:id', function (req, res) {
    const id = req.params.id;

    const clase = classes.find(function (clase) {
        return clase.id == id
    })

    return (!clase) ? res.render('not-found') : res.render('course', {
        item: clase
    })
})

server.get('/about', function (req, res) {
    const about = {
        img_url: "https://pbs.twimg.com/profile_images/1271517147349626881/Mf1UjRa0_400x400.jpg",
        name: "Rocketseat",
        description: 'Nós somos uma empresa que tem como missão disseminar o conhecimento em programação para todos acesse nosso <a href="https://blog.rocketseat.com.br/" target="_blank">blog</a>',
        title: "Tecnologias que usamos",
        techs: [
            "Javascript",
            "Node.js",
            "React.js",
            "React Native"
        ],
        links: [{
                url: "https://discordapp.com/invite/gCRAFhc",
                name: "Comunidade"
            },
            {
                url: "mailto:oi@rocketseat.com.br",
                name: "Email"
            },
            {
                url: "tel:+5547992078767",
                name: "Telefone"
            },
        ]
    }

    return res.render('about', {
        about
    })
})

server.use(function (req, res) {
    res.status(404).render('not-found')
})

server.listen(5050)