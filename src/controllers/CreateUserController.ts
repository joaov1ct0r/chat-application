/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import ValidateUser from '../validators/validateUserData'
import IUser from '../interfaces/IUser'
import BadRequestError from '../errors/BadRequestError'
import CreateUserRepository from '../database/repositories/CreateUserRepository'
import AuthenticateUserRepository from '../database/repositories/AuthenticateUserRepository'

export default class CreateUserController {
  private readonly createUserRepository: CreateUserRepository
  private readonly authenticateUserRepository: AuthenticateUserRepository
  private readonly createUserService: CreateUserService
  private readonly validateUser: ValidateUser

  constructor () {
    this.validateUser = new ValidateUser()
    this.createUserRepository = new CreateUserRepository()
    this.authenticateUserRepository = new AuthenticateUserRepository()
    this.createUserService = new CreateUserService(
      this.authenticateUserRepository,
      this.createUserRepository
    )
  }

  public async handle (
    req: Request,
    res: Response
  ): Promise<Response> {
    const { error } = this.validateUser.registerValidate(req.body)

    if (error != null) {
      const err = new BadRequestError(error.message)

      return res
        .status(err.statusCode)
        .json({ error: err, status: err.statusCode })
    }

    const email: string = req.body.email

    const name: string = req.body.name

    const nascimento: string = req.body.nascimento

    const senha: string = req.body.senha

    try {
      const user: IUser = await this.createUserService.execute(
        email,
        name,
        nascimento,
        senha
      )

      return res
        .status(201)
        .json({ message: 'Usuario cadastrado!', status: 201, user })
    } catch (err: any) {
      return res.status(err.statusCode).json({
        error: err.message,
        status: err.statusCode
      })
    }
  }
}
