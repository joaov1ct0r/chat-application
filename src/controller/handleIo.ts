import { Server } from "socket.io";

import { getRedis, setRedis } from "../utils/redisConfig";

import IDataIO from "../interfaces/IDataIO";

export default function socketIO(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.broadcast.emit("new connection", {
      msg: "Novo usuario conectado",
    });

    socket.emit("welcome", { msg: "Seja bem vindo!" });

    socket.emit("messages", JSON.parse(getRedis("all")));

    socket.on("new_message", (data: IDataIO) => {
      setRedis("all", JSON.stringify(data));

      setRedis(`${data.user}`, data.msg);

      io.emit("messages", JSON.parse(getRedis("all")));
    });
  });
}
