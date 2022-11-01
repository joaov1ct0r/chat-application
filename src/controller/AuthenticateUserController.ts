import { Request, Response } from "express";

import { loginValidate } from "../validations/validateUserData";

import AuthenticateUserService from "../services/AuthenticateUserService";

import IAuthenticateUserService from "../interfaces/IAuthenticateUserService";

import DB from "../database/config/data-source";

import { Repository } from "typeorm";

import User from "../database/entities/User";

import IUser from "../interfaces/IUser";
import BadRequestError from "../errors/BadRequestError";
import UnathorizedError from "../errors/UnathorizedError";

export default class AuthenticateUserController {
  public async handle(req: Request, res: Response): Promise<void | Response> {
    const { error } = loginValidate(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const email: string = req.body.email;

    const senha: string = req.body.senha;

    const repository: Repository<IUser> = DB.getRepository(User);

    const authenticateUserService: IAuthenticateUserService =
      new AuthenticateUserService(repository);

    try {
      const token: string = await authenticateUserService.execute(email, senha);

      res.cookie("authorization", `Bearer ${token}`, {
        httpOnly: true,
        path: "/chat",
      });

      return res
        .status(200)
        .json({ message: "Login realizado com sucesso!", status: 200 });
    } catch (err: any) {
      if (err instanceof BadRequestError) res.status(400);
      else if (err instanceof UnathorizedError) res.status(401);
      else res.status(500);
      return res.json({
        message: err.message,
        status: err.statusCode,
      });
    }
  }
}
