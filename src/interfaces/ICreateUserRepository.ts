import IUser from './IUser'

export default interface ICreateUserRepository {
  execute: (
    email: string,
    nome: string,
    nascimento: string,
    senha: string
  ) => Promise<IUser>
}
