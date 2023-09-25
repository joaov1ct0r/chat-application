import IUser from '@Interfaces/IUser'
import BaseService from './baseService'
import bcrypt from 'bcryptjs'

export default class CreateUserService<S extends IUser> extends BaseService<S> {
  public async execute(item: S): Promise<S> {
    const isEmailRegistered: S | null = await this._DAO.findOne(
      'email',
      item.email,
    )

    if (isEmailRegistered) {
      throw this.badRequest('Email já cadastrado!')
    }

    const saltRound: number = 12
    item.password = bcrypt.hashSync(item.password, saltRound)

    const user: S = await this._DAO.create(item)

    return user
  }
}
