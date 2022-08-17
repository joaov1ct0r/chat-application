import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import auth from "./middlewares/auth";

import userRouter from "./routes/userRoutes";

import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

import path from "path";

import { fileURLToPath } from "url";

export default class App {
  public server: express.Application;

  private __filename: string = fileURLToPath(
    process.env.FILE_NAME_ENV as string
  );

  private __dirname = path.dirname(this.__filename);

  constructor() {
    this.server = express();

    this.middlewares();

    this.userRoutes();

    this.docsRoutes();
  }

  private middlewares() {
    this.server.use(cors());

    this.server.use(cookieParser());

    this.server.use(express.json());

    this.server.use(express.urlencoded({ extended: true }));

    this.server.use(
      "/",
      express.static(path.join(this.__dirname, "/view", "/login"))
    );

    this.server.use(
      "/register",
      express.static(path.join(this.__dirname, "/view", "/registro"))
    );

    this.server.use(
      "/chat",
      auth,
      express.static(path.join(this.__dirname, "/view", "/chat"))
    );
  }

  private userRoutes() {
    this.server.use("/api/user", userRouter);
  }

  private docsRoutes() {
    this.server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
