import User from "../database/entities/User";

import IUser from "../interfaces/IUser";

import bcrypt from "bcryptjs";

import BadRequestError from "../errors/BadRequestError";

export default class CreateUserService {
  public async execute(
    email: string,
    nome: string,
    nascimento: string,
    senha: string
  ): Promise<IUser> {
    const user: IUser | null = await User.findOne({
      where: { email },
    });

    if (user === null) {
      throw new BadRequestError("Email ja cadastrado");
    }

    const newUser: IUser = await User.create({
      email,
      nome,
      nascimento,
      senha: bcrypt.hashSync(senha),
    });

    return newUser;
  }
}
