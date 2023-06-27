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

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao procurar cliente de ID=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Cliente.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o cliente de id=${id}! Cliente não encontrado`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar cliente de ID=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cliente.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente deletado com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível deletar o cliente de ID=${id}. Cliente não encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível deletar o cliente de ID=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Cliente.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Clientes deletados com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu ao tentar excluir os clientes."
      });
    });
};