import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ValidateUser from "../validations/validateUserData";
import DB from "../database/config/data-source";
import IUser from "../interfaces/IUser";
import { Repository } from "typeorm";
import User from "../database/entities/User";
import BadRequestError from "../errors/BadRequestError";

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

      return res
        .status(201)
        .json({ message: "Usuario cadastrado!", status: 201 });
    } catch (err: any) {
      return res.status(err.statusCode).json({
        message: err.message,
        status: err.statusCode,
      });
    }
  }
}
