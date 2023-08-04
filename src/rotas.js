const express = require("express");
const rotas = express();

const { listarTodas } = require("./controladores/controlador");

rotas.get("/contas", listarTodas);

module.exports = rotas;
