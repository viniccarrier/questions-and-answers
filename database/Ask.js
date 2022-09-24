const Sequelize = require("sequelize");

const connection = require("./database");

const Ask = connection.define(
  "questions",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false, //NÃO PODE SER NULO
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {} //OPTIONS DEIXEI vazio
);

//NÃO FORÇAR A TABELA CASO EXISTA force:false
Ask.sync({ force: false }).then(() => {
  console.log("Created table Questions! ");
});

module.exports = Ask;
