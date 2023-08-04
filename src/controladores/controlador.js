const { banco, contas } = require("../bancodedados");

const listarTodas = (req, res) => {
  return res.send(contas);
};

const criarContas = (req, res) => {};

module.exports = { listarTodas, criarContas };
