import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import auth from "./middlewares/auth";

import userRouter from "./routes/userRoutes.js";

import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

import path from "path";

import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default class App {
  public server: express.Application;

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
      express.static(path.join(__dirname, "/view", "/login"))
    );

    this.server.use(
      "/register",
      express.static(path.join(__dirname, "/view", "/registro"))
    );

    app.use(
      "/chat",
      auth,
      express.static(path.join(__dirname, "/view", "/chat"))
    );
  }

  private userRoutes() {
    this.server.use("/api/user", userRouter);
  }

  private docsRoutes() {
    this.server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
