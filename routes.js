const express = require('express')
const routes = express.Router()// Router é responsável por fazer a varíavel ser responsavel pelas rotas

routes.get('/', function(req, res) {
    return res.redirect('/captains')
})

routes.get('/captains', function(req, res) {
    return res.render('captains/index')
})

routes.get('/crew', function(req, res) {
    return res.send('crew')
})

module.exports = routes