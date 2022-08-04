import { Request, Response } from "express";

import { loginValidate } from "../validations/validateUserData";

import AuthenticateUserService from "../services/AuthenticateUserService";

import IAuthenticateUserService from "../interfaces/IAuthenticateUserService";

export default class AuthenticateUserController {
  public async handle(req: Request, res: Response): Promise<void | Response> {
    const { error } = loginValidate(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const email: string = req.body.email;

    const senha: string = req.body.senha;

    const authenticateUserService: IAuthenticateUserService =
      new AuthenticateUserService();

    try {
      const token: string = await authenticateUserService.execute(email, senha);

      res.cookie("authorization", `Bearer ${token}`, { httpOnly: true });

      return res.redirect("/chat");
    } catch (err: any) {
      return res.status(err.message).json({ error: err.message });
    }
  }
}
