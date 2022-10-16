import "reflect-metadata";

import "dotenv/config";

import App from "./app";

import socketIO from "./controller/handleIo";

import DB from "./database/config/data-source";

new App().server.listen(
  Number(process.env.SERVER_PORT!),
  String(process.env.SERVER_HOST!),
  async () => {
    console.log("Server running");

    let retries: number = 5;

    while (retries) {
      try {
        await DB.initialize();

        console.log("DB Connected");

        socketIO();

        break;
      } catch (error: any) {
        console.log(error);

        retries -= 1;

        console.log(`retries left ${retries}!`);

        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
);
