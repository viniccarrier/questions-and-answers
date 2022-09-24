const Sequelize = require("sequelize");

const connection = new Sequelize("askme", "root", "Adm123*#$%*", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
  dialectOptions: {
    useUTC: false,
  },
});

module.exports = connection;
