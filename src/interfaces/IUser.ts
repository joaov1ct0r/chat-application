import User from "../database/entities/User";

export default interface IUser extends User {
  id: number;
  nome: string;
  email: string;
  nascimento: string;
  senha: string;
}
