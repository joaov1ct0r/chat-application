import IUser from "./IUser";

export default interface ICreateUserService {
  execute(
    email: string,
    nome: string,
    nascimento: string,
    senha: string
  ): Promise<IUser>;
}
