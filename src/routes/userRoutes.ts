import express from 'express'
import Resolver from '../utils/Resolver'
import CreateUserController from '../controller/CreateUserController'
import AuthenticateUserController from '../controller/AuthenticateUserController'

const userRouter: express.Router = express.Router()

const createUserController: CreateUserController = new CreateUserController()

const authenticateUserController: AuthenticateUserController =
  new AuthenticateUserController()

const resolver: Resolver = new Resolver()

userRouter.post(
  '/login',
  resolver.handle(authenticateUserController.handle) // eslint-disable-line
)

userRouter.post(
  '/register',
  resolver.handle(createUserController.handle) // eslint-disable-line
)

export default userRouter
