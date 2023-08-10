const express = require("express");
const rotas = express();

const {
  listarTodas,
  criarContas,
  atualizarConta,
  deletarConta,
  depositarConta,
  sacarConta,
  transferenciasContas,
  listarSaldo,
  listarExtrato,
} = require("./controladores/controlador");

const {
  validarCampos,
  validarDadoUnico,
  validarCamposAtualizacao,
  validarDeposito,
  validarContaBody,
  validarValorSaque,
  validarSenhaContas,
  validarTransferencia,
  validarConta,
  validarExtrato,
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
rotas.post(
  "/transacoes/depositar",
  validarDeposito,
  validarContaBody,
  depositarConta
);
rotas.post(
  "/transacoes/sacar",
  validarSenhaContas,
  validarValorSaque,
  sacarConta
);
rotas.post(
  "/transacoes/transferir",
  validarTransferencia,
  transferenciasContas
);
rotas.get("/contas/saldo", validarConta, listarSaldo);
rotas.get("/contas/extrato", validarExtrato, listarExtrato);

module.exports = rotas;
