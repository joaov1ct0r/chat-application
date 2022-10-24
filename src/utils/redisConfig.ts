import Redis from "ioredis";

const redisClient = new Redis({
  host: String(process.env.REDIS_HOST!),
  port: Number(process.env.REDIS_PORT!),
});

export default redisClient;
