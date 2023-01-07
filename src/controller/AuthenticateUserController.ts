import { Request, Response } from "express";
import { loginValidate } from "../validations/validateUserData";
import AuthenticateUserService from "../services/AuthenticateUserService";
import DB from "../database/config/data-source";
import { Repository } from "typeorm";
import User from "../database/entities/User";
import IUser from "../interfaces/IUser";
import BadRequestError from "../errors/BadRequestError";

export default class AuthenticateUserController {
  public async handle(req: Request, res: Response): Promise<void | Response> {
    const { error } = loginValidate(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
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
      return res.status(err.statusCode).json({
        message: err.message,
        status: err.statusCode,
      });
    }
  }
}
