import express from "express";

import CreateUserController from "../controller/CreateUserController";

import ICreateUserController from "../interfaces/ICreateUserController";

import AuthenticateUserController from "../controller/AuthenticateUserController";

import IAuthenticateUserController from "../interfaces/IAuthenticateUserController";

const userRouter: express.Router = express.Router();

const createUserController: ICreateUserController = new CreateUserController();

const authenticateUserController: IAuthenticateUserController =
  new AuthenticateUserController();

userRouter.post("/login", authenticateUserController.handle);

userRouter.post("/register", createUserController.handle);

export default userRouter;
