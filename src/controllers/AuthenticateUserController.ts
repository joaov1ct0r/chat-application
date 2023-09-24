/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import ValidateUser from '../validators/validateUserData'
import AuthenticateUserService from '../services/AuthenticateUserService'
import BadRequestError from '../errors/BadRequestError'
import AuthenticateUserRepository from '../database/repositories/AuthenticateUserRepository'

export default class AuthenticateUserController {
  private readonly repository: AuthenticateUserRepository
  private readonly validateUser: ValidateUser
  private readonly authenticateUserService: AuthenticateUserService

  constructor () {
    this.repository = new AuthenticateUserRepository()
    this.validateUser = new ValidateUser()
    this.authenticateUserService = new AuthenticateUserService(this.repository)
  }

  public async handle (
    req: Request,
    res: Response
  ): Promise<Response> {
    const { error } = this.validateUser.loginValidate(req.body)

    if (error != null) {
      const err = new BadRequestError(error.message)

      return res.status(err.statusCode).json({ error, status: err.statusCode })
    }

    const email: string = req.body.email

    const senha: string = req.body.senha

    try {
      const token: string = await this.authenticateUserService.execute(email, senha)

      res.cookie('authorization', `Bearer ${token}`, {
        httpOnly: true,
        path: '/chat'
      })

      return res
        .status(200)
        .json({ message: 'Login realizado com sucesso!', status: 200 })
    } catch (err: any) {
      return res.status(err.statusCode).json({
        error: err.message,
        status: err.statusCode
      })
    }
  }
}
