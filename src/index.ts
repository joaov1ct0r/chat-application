import 'reflect-metadata'
import 'dotenv/config'
import App from './app'
import ConnectDB from './utils/connectDb'

const db = new ConnectDB()
new App().server.listen(
  Number(process.env.SERVER_PORT),
  String(process.env.SERVER_HOST),
  () => {
    db.execute().catch((error) => {
      console.log(error)
      console.log('Não foi possível se conectar ao DB')
    })
  }
)
