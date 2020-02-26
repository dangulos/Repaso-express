const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", 'root', '' ,
{
    host: 'localhost',
    dialect: "mysql",
    operatorAliases: false
});

module.exports = sequelize;