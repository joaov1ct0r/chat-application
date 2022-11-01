import express from "express";

import resolver from "../utils/Resolver";

import CreateUserController from "../controller/CreateUserController";

import ICreateUserController from "../interfaces/ICreateUserController";

import AuthenticateUserController from "../controller/AuthenticateUserController";

import IAuthenticateUserController from "../interfaces/IAuthenticateUserController";

const userRouter: express.Router = express.Router();

const createUserController: ICreateUserController = new CreateUserController();

const authenticateUserController: IAuthenticateUserController =
  new AuthenticateUserController();

userRouter.post("/login", resolver(authenticateUserController.handle));

userRouter.post("/register", resolver(createUserController.handle));

export default userRouter;
