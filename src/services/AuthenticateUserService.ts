import User from '@Database/entities/User'
import BaseService from './baseService'
import bcrypt from 'bcryptjs'

export default class AuthenticateUserService<
  S extends User,
> extends BaseService<S> {
  public async execute(item: S): Promise<S> {
    const isUserRegistered: S | null = await this._DAO.findOne(
      'email',
      item.email,
    )

    if (!isUserRegistered) {
      throw this.badRequest('Usuário não cadastrado!')
    }

    const isPasswordsMatching: boolean = bcrypt.compareSync(
      item.password,
      isUserRegistered.password,
    )

    if (!isPasswordsMatching) {
      throw this.badRequest('Falha na autenticação!')
    }

    return isUserRegistered
  }
}
