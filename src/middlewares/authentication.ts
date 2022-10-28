import IUser from "../interfaces/IUser";

import User from "../database/entities/User";

import DB from "../database/config/data-source";

import { Repository } from "typeorm";

import { Strategy } from "passport-local";

import bcrypt from "bcryptjs";

export default function (passport) {
  const repository: Repository<IUser> = DB.getRepository(User);

  passport.serializeUser((user: IUser, done: Function) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: IUser["id"], done: Function) => {
    try {
      const user: IUser | null = await repository.findOneBy({
        id,
      });

      done(null, user);
    } catch (error: any) {
      console.error(error);
      done(null, error);
    }
  });

  passport.use(
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user: IUser | null = await repository.findOneBy({
            email,
          });

          if (user === null) return done(null, false);

          const isValid: boolean = bcrypt.compareSync(password, user.senha);

          if (!isValid) return done(null, false);

          return done(null, user);
        } catch (error: any) {
          console.error(error);
          return done(error, false);
        }
      }
    )
  );
}
