const express = require("express");
const routes = express.Router(); // Router é responsável por fazer a varíavel ser responsavel pelas rotas
const captains = require("./captains");

//Verbos HTTP
// GET: Receber uma RESOURCE
//POST: Criar um novo RESOURCE
//PUT : Atualizar RESOURCE
//DELETE: Deletar uma RESOURCE


routes.get("/", function (req, res) {
  return res.redirect("/captains");
});

routes.get("/captains", captains.index);

routes.get("/captains/create", function (req, res) {
  return res.render("captains/create");
});

routes.get("/captains/:id", captains.show);

routes.get("/captains/:id/edit", captains.edit);

routes.post("/captains", captains.post); //usando tranquilamente as funções que coloquei no captains.js

routes.put("/captains", captains.put);

routes.delete("/captains", captains.delete)

routes.get("/crew", function (req, res) {
  return res.send("crew");
});

module.exports = routes;
