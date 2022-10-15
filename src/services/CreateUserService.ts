import IUser from "../interfaces/IUser";

import bcrypt from "bcryptjs";

import BadRequestError from "../errors/BadRequestError";

import { Repository } from "typeorm";

export default class CreateUserService {
  private readonly repository: Repository<IUser>;

  constructor(repository: Repository<IUser>) {
    this.repository = repository;
  }

  public async execute(
    email: string,
    nome: string,
    nascimento: string,
    senha: string
  ): Promise<IUser> {
    const user: IUser | null = await this.repository.findOneBy({
      email,
    });

    if (user !== null) {
      throw new BadRequestError("User ja cadastrado");
    }

    const newUser: IUser = this.repository.create({
      email,
      nome,
      nascimento,
      senha: bcrypt.hashSync(senha),
    });

    await this.repository.save(newUser);

    return newUser;
  }
}
