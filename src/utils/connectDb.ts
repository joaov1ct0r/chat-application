import DB from '../database/config/data-source'

export default class ConnectDB {
  async execute (): Promise<void> {
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
}
