import Redis, { RedisKey } from "ioredis";

import { promisify } from "util";

const redisClient = new Redis({
  host: String(process.env.REDIS_HOST!),
  port: Number(process.env.REDIS_PORT!),
});

const getRedis = (
  key: RedisKey,
  start: string | number,
  stop: string | number
) => {
  const syncGetRedis = promisify(redisClient.lrange).bind(redisClient);

  return syncGetRedis(key, start, stop);
};

const setRedis = (key: RedisKey, value: string) => {
  const syncSetRedis = promisify(redisClient.rpush).bind(redisClient);

  return syncSetRedis(key, value);
};

export { redisClient, getRedis, setRedis };
