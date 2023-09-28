const User = require("../models/users");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.newPassword,
    });
    const expirationTime = 1000 * 60 * 60 * 24 * 7;
    const privateKey = process.env.JWT_PASSWORD;
    const payload = {
      username: req.body.username,
    };
    const options = {
      expiresIn: expirationTime,
    };
    const token = await jwt.sign(payload, privateKey, options);
    console.log(token);

    res.status(201).json({
      successMessage: "User Successfully created",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const expirationTime = 1000 * 60 * 60 * 24 * 7;
    const privateKey = process.env.JWT_PASSWORD;
    const payload = {
      username: req.body.username,
    };
    const options = {
      expiresIn: expirationTime,
    };
    const token = await jwt.sign(payload, privateKey, options);
    console.log(token);

    res.status(201).json({
      successMessage: "User Successfully logged in",
      user: req.body.username,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, errorMessage: error.message });
  }
};

const listAllUsers = async (req, res) => {
  try {
    const listOfUsers = await User.findAll();
    res.status(200).json({
      message: "All users from the database are:",
      userList: listOfUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const updatePassword = async (req, res) => {
  try {
    await User.update({ password: req.body.newPassword }, { where: { username: req.body.username } });
    res.status(200).json({ message: "password successfully updated" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: { username: req.body.username },
    });

    res.status(200).json({ message: "successfully deleted profile" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  registerUser,
  listAllUsers,
  updatePassword,
  deleteUser,
  loginUser,
};
