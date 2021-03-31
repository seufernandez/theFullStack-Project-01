const express = require('express')
const routes = express.Router()// Router é responsável por fazer a varíavel ser responsavel pelas rotas

routes.get('/', function(req, res) {
    return res.redirect('/captains')
})

routes.get('/captains', function(req, res) {
    return res.render('captains/index')
})

routes.get('/captains/create', function(req, res) {
    return res.render('captains/create')
})

routes.post("/captains", function(req, res) {
    return res.send("recebido")
})

routes.get('/crew', function(req, res) {
    return res.send('crew')
})

module.exports = routes