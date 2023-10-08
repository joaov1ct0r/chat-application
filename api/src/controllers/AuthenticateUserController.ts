import BaseController from '@Controllers/baseController'
import User from '@Database/entities/User'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default class AuthenticateUserController extends BaseController<User> {
  public async handle(req: Request, res: Response): Promise<Response> {
    const schema = this.zod.object({
      email: this.zod.string({ required_error: 'EMAIL É OBRIGATORIO' }),
      password: this.zod.string({ required_error: 'SENHA É OBRIGATORIO' }),
    })

    const data = this._validator.validate(schema, req.body)

    if (!data.success) {
      throw this.badRequest(data.error.issues[0].message)
    }

    const user: User = await this._service.execute({
      email: req.body.user,
      password: req.body.password,
    } as User)

    const token: string = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
        username: user.name,
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: '1h' },
    )

    const maxCookieAge = Date.now() + 60 * 60 * 1000 // an hour

    res.cookie('authorization', `Bearer ${token}`, {
      httpOnly: true,
      maxAge: maxCookieAge,
      sameSite: true,
      secure: true,
      domain: process.env.SERVER_HOST,
    })

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      status: 200,
      token,
      user,
    })
  }
}
