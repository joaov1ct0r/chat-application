import IUser from "./IUser";

export default interface IAuthenticateUserRepository {
  execute(email: string): Promise<IUser | null>;
}
