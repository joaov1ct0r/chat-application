import { Server } from "socket.io";

import { getRedis, setRedis } from "../utils/redisConfig";

export default function socketIO(server) {
  const io = new Server(server);

  const messages: Object[] = [];

  io.on("connection", (socket) => {
    socket.broadcast.emit("new connection", {
      msg: "Novo usuario conectado",
    });

    socket.emit("welcome", { msg: "Seja bem vindo!" });

    socket.emit("messages", messages);

    socket.on("new_message", (data: Object) => {
      messages.push(data);

      io.emit("messages", messages);
    });
  });
}
