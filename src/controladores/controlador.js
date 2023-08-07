const { banco, contas } = require("../bancodedados");

const listarTodas = (req, res) => {
  return res.send(contas);
};

const criarContas = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const numeroConta = (contas.length + 1).toString();

  const novaConta = {
    numero: numeroConta,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  contas.push(novaConta);
  res.status(201).json(novaConta);
};

const atualizarConta = (req, res) => {
  const { numeroConta } = req.params;
  const acharConta = contas.find((conta) => {
    return conta.numero == numeroConta;
  });

  if (!acharConta) {
    res.status(404).json({
      mensagem:
        "não foi possível localizar esta conta, por favor informe uma conta válida",
    });
  }

  const { nome, cpf, data_nascimento, telefone, email, senha } = req.conta;

  if (nome) acharConta.usuario.nome = nome;
  if (cpf) acharConta.usuario.cpf = cpf;
  if (data_nascimento) acharConta.usuario.data_nascimento = data_nascimento;
  if (telefone) acharConta.usuario.telefone = telefone;
  if (email) acharConta.usuario.email = email;
  if (senha) acharConta.usuario.senha = senha;

  return res.json({ mensagem: "Conta atualizada com sucesso" });
};

const deletarConta = (req, res) => {
  const { numeroConta } = req.params;

  const acharConta = contas.find((conta) => conta.numero === numeroConta);

  if (!acharConta) {
    return res.status(404).json({
      mensagem: "Conta não encontrada",
    });
  }

  if (acharConta.saldo !== 0) {
    return res.status(400).json({
      mensagem:
        "Não é possível excluir a conta, pois ela possui saldo em conta",
    });
  }

  const indexConta = contas.findIndex((conta) => conta.numero === numeroConta);
  contas.splice(indexConta, 1);

  return res.json({ mensagem: "Conta deletada com sucesso" });
};

module.exports = { listarTodas, criarContas, atualizarConta, deletarConta };
