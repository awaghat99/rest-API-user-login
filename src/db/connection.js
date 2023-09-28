const { Sequelize } = require("sequelize");

const sqlConnection = new Sequelize(process.env.SQL_URI);

sqlConnection.authenticate();
console.log("Connection to db working");

module.exports = sqlConnection;
