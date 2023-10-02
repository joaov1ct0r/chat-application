import Redis from 'ioredis'

const redis = new Redis({
  host: String(process.env.REDIS_HOST),
  port: Number(process.env.REDIS_PORT),
})

;(async () => {
  let retries: number = 5

  while (retries) {
    try {
      await redis.connect()

      console.log(
        `Redis connected at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      )
      break
    } catch (err) {
      console.error(err)
      retries -= 1
      console.log(`retries left: ${retries}`)
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }
})()

redis.on('error', (err) => {
  console.error('Erro no redis', err)
})

export default redis
