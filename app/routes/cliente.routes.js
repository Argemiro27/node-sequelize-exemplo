module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");
  const auth = require("../controllers/auth.controller.js");
  var router = require("express").Router();

  // Criar cliente
  router.post("/", clientes.create);

  // Retornar todos clientes
  router.get("/", clientes.findAll);

  router.post("/login", auth.login);

  // Retornar um cliente específico pelo ID
  router.get("/:id", clientes.findOne);

  // Atualizar cliente
  router.put("/:id", clientes.update);

  // Deletar cliente
  router.delete("/:id", clientes.delete);

  // Deletar todos os clientes
  router.delete("/", clientes.deleteAll);

  app.use("/api/clientes", router);
};
