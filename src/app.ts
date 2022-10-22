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
    this.server.use(
      cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST"],
      })
    );

    this.server.use(cookieParser());

    this.server.use(express.json());

    this.server.use(express.urlencoded({ extended: true }));
  }

  private userRoutes() {
    this.server.use("/api/user", userRouter);

    this.server.use(
      "/",
      process.env.NODE_ENV === "production"
        ? express.static("build/views/login")
        : express.static("src/views/login")
    );

    this.server.use(
      "/register",
      process.env.NODE_ENV === "production"
        ? express.static("build/views/registro")
        : express.static("src/views/registro")
    );

    this.server.use(
      "/chat",
      auth,
      process.env.NODE_ENV === "production"
        ? express.static("build/views/chat")
        : express.static("src/views/chat")
    );
  }

  private docsRoutes() {
    this.server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
