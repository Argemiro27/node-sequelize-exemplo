const db = require("../models");
const Produto = db.produtos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  
    // Criando produtos
    const produto = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      preco: req.body.preco,
    };
  
    // Salvando no BD
    Produto.create(produto)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Houve um erro ao criar o produto!"
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Produto.findAll({ where: condition })
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
  