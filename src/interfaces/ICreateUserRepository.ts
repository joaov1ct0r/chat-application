import IUser from "./IUser";

export default interface ICreateUserRepository {
  execute(email: string): Promise<IUser | null>;
}
