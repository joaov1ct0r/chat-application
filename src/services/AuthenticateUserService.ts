import User from "../database/entity/userModel";

import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

import UnathorizedError from "../errors/UnathorizedError";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export default class AuthenticateUserService {
  public async execute(email: string, senha: string): Promise<string> {
    const user: IUser | null = await User.findOne({
      where: { email },
    });

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const comparedPassword: boolean = bcrypt.compareSync(senha, user.senha);

    if (comparedPassword === false) {
      throw new UnathorizedError("Falha na autenticação!");
    }

    const token: string = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: 300 }
    );

    return token;
  }
}
