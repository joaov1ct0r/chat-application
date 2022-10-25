import { Server } from "socket.io";

import redisClient from "../utils/redisConfig";

function sendMessage(socket: any) {
  redisClient.lrange("messages", "0", "-1", (err, data) => {
    if (err) throw new Error(`Error: ${err}`);

    data!.forEach((element) => {
      const redisString: string[] = element.split(":");

      const redisName: string = redisString[0];

      const redisMessage: string = redisString[1];

      socket.emit("messages", {
        from: redisName,
        message: redisMessage,
      });
    });
  });
}

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
      from: "Server",
      message: "Novo usuario conectado!",
    });

    socket.emit("welcome", { from: "Server", message: "Bem Vindo!" });

    sendMessage(socket);

    socket.on("new_message", async ({ user, msg }) => {
      redisClient.rpush("messages", `${user}:${msg}`, (err) => {
        if (err) throw new Error(`Error: ${err}`);
      });

      io.emit("messages", { from: user, message: msg });
    });
  });
}
