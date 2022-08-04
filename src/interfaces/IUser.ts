import { Model } from "sequelize";

export default interface IUser extends Model {
  id: number;
  nome: string;
  email: string;
  nascimento: string;
  senha: string;
}
