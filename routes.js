const express = require('express')
const routes = express.Router()// Router é responsável por fazer a varíavel ser responsavel pelas rotas
const captains = require('./captains')


routes.get('/', function(req, res) {
    return res.redirect('/captains')
})

routes.get('/captains', function(req, res) {
    return res.render('captains/index')
})

routes.get('/captains/create', function(req, res) {
    return res.render('captains/create')
})

routes.get('/captains/:id', captains.show)


routes.post("/captains", captains.post)//usando tranquilamente as funções que coloquei no captains.js

routes.get('/crew', function(req, res) {
    return res.send('crew')
})

module.exports = routes