const Sequelize = require("sequelize");

const connection = require("./database");

const Answer = connection.define("answers", {
  questionBody: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answer.sync({ force: false }).then(() => {
  console.log("Created table Answer!");
});

module.exports = Answer;
