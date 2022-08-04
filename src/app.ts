import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import userRouter from "./routes/userRoutes.js";

import socketIO from "./controller/handleIo.js";

import path from "path";

import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default class App {
  public server: express.Application;

  private middlewares() {
    this.server.use(express.json());
  }
}

const app = express();

app.use("/api", router);

app.use("/", express.static(path.join(__dirname, "/view", "/login")));

app.use(
  "/register",
  express.static(path.join(__dirname, "/view", "/registro"))
);

app.use(
  "/chat",
  cookieParser(),
  authController,
  express.static(path.join(__dirname, "/view", "/chat"))
);

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log("Server running");
});

handleIo(server);
