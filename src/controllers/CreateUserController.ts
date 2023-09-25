import BaseController from './baseController'
import { Request, Response } from 'express'
import IUser from '@Interfaces/IUser'

export default class CreateUserController extends BaseController<IUser> {
  public async handle(req: Request, res: Response): Promise<Response> {
    const schema = this.zod.object({
      email: this.zod
        .string({ required_error: 'EMAIL É OBRIGATÓRIO' })
        .min(1, { message: 'EMAIL DEVE CONTER NO MÍNIMO 1 LETRA' }),
      name: this.zod
        .string({ required_error: 'NOME É OBRIGATÓRIO' })
        .min(1, { message: 'NOME DEVE CONTER NO MÍNIMO 1 LETRA' }),
      dateBirth: this.zod.string({
        required_error: 'DATA DE NASCIMENTO É OBRIGATÓRIA',
      }),
      password: this.zod
        .string({ required_error: 'SENHA É OBRIGATÓRIA' })
        .min(1, { message: 'SENHA DEVE CONTER NO MÍNIMO 1 LETRA' }),
    })

    const data = this._validator.validate(schema, req.body)

    if (!data.success) {
      throw this.badRequest(data.error.issues[0].message)
    }

    const user = await this._service.execute(
      {
        dateBirth: req.body.dateBirth,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      } as IUser,
      { ...req.token },
    )

    return res
      .status(201)
      .json({ user, status: 201, message: 'Usuário criado com sucesso!' })
  }
}
