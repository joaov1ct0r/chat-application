import "reflect-metadata";

import "dotenv/config";

import App from "./app";

import socketIO from "./controller/handleIo";

const server = new App().server.listen(process.env.SERVER_PORT, () => {
  console.log("Server running");
});

socketIO(server);
