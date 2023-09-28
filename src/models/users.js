const { DataTypes } = require("sequelize");
const sqlConnection = require("../db/connection");

const User = sqlConnection.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowedNull: false,
    unique: true,
    validation: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowedNull: false,
  },
});

module.exports = User;
