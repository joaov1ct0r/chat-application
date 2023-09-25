/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'socket.io'
import redisClient from '../utils/redisConfig'

export default class SocketIO {
  sendMessage (socket: any): void {
    redisClient.lrange('messages', '0', '-1', (_err, data) => {
      data!.forEach((element) => {
        const redisString: string[] = element.split(':')

        const redisName: string = redisString[0]

        const redisMessage: string = redisString[1]

        socket.emit('messages', {
          from: redisName,
          message: redisMessage
        })
      })
    }).catch((err) => {
      throw new Error(err)
    })
  }

  socketServer (server: any): void {
    const io = new Server(server, {
      cors: {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST']
      }
    })

    io.listen(3001)

    io.on('connection', async (socket) => {
      socket.broadcast.emit('new connection', {
        from: 'Server',
        message: 'Novo usuario conectado!'
      })

      socket.emit('welcome', { from: 'Server', message: 'Bem Vindo!' })

      this.sendMessage(socket)

      socket.on('new_message', async ({ from, message }) => {
        redisClient.rpush('messages', from + ' : ' + message) // eslint-disable-line
          .catch((err) => {
            if (err != null) throw new Error(err)
          })

        io.emit('messages', { from, message })
      })
    })
  }
}
