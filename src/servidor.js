const express = require("express");
const rotas = require("./rotas");
const { validarSenha } = require("./intermediarios");

const app = express();

app.use(express.json());
app.use(validarSenha);
app.use(rotas);

module.exports = app;
