import http from 'http'
import express from 'express'
import SocketIO from '@Socket'
import IORedis from '@Redis'

const app = express()
const server = http.createServer(app)
const redis = new IORedis(
  String(process.env.REDIS_HOST),
  Number(process.env.REDIS_PORT),
)
const socket = new SocketIO(Number(process.env.SOCKET_PORT), server, redis)
socket.init()
