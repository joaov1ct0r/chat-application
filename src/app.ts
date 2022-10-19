import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import auth from "./middlewares/auth";

import userRouter from "./routes/userRoutes";

import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

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
  }

  private userRoutes() {
    this.server.use("/api/user", userRouter);

    this.server.use("/", express.static("build/views/login"));

    this.server.use("/register", express.static("build/views/registro"));

    this.server.use("/chat", auth, express.static("build/views/chat"));
  }

  private docsRoutes() {
    this.server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
