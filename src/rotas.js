const express = require("express");
const rotas = express();

const {
  listarTodas,
  criarContas,
  atualizarConta,
  deletarConta,
} = require("./controladores/controlador");

const {
  validarCampos,
  validarDadoUnico,
  validarCamposAtualizacao,
} = require("./intermediarios");

rotas.get("/contas", listarTodas);
rotas.post("/contas", validarCampos, validarDadoUnico, criarContas);
rotas.put(
  "/contas/:numeroConta/usuario",
  validarDadoUnico,
  validarCamposAtualizacao,
  atualizarConta
);

rotas.delete("/contas/:numeroConta", deletarConta);

module.exports = rotas;
