/* eslint-disable @typescript-eslint/no-unused-vars */
import http from 'http'
import express from 'express'
import SocketIO from './handleIo'
import redis from './redisConfig'

const app = express()
const server = http.createServer(app)
const socket = new SocketIO(server, redis)
