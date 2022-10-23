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

    // socket.emit("messages", JSON.parse(String(getRedis("all"))));

    const allMessages: string = (await getRedis("all")) as unknown as string;

    socket.emit("messages", JSON.parse(allMessages));

    socket.on("new_message", async (data: IDataIO) => {
      setRedis("all", JSON.stringify(data));

      setRedis(`${data.user}`, data.msg);

      // io.emit("messages", JSON.parse(String(getRedis("all"))));

      const allMessages: string = (await getRedis("all")) as unknown as string;

      io.emit("messages", JSON.parse(allMessages));
    });
  });
}
