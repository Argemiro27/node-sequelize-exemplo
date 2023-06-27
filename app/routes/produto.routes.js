module.exports = app => {
  const produtos = require("../controllers/produto.controller.js");

  var router = require("express").Router();

  // Criar produto
  router.post("/", produtos.create);

  // Retornar todos produtos
  router.get("/", produtos.findAll);

  // Retornar um produto específico pelo ID
  router.get("/:id", produtos.findOne);

  // Atualizar produto
  router.put("/:id", produtos.update);

  // Deletar produto
  router.delete("/:id", produtos.delete);

  // Deletar todos os produtos
  router.delete("/", produtos.deleteAll);

  app.use("/api/produtos", router);
};
