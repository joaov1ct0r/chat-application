import { z } from 'zod'
import { IBaseValidator } from '@Validators/baseValidator'
import { IBaseService } from '@Services/baseService'
import { Request, Response } from 'express'
import BadRequest from '@Errors/badRequest'

interface IBaseController {
  handle(req: Request, res: Response): Promise<Response>
}

export default abstract class BaseController<S> implements IBaseController {
  protected _service: IBaseService<S>
  protected _validator: IBaseValidator<S>
  protected zod: typeof z

  constructor(service: IBaseService<S>, validator: IBaseValidator<S>) {
    this._service = service
    this._validator = validator
    this.zod = z
  }

  abstract handle(req: Request, res: Response): Promise<Response>
  protected badRequest(message: string): BadRequest {
    return new BadRequest(message)
  }
}
