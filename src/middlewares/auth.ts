import { Response, NextFunction } from 'express'
import IReq from '../interfaces/IRequest'
import jwt from 'jsonwebtoken'
import IJwt from '../interfaces/IJwt'
import BadRequestError from '../errors/BadRequestError'
import ForbiddenError from '../errors/ForbiddenError'

export default class Authorization {
  handle (req: IReq, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined {
    const token: string = req.cookies.authorization.split(' ')[1]

    if (token.length === 0) {
      const error = new BadRequestError('Token não encontrado!')

      return res
        .status(error.statusCode)
        .json({ error: error.message, status: error.statusCode })
    }

    try {
      const verifiedToken: IJwt = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET as string
      ) as IJwt

      req.userId = verifiedToken.id
      next()
    } catch (err: unknown) {
      const error = new ForbiddenError('Falha na autenticação!')
      return res
        .status(error.statusCode)
        .json({ error: error.message, status: error.statusCode })
    }
  }
}
