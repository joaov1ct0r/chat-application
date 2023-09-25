import { Repository } from 'typeorm'
import IUser from '../../interfaces/IUser'
import DB from '../config/data-source'
import User from '../entities/User'
import ICreateUserRepository from '../../interfaces/ICreateUserRepository'
import bcrypt from 'bcryptjs'

export default class CreateUserRepository implements ICreateUserRepository {
  private readonly userRepository: Repository<IUser>

  constructor () {
    this.userRepository = DB.getRepository(User)
  }

  async execute (
    email: string,
    nome: string,
    nascimento: string,
    senha: string
  ): Promise<IUser> {
    const user: IUser = this.userRepository.create({
      email,
      nome,
      nascimento,
      senha: bcrypt.hashSync(senha)
    })

    await this.userRepository.save(user)
    return user
  }
}
