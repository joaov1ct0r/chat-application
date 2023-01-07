import IUser from "../interfaces/IUser";
import BadRequestError from "../errors/BadRequestError";
import ICreateUserRepository from "../interfaces/ICreateUserRepository";
import IAuthenticateUserRepository from "../interfaces/IAuthenticateUserRepository";

export default class CreateUserService {
  private readonly authenticateUserRepository: IAuthenticateUserRepository;
  private readonly createUserRepository: ICreateUserRepository;

  constructor(
    authenticateUserRepository: IAuthenticateUserRepository,
    createUserRepository: ICreateUserRepository
  ) {
    this.authenticateUserRepository = authenticateUserRepository;
    this.createUserRepository = createUserRepository;
  }

  public async execute(
    email: string,
    nome: string,
    nascimento: string,
    senha: string
  ): Promise<IUser> {
    const user: IUser | null = await this.authenticateUserRepository.execute(
      email
    );

    if (user !== null) {
      throw new BadRequestError("User ja cadastrado");
    }

    const newUser: IUser = await this.createUserRepository.execute(
      email,
      nome,
      nascimento,
      senha
    );

    return newUser;
  }
}
