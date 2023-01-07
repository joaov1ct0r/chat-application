/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { loginValidate } from "../validations/validateUserData";
import AuthenticateUserService from "../services/AuthenticateUserService";
import BadRequestError from "../errors/BadRequestError";
import AuthenticateUserRepository from "../database/repositories/AuthenticateUserRepository";

export default class AuthenticateUserController {
  public async handle(req: Request, res: Response): Promise<void | Response> {
    const { error } = loginValidate(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const email: string = req.body.email;

    const senha: string = req.body.senha;

    const repository: AuthenticateUserRepository =
      new AuthenticateUserRepository();

    const authenticateUserService: AuthenticateUserService =
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
