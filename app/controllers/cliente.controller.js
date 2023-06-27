const bcrypt = require("bcrypt");
const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

  // Criando cliente
  const cliente = {
    nome: req.body.nome,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10) // Aplica bcrypt para criptografar a senha
  };

  // Salvando no BD
  Cliente.create(cliente)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao cadastrar cliente!"
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Cliente.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};