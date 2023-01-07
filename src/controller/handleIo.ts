/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "socket.io";
import redisClient from "../utils/redisConfig";

export default class SocketIO {
  sendMessage(socket: any) {
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

  socketServer(server: any) {
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

      this.sendMessage(socket);

      socket.on("new_message", async ({ from, message }) => {
        redisClient.rpush("messages", `${from}:${message}`, (err) => {
          if (err) throw new Error(`Error: ${err}`);
        });

        io.emit("messages", { from, message });
      });
    });
  }
}
