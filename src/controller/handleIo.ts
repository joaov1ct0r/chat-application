import { Server } from "socket.io";

import { getRedis, setRedis } from "../utils/redisConfig";

export default function socketIO(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.broadcast.emit("new connection", {
      msg: "Novo usuario conectado",
    });

    socket.emit("welcome", { msg: "Seja bem vindo!" });

    socket.emit("messages", JSON.parse(getRedis("all")));

    socket.on("new_message", (data: Object) => {
      setRedis("all", JSON.stringify(data));

      io.emit("messages", JSON.parse(getRedis("all")));
    });
  });
}
