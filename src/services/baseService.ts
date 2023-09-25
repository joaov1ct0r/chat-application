import BadRequest from '@Errors/badRequest'
import Forbidden from '@Errors/forbidden'
import Unauthorized from '@Errors/unauthorized'
import IJWT from '@Interfaces/IJwt'
import { IBaseRepository } from '@Database/repositories/baseRepository'

export interface IBaseService<S> {
  execute(item: S, token?: IJWT): Promise<S>
}

export default abstract class BaseService<S> implements IBaseService<S> {
  protected _DAO: IBaseRepository<S>

  constructor(dao: IBaseRepository<S>) {
    this._DAO = dao
  }

  public abstract execute(item: S, token?: IJWT): Promise<S>

  protected forbidden(message: string): Forbidden {
    return new Forbidden(message)
  }

  protected badRequest(message: string): BadRequest {
    return new BadRequest(message)
  }

  protected unauthorized(message: string): Unauthorized {
    return new Unauthorized(message)
  }
}
