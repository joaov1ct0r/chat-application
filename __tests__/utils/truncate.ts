import DB from "../../src/database/config/data-source";

import User from "../../src/database/entities/User";

import IUser from "../../src/interfaces/IUser";

import { Repository } from "typeorm";

export default async function truncate(): Promise<void> {
  const repository: Repository<IUser> = DB.getRepository(User);

  return await repository.clear();
}
