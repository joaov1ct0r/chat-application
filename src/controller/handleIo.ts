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

    const allMessages: string[] = await redisClient.lrange("all", 0, -1);

    socket.emit("messages", allMessages);

    socket.on("new_message", async (data: IDataIO) => {
      await redisClient.rpush("all", `${data.user}:${data.msg}`);

      const allMessages: string[] = await redisClient.lrange("all", 0, -1);

      socket.emit("messages", allMessages);
    });
  });
}
