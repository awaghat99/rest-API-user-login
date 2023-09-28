const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (req, res, next) => {
  try {
    const plainTextPassword = req.body.newPassword;
    const hashedPassword = await bcrypt.hash(plainTextPassword, parseInt(process.env.SALT));
    req.body.newPassword = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message, error: error });
  }
};

const passwordCheck = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    let hashedPassword = "dummy";
    if (userDetails) {
      hashedPassword = userDetails.password;
    }

    const plainTextPassword = req.body.password;
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!match) {
      throw new Error("UserName and password do not match");
    } else {
      next();
    }
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};
const tokenCheck = async (req, res, next) => {
  try {
    const secretKey = process.env.JWT_PASSWORD;
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, secretKey);
    const username = decodedToken.username;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      throw new Error("User not found");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = { hashPassword, passwordCheck, tokenCheck };
