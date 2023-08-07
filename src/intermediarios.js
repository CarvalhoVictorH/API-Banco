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

module.exports = {
  validarSenha,
  validarDadoUnico,
  validarCampos,
  validarCamposAtualizacao,
};
