import express from "express";

import auth from "../middlewares/auth";

import CreateUserController from "../controller/CreateUserController";

import ICreateUserController from "../interfaces/ICreateUserController";

const userRouter: express.Router = express.Router();

const createUserController: ICreateUserController = new CreateUserController();

router.post("/login", userLogin);

router.post("/register", createUserController.handle);

export default userRouter;
