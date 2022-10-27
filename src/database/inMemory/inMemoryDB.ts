import IUser from "../../interfaces/IUser";

export default class InMemoryDB {
  private readonly users: IUser[] = [];
  public async findOneBy(email: string) {
    const user: IUser | undefined = this.users.find(
      (user) => user.email === email
    );

    if (user === undefined) {
      return null;
    } else return user;
  }
}
