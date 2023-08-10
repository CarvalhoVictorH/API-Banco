const {
  banco,
  contas,
  depositos,
  saques,
  transferencias,
} = require("../bancodedados");
const { format } = require("date-fns");

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

const depositarConta = (req, res) => {
  const { numeroConta, valor } = req.body;

  const acharConta = contas.find((conta) => conta.numero === numeroConta);

  if (!acharConta) {
    return res.status(404).json({
      mensagem:
        "Não foi possível encontrar essa conta, por favor informe uma conta válida.",
    });
  }

  acharConta.saldo += valor;

  const deposito = {
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    numeroConta,
    valor,
  };

  depositos.push(deposito);

  return res.status(201).json({ mensagem: "Depósito realizado com sucesso!" });
};

const sacarConta = (req, res) => {
  const { numeroConta, valor } = req.body;
  const acharConta = contas.find((conta) => conta.numero === numeroConta);

  acharConta.saldo -= valor;

  const saque = {
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    numeroConta,
    valor,
  };

  saques.push(saque);
  return res.status(201).json({ mensagem: "Saque realizado com sucesso!" });
};

const transferenciasContas = (req, res) => {
  const { numeroContaOrigem, numeroContaDestino, valor } = req.body;

  const acharContaOrigem = contas.find(
    (conta) => conta.numero === numeroContaOrigem
  );

  const acharContaDestino = contas.find(
    (conta) => conta.numero === numeroContaDestino
  );

  acharContaOrigem.saldo -= valor;

  acharContaDestino.saldo += valor;

  const transferencia = {
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    numeroContaOrigem,
    numeroContaDestino,
    valor,
  };

  transferencias.push(transferencia);

  res.status(201).json({ mensagem: "Trasferência realizada com sucesso!" });
};

const listarSaldo = (req, res) => {
  const { numero_conta } = req.query;
  const acharConta = contas.find((conta) => conta.numero === numero_conta);

  return res.status(200).json({ saldo: acharConta.saldo });
};

const listarExtrato = (req, res) => {
  const { contaEncontrada } = req;

  const extrato = {
    depositos: depositos.filter(
      (deposito) => deposito.numeroConta === contaEncontrada.numero
    ),
    saques: saques.filter(
      (saques) => saques.numeroConta === contaEncontrada.numero
    ),
    transferenciasEnviadas: transferencias.filter(
      (transferencia) =>
        transferencia.numeroContaOrigem === contaEncontrada.numero
    ),
    transferenciasRecebidas: transferencias.filter(
      (transferencia) =>
        transferencia.numeroContaDestino === contaEncontrada.numero
    ),
  };

  res.status(200).json(extrato);
};

module.exports = {
  listarTodas,
  criarContas,
  atualizarConta,
  deletarConta,
  depositarConta,
  sacarConta,
  transferenciasContas,
  listarSaldo,
  listarExtrato,
};
