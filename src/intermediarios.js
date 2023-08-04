const { banco } = require("./bancodedados");

const validarSenha = (req, res, next) => {
  const { senha_banco } = req.query;

  if (!senha_banco) {
    return res.status(401).send({ mensagem: "Senha não informada." });
  }

  if (senha_banco !== banco.senha) {
    return res.status(401).send({
      mensagem: "Senha incorreta, por favor informe uma senha válida",
    });
  }

  next();
};

module.exports = validarSenha;
