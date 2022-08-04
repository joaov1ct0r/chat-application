import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

import { registerValidate } from "../validations/validateUserData";

import ICreateUserService from "../interfaces/ICreateUserService";
import IUser from "../interfaces/IUser";

export default class CreateUserController {
  public async handle(req: Request, res: Response): Promise<void | Response> {
    const { error } = registerValidate(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const email: string = req.body.email;

    const name: string = req.body.name;

    const nascimento: string = req.body.nascimento;

    const senha: string = req.body.senha;

    const createUserService: ICreateUserService = new CreateUserService();

    try {
      // eslint-disable-next-line no-unused-vars
      const user: IUser = await createUserService.execute(
        email,
        name,
        nascimento,
        senha
      );

      return res.redirect("/");
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
