import { Server, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import { IIORedis } from '@Redis'

export interface IUserData {
  user: string
  message: string
}

export default class SocketIO {
  private readonly _io: Server
  private readonly _redis: IIORedis
  private readonly _mainChannel: string

  constructor(port: number, server: httpServer, redis: IIORedis) {
    this._mainChannel = 'geral'

    const io = new Server(server, {
      cors: {
        origin: ['http://localhost:80'],
        credentials: true,
        methods: ['GET', 'POST'],
        exposedHeaders: ['set-cookie'],
      },
    })

    io.listen(port)

    this._io = io
    this._redis = redis
  }

  private async get(channel: string): Promise<string> {
    const messages = await this._redis.get(channel)
    return messages
  }

  private async set(channel: string, data: IUserData[]): Promise<void> {
    await this._redis.set(channel, data)
  }

  private async publish(
    channel: string,
    from: string,
    message: string,
  ): Promise<void> {
    await this._redis.publish(channel, from, message)
  }

  private async subscribe(socket: Socket) {
    await this._redis.subscribe(this._mainChannel, (message: string) => {
      socket.emit('messages', message)
    })
  }

  private async handleConnection(socket: Socket) {
    socket.broadcast.emit('new connection', {
      from: 'Server',
      message: 'Novo usuario conectado!',
    })

    socket.emit('welcome', { from: 'Server', message: 'Bem Vindo!' })

    this.subscribe(socket)

    const messages = await this.get(this._mainChannel)
    socket.emit('messages', messages)

    socket.on('new_message', async ({ from, message }) => {
      await this.publish(this._mainChannel, from, message)

      const messages = JSON.parse(
        await this.get(this._mainChannel),
      ) as IUserData[]

      messages.push({ user: from, message })

      await this.set(this._mainChannel, messages)
    })
  }

  public init(): void {
    console.log(
      'Socket running at ' + process.env.SOCKET_HOST + process.env.SOCKET_PORT,
    )

    this._io.on('connection', async (socket) => {
      await this.handleConnection(socket)
    })
  }
}
