/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import BadRequest from '@Errors/badRequest'
import Forbidden from '@Errors/forbidden'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import Unauthorized from '@Errors/unauthorized'
import IJWT from '@Interfaces/IJwt'

export default class Authorization {
  execute(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.cookies.authorization) {
        throw new BadRequest('Token não encontrado!')
      }

      const token: string = req.cookies.authorization.split(' ')[1]

      if (token.length === 0) {
        throw new BadRequest('Token não encontrado!')
      }

      jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET as string,
        {
          ignoreNotBefore: true,
        },
        (err, result) => {
          if (err) {
            if (err instanceof TokenExpiredError) {
              throw new Forbidden('Token expirado, faça login novamente!')
            } else if (err instanceof JsonWebTokenError) {
              throw new Unauthorized(err.message)
            }

            throw new Unauthorized('Erro na autenticação do token')
          }

          req.token = result as IJWT
          next()
        },
      )
    } catch (error: any) {
      if (error && error.statusCode && error.message) {
        return res
          .status(error.statusCode)
          .json({ status: error.statusCode, message: error.message })
      }

      return res.status(500).json({ message: 'Erro interno', status: 500 })
    }
  }
}
