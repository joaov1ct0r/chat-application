export default interface IAuthenticateUserService {
  execute(email: string, senha: string): Promise<string>;
}
