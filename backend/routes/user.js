import express from "express";
import userController from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/authenticate", userController.authenticate);
userRouter.post("/checkToken", userController.verifyToken);

export default userRouter;
