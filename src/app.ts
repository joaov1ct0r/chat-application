import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import Authorization from './middlewares/auth'
import userRouter from './routes/userRoutes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
import BadRequestError from './errors/BadRequestError'
import UnathorizedError from './errors/UnauthorizedError'
import InternalError from './errors/InternalError'
import ForbiddenError from './errors/ForbiddenError'

export default class App {
  public readonly server: express.Application

  constructor () {
    this.server = express()

    this.middlewares().catch((err: any) => {
      console.error('Erro em middleware', err)
      process.exit(1)
    })

    this.routes().catch((err: any) => {
      console.error('Erro em routes', err)
      process.exit(1)
    })
  }

  private async middlewares (): Promise<void> {
    this.server.use(
      cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST']
      })
    )

    this.server.use(cookieParser())

    this.server.use(express.json())

    this.server.use(express.urlencoded({ extended: true }))

    this.server.use(
      (
        error:
        | BadRequestError
        | UnathorizedError
        | ForbiddenError
        | InternalError,
        req: Request,
        res: Response
      ) => {
        if (error !== undefined) {
          return res.status(error.statusCode).json({
            message: error.message,
            status: error.statusCode
          })
        }
        return res.status(500).json({
          message: 'Internal Server error',
          statusCode: 500
        })
      }
    )
  }

  private async routes (): Promise<void> {
    this.server.use('/api/user', userRouter)

    this.server.use(
      '/',
      process.env.NODE_ENV === 'production'
        ? express.static('build/views/login')
        : express.static('src/views/login')
    )

    this.server.use(
      '/register',
      process.env.NODE_ENV === 'production'
        ? express.static('build/views/registro')
        : express.static('src/views/registro')
    )

    this.server.use(
      '/chat',
      new Authorization().handle,
      process.env.NODE_ENV === 'production'
        ? express.static('build/views/chat')
        : express.static('src/views/chat')
    )

    this.server.use(
      '/api/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs)
    )
  }
}
