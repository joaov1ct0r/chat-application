import 'dotenv/config'
import IUser from '../interfaces/IUser'
import BadRequestError from '../errors/BadRequestError'
import UnathorizedError from '../errors/UnauthorizedError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import IAuthenticateUserRepository from '../interfaces/IAuthenticateUserRepository'

export default class AuthenticateUserService {
  private readonly repository: IAuthenticateUserRepository

  constructor (repository: IAuthenticateUserRepository) {
    this.repository = repository
  }

  public async execute (email: string, senha: string): Promise<string> {
    const user: IUser | null = await this.repository.execute(email)

    if (user === null) {
      throw new BadRequestError('Usuario não encontrado!')
    }

    const comparedPassword: boolean = bcrypt.compareSync(senha, user.senha)

    if (!comparedPassword) {
      throw new UnathorizedError('Falha na autenticação!')
    }

    const token: string = jwt.sign(
      {
        id: user.id
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: 300 }
    )

    return token
  }
}
