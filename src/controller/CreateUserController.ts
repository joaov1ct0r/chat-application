/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ValidateUser from "../validations/validateUserData";
import IUser from "../interfaces/IUser";
import BadRequestError from "../errors/BadRequestError";
import CreateUserRepository from "../database/repositories/CreateUserRepository";
import AuthenticateUserRepository from "../database/repositories/AuthenticateUserRepository";

export default class CreateUserController {
  public static async handle(
    req: Request,
    res: Response
  ): Promise<void | Response> {
    const { error } = new ValidateUser().registerValidate(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res
        .status(err.statusCode)
        .json({ error: err, status: err.statusCode });
    }

    const email: string = req.body.email;

    const name: string = req.body.name;

    const nascimento: string = req.body.nascimento;

    const senha: string = req.body.senha;

    const createUserRepository: CreateUserRepository =
      new CreateUserRepository();

    const authenticateUserRepository: AuthenticateUserRepository =
      new AuthenticateUserRepository();

    const createUserService: CreateUserService = new CreateUserService(
      authenticateUserRepository,
      createUserRepository
    );

    try {
      const user: IUser = await createUserService.execute(
        email,
        name,
        nascimento,
        senha
      );

      return res
        .status(201)
        .json({ message: "Usuario cadastrado!", status: 201, user });
    } catch (err: any) {
      return res.status(err.statusCode).json({
        error: err.message,
        status: err.statusCode,
      });
    }
  }
}
