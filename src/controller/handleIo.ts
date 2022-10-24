import { Server } from "socket.io";

import { getRedis, setRedis } from "../utils/redisConfig";

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

    const allMessages: string | null | undefined = await getRedis("all");

    socket.emit("messages", JSON.parse(allMessages as string));

    socket.on("new_message", async (data: IDataIO) => {
      await setRedis("all", JSON.stringify(data));

      const allMessages: string | null | undefined = await getRedis("all");

      io.emit("messages", JSON.parse(allMessages as string));
    });
  });
}
