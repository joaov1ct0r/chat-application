import Redis from 'ioredis'

const redisClient = new Redis({
  host: String(process.env.REDIS_HOST),
  port: Number(process.env.REDIS_PORT)
})

redisClient.connect()
  .then(() => console.log('Redis Connected!'))
  .catch((e: any) => {
    console.error('Erro ao conectar com redis', e)
    process.exit(1)
  })

redisClient.on('error', (err) => {
  console.error('Erro no redis', err)
  process.exit(1)
})

export default redisClient
