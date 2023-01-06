import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "./middlewares/auth";
import userRouter from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import BadRequestError from "./errors/BadRequestError";
import UnathorizedError from "./errors/UnathorizedError";

export default class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();

    this.userRoutes();

    this.docsRoutes();
  }

  private async middlewares() {
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

    this.server.use(
      (
        error: BadRequestError | UnathorizedError,
        req: Request,
        res: Response
      ) => {
        if (error && error.statusCode) {
          return res.status(error.statusCode).json({
            message: error.message,
            status: error.statusCode,
          });
        }
      }
    );
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
