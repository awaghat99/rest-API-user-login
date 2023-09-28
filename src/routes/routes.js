const { Router } = require("express");
const userRouter = Router();

const { registerUser, listAllUsers, updatePassword, deleteUser, loginUser } = require("../controllers/controllers");
const { hashPassword, passwordCheck, tokenCheck } = require("../middleware");

userRouter.post("/users/register", hashPassword, registerUser);
userRouter.get("/users/login", passwordCheck, loginUser);
userRouter.get("/users/listallusers", tokenCheck, listAllUsers);
userRouter.delete("/users/deleteuser", tokenCheck, deleteUser);
userRouter.put("/users/updatepassword", passwordCheck, hashPassword, updatePassword);

module.exports = userRouter;
