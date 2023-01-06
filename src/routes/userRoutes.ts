import express from "express";
import Resolver from "../utils/Resolver";
import CreateUserController from "../controller/CreateUserController";
import AuthenticateUserController from "../controller/AuthenticateUserController";

const userRouter: express.Router = express.Router();

const createUserController: CreateUserController = new CreateUserController();

const authenticateUserController: AuthenticateUserController =
  new AuthenticateUserController();

userRouter.post(
  "/login",
  new Resolver().handle(authenticateUserController.handle)
);

userRouter.post(
  "/register",
  new Resolver().handle(createUserController.handle)
);

export default userRouter;
