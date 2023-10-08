import 'reflect-metadata'
import App from '@App'
import databaseClient from '@Database/config/data-source'

new App().server.listen(
  Number(process.env.SERVER_PORT),
  String(process.env.SERVER_HOST),
  async () => {
    let retries = 5

    while (retries > 0) {
      try {
        await databaseClient.initialize()
        console.log('DB Connected!!')
        console.log(
          `Server running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
        )
        break
      } catch (error) {
        console.log(error)
        retries -= 1
        console.log(`retries left ${retries}!`)
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
    }
  },
)
