module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("cliente", {
    nome: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return Cliente;
};
