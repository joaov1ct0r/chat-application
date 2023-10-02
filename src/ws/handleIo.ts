/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import { Redis } from 'ioredis'

export default class SocketIO {
  private readonly _io: Server
  private readonly _redis: Redis
  constructor(server: httpServer, redis: Redis) {
    const io = new Server(server, {
      cors: {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST'],
      },
    })

    io.listen(Number(process.env.SOCKET_PORT))

    this._io = io
    this._redis = redis
    this.init()
  }

  sendMessage(socket: Socket): void {
    this._redis
      .lrange('messages', '0', '-1', (_err, data) => {
        data!.forEach((element) => {
          const redisString: string[] = element.split(':')

          const redisName: string = redisString[0]

          const redisMessage: string = redisString[1]

          socket.emit('messages', {
            from: redisName,
            message: redisMessage,
          })
        })
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

  init(): void {
    this._io.on('connection', async (socket) => {
      socket.broadcast.emit('new connection', {
        from: 'Server',
        message: 'Novo usuario conectado!',
      })

      socket.emit('welcome', { from: 'Server', message: 'Bem Vindo!' })

      this.sendMessage(socket)

      socket.on('new_message', async ({ from, message }) => {
        this._redis.rpush('messages', from + ' : ' + message) // eslint-disable-line
          .catch((err) => {
            if (err != null) throw new Error(err)
          })

        this._io.emit('messages', { from, message })
      })
    })
  }
}
