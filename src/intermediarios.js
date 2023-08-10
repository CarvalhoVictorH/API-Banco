const { banco, contas } = require("./bancodedados");

const validarSenha = (req, res, next) => {
  const { senha_banco } = req.query;

  if (!senha_banco) {
    return res.status(401).json({ mensagem: "Senha não informada." });
  }

  if (senha_banco !== banco.senha) {
    return res.status(401).json({
      mensagem: "Senha incorreta, por favor informe uma senha válida",
    });
  }

  next();
};

const validarCampos = (req, res, next) => {
  const { nome, cpf, data_nascimento, telefone, senha, email } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  req.conta = { nome, cpf, data_nascimento, telefone, senha, email };
  next();
};

const validarDadoUnico = (req, res, next) => {
  const { cpf, email } = req.body;

  if (contas.some((conta) => conta.usuario.cpf === cpf)) {
    return res.status(400).json({ mensagem: "CPF já cadastrado." });
  }

  if (contas.some((conta) => conta.usuario.email === email)) {
    return res.status(400).json({ mensagem: "Email já cadastrado." });
  }

  next();
};

const validarCamposAtualizacao = (req, res, next) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
    return res.status(400).json({
      mensagem: "Pelo menos um campo deve ser enviado para atualização",
    });
  }

  req.conta = { nome, cpf, data_nascimento, telefone, email, senha };

  next();
};

const validarDeposito = (req, res, next) => {
  const { numeroConta, valor } = req.body;

  if (!numeroConta) {
    return res
      .status(400)
      .json({ mensagem: "Por favor, informe um número de conta válido." });
  } else if (valor === undefined || valor <= 0) {
    return res
      .status(400)
      .json({ mensagem: "Por favor, informe o valor a ser depositado." });
  }

  next();
};

const validarContaBody = (req, res, next) => {
  const { numeroConta } = req.body;
  const acharConta = contas.find((conta) => conta.numero === numeroConta);

  if (!acharConta) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  next();
};

const validarSenhaContas = (req, res, next) => {
  const { numeroConta, senha } = req.body;

  const acharConta = contas.find((conta) => conta.numero === numeroConta);
  if (!acharConta) {
    return res.status(404).json({
      mensagem:
        "Não foi possível encontrar essa conta, por favor informe uma conta válida.",
    });
  }

  if (acharConta.usuario.senha !== senha) {
    return res
      .status(401)
      .json({ mensagem: "por favor, informe a senha correta." });
  }

  next();
};

const validarValorSaque = (req, res, next) => {
  const { numeroConta, valor } = req.body;
  const acharConta = contas.find((conta) => conta.numero === numeroConta);

  if (!acharConta) {
    return res.status(404).json({
      mensagem:
        "Não foi possível encontrar essa conta, por favor informe uma conta válida.",
    });
  }

  if (valor <= 0) {
    return res
      .status(400)
      .json({ mensagem: "Por favor, informe um valor válido" });
  } else if (valor > acharConta.saldo) {
    return res.status(400).json({
      mensagem:
        "Não foi possível realizar o saque, valor de saque maior que o saldo disponível.",
    });
  }

  next();
};

const validarTransferencia = (req, res, next) => {
  const { numeroContaOrigem, numeroContaDestino, valor, senha } = req.body;

  if ((!numeroContaOrigem || !numeroContaDestino, !valor, !senha)) {
    return res.status(400).json({
      mensagem: "não foi possível realizar a operação, revise os dados!",
    });
  }

  const acharContaOrigem = contas.find(
    (conta) => conta.numero === numeroContaOrigem
  );
  if (!acharContaOrigem) {
    return res.status(404).json({
      mensagem:
        "Não foi possível encontrar essa conta, por favor informe uma conta válida.",
    });
  }

  const acharContaDestino = contas.find(
    (conta) => conta.numero === numeroContaDestino
  );
  if (!acharContaDestino) {
    return res.status(404).json({
      mensagem:
        "Não foi possível encontrar essa conta, por favor informe uma conta válida.",
    });
  }

  if (acharContaOrigem === acharContaDestino) {
    return res.status(400).json({
      mensagem: "Você não pode fazer trasnferências para contas iguais.",
    });
  }

  if (acharContaOrigem.usuario.senha !== senha) {
    return res.status(401).json({
      mensagem: "Senha incorreta, por favor informe uma senha válida.",
    });
  }

  if (acharContaOrigem.saldo < valor) {
    return res.status(400).json({
      mensagem: "valor do saldo insuficiente para realizar a transferência.",
    });
  }

  next();
};

const validarConta = (req, res, next) => {
  const { numero_conta } = req.query;
  const acharConta = contas.find((conta) => conta.numero === numero_conta);

  if (!acharConta) {
    return res.status(404).json({
      mensagem:
        "Não foi possível encontrar essa conta, por favor informe uma conta válida.",
    });
  }

  next();
};

const validarExtrato = (req, res, next) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(400).json({
      mensagem: "Por favor, informe o número da conta e a senha.",
    });
  }

  const acharConta = contas.find((conta) => conta.numero === numero_conta);
  if (!acharConta) {
    return res.status(404).json({
      mensagem:
        "Não foi possível encontrar essa conta, por favor informe uma conta válida.",
    });
  }

  if (acharConta.usuario.senha !== senha) {
    return res.status(401).json({
      mensagem: "Senha incorreta, por favor informe a senha correta.",
    });
  }

  req.contaEncontrada = acharConta;
  next();
};

module.exports = {
  validarSenha,
  validarDadoUnico,
  validarCampos,
  validarCamposAtualizacao,
  validarDeposito,
  validarContaBody,
  validarValorSaque,
  validarSenhaContas,
  validarTransferencia,
  validarConta,
  validarExtrato,
};
