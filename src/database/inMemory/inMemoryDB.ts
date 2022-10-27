import IUser from "../../interfaces/IUser";

import bcrypt from "bcryptjs";

import { v4 as uuid } from "uuid";

export default class InMemoryDB {
  private readonly users: IUser[] = [];
  public findOneBy(email: string): IUser | null {
    const user: IUser | undefined = this.users.find(
      (user) => user.email === email
    );

    if (user === undefined) {
      return null;
    } else return user;
  }

  public create({ nome, email, nascimento, senha }: IUser) {
    const user: IUser | null = this.findOneBy(email);

    if (user !== null) return;

    this.users.push({
      id: Number(uuid()),
      nome,
      email,
      nascimento,
      senha: bcrypt.hashSync(senha),
    } as IUser);

    this.save();

    return this.users.find((user) => user.email === email);
  }

  public save(): void {
    console.log("!");
  }
}
