import express from 'express'
import UserFactory from '@Factories/userFactory'

const userRouter: express.Router = express.Router()
const userFactory: UserFactory = new UserFactory()
const createUser = userFactory.create('create')
const authenticateUser = userFactory.create('authenticate')

userRouter.post('/login', (req, res, next) =>
  authenticateUser.handle(req, res).catch(next),
)

userRouter.post('/register', (req, res, next) =>
  createUser.handle(req, res).catch(next),
)

export default userRouter
