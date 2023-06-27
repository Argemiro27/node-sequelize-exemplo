const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Procurar o cliente pelo email no banco de dados
  Cliente.findOne({ where: { email: email } })
    .then(cliente => {
      if (!cliente) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      const passwordMatch = bcrypt.compareSync(password, cliente.password);

      if (!passwordMatch) {
        return res.status(401).send({ message: "Senha incorreta." });
      }

      // Gerar um token de autenticação
      const token = jwt.sign({ id: cliente.id }, "segredo", {
        expiresIn: 86400 // Expira em 24 horas (opcional, ajuste de acordo com suas necessidades)
      });

      res.send({ token: token });
    })
    .catch(err => {
      res.status(500).send({ message: "Erro ao autenticar usuário." });
    });
};