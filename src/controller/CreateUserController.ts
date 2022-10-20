import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

import { registerValidate } from "../validations/validateUserData";

import ICreateUserService from "../interfaces/ICreateUserService";

import DB from "../database/config/data-source";

import IUser from "../interfaces/IUser";

import { Repository } from "typeorm";

import User from "../database/entities/User";

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

    const repository: Repository<IUser> = DB.getRepository(User);

    const createUserService: ICreateUserService = new CreateUserService(
      repository
    );

    try {
      // eslint-disable-next-line no-unused-vars
      const user: IUser = await createUserService.execute(
        email,
        name,
        nascimento,
        senha
      );

      return res.redirect(201, "/");
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
