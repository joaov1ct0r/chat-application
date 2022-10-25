import { Server } from "socket.io";

import redisClient from "../utils/redisConfig";

import IDataIO from "../interfaces/IDataIO";

export default function socketIO(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.listen(3001);

  io.on("connection", async (socket) => {
    socket.broadcast.emit("new connection", {
      msg: "Novo usuario conectado",
    });

    socket.emit("welcome", { msg: "Seja bem vindo!" });

    redisClient.on("error", (err) => {
      throw new Error(err);
    });

    const allMessages: string[] = [];

    redisClient.lrange("messages", "0", "-1", (err, data) => {
      if (err) throw new Error(`Error: ${err}`);

      data!.forEach((element) => {
        allMessages.push(element);
      });
    });

    console.log(allMessages);

    socket.emit("messages", allMessages);

    socket.on("new_message", async (data: IDataIO) => {
      await redisClient.rpush("messages", `${data.user}:${data.msg}`, (err) => {
        if (err) throw new Error(`Error: ${err}`);
      });

      const allMessages: string[] = [];

      redisClient.lrange("messages", "0", "-1", (err, data) => {
        if (err) throw new Error(`Error: ${err}`);

        data!.forEach((element) => {
          allMessages.push(element);
        });
      });

      console.log(allMessages);

      socket.emit("messages", allMessages);
    });
  });
}
