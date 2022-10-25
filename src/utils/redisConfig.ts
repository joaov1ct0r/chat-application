import Redis from "ioredis";

const redisClient = new Redis({
  host: String(process.env.REDIS_HOST!),
  port: Number(process.env.REDIS_PORT!),
});

redisClient.connect(() => {
  console.log("Redis Connected!");
});

redisClient.on("error", (err) => {
  throw new Error(err);
});

export default redisClient;
