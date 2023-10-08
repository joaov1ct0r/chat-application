import Redis, { Callback } from 'ioredis'
import { IRedisData } from './socket'

export interface IIORedis {
  set(channel: string, data: IRedisData[]): Promise<void>
  get(channel: string): Promise<string>
  publish(channel: string, user: string, message: string): Promise<void>
  subscribe(
    subscribedChannel: string,
    callback: Callback<unknown>,
  ): Promise<void>
}

export default class IORedis implements IIORedis {
  private readonly _redis: Redis

  constructor(host: string, port: number) {
    this._redis = new Redis({
      host,
      port,
    })

    this.connect()
  }

  public async set(channel: string, data: IRedisData[]): Promise<void> {
    await this._redis.set(channel, JSON.stringify(data), (error) => {
      if (error) {
        throw new Error(`Erro no redis - ${error}`)
      }
    })
  }

  public async get(channel: string): Promise<string> {
    const messages = await this._redis.get(channel, (error, result) => {
      if (error) {
        throw new Error(`Erro no redis - ${error}`)
      }

      if (result === null || result === undefined) {
        return JSON.stringify([])
      }

      return result
    })

    return messages as string
  }

  private async connect() {
    let retries: number = 5

    while (retries) {
      try {
        await this._redis.connect()

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
  }

  public async publish(
    channel: string,
    user: string,
    message: string,
  ): Promise<void> {
    await this._redis.publish(
      channel,
      JSON.stringify({
        user,
        message,
      }),
      (error) => {
        if (error) {
          throw new Error(`Erro no redis - ${error}`)
        }
      },
    )
  }

  public async subscribe(
    subscribedChannel: string,
    callback: Callback<unknown>,
  ): Promise<void> {
    await this._redis.subscribe(subscribedChannel, (error, message) => {
      if (error) {
        throw new Error(`Erro no redis - ${error}`)
      }

      callback(null, message)
    })
  }
}
