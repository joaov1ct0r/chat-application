/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "reflect-metadata";
import "dotenv/config";
import App from "./app";
import socketIO from "./controller/handleIo";
import DB from "./database/config/data-source";

const server = new App().server.listen(
  Number(process.env.SERVER_PORT!),
  String(process.env.SERVER_HOST!),
  async () => {
    let retries = 5;

    while (retries) {
      try {
        await DB.initialize();

        console.log("DB Connected");

        console.log("Server running");

        break;
      } catch (error: unknown) {
        console.log(error);

        retries -= 1;

        console.log(`retries left ${retries}!`);

        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
);

socketIO(server);
