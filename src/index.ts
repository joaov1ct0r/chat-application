import "reflect-metadata";

import "dotenv/config";

import App from "./app";

import socketIO from "./controller/handleIo";

import DB from "./data-source";

const server = new App().server.listen(process.env.SERVER_PORT, async () => {
  console.log("Server running");

  let retries: number = 5;

  while (retries) {
    try {
      await DB.initialize();

      console.log("DB Connected");

      break;
    } catch (error: any) {
      console.log(error);

      retries -= 1;

      console.log(`retries left ${retries}!`);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
});

socketIO(server);
