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
  

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Produto.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao procurar produto de ID=" + id
        });
      });
  };
  
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Produto.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Produto atualizado com sucesso."
          });
        } else {
          res.send({
            message: `Não foi possível atualizar o produto de id=${id}! Produto não encontrado`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao atualizar produto de ID=" + id
        });
      });
  };
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Produto.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Produto deletado com sucesso!"
          });
        } else {
          res.send({
            message: `Não foi possível deletar o produto de ID=${id}. Produto não encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Não foi possível deletar o produto de ID=" + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Produto.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Produtos deletados com sucesso!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu ao tentar excluir os produtos."
        });
      });
  };