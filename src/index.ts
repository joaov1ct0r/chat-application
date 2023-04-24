import 'reflect-metadata'
import 'dotenv/config'
import App from './app'
import SocketIO from './controller/handleIo'
import DB from './database/config/data-source'

const connect = async (): Promise<void> => {
  let retries = 5

  while (retries > 0) {
    try {
      await DB.initialize()

      console.log('DB Connected')

      console.log('Server running')

      break
    } catch (error) {
      console.log(error)

      retries -= 1

      console.log(`retries left ${retries}!`)

      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }
}

const server = new App().server.listen(
  Number(process.env.SERVER_PORT),
  String(process.env.SERVER_HOST),
  () => {
    connect().catch((error) => {
      console.log(error)
      console.log('Não foi possível se conectar ao DB')
    })
  }
)

new SocketIO().socketServer(server)
