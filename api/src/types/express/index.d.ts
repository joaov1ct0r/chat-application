import IJWT from '@Interfaces/IJwt'

declare global {
  namespace Express {
    interface Request {
      token: IJWT
    }
  }
}
