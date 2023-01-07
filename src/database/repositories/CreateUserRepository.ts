import { Repository } from "typeorm";
import IUser from "../../interfaces/IUser";
import DB from "../config/data-source";
import User from "../entities/User";
import ICreateUserRepository from "../../interfaces/ICreateUserRepository";

export default class CreateUserRepository implements ICreateUserRepository {
  public readonly userRepository: Repository<IUser>;

  constructor() {
    this.userRepository = DB.getRepository(User);
  }

  async execute(email: string): Promise<IUser | null> {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }
}
