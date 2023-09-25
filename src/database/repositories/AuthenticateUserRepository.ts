import { Repository } from 'typeorm'
import IAuthenticateUserRepository from '../../interfaces/IAuthenticateUserRepository'
import IUser from '../../interfaces/IUser'
import DB from '../config/data-source'
import User from '../entities/User'

export default class AuthenticateUserRepository
implements IAuthenticateUserRepository {
  private readonly userRepository: Repository<IUser>

  constructor () {
    this.userRepository = DB.getRepository(User)
  }

  async execute (email: string): Promise<IUser | null> {
    const user = await this.userRepository.findOneBy({ email })
    return user
  }
}
