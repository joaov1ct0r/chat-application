import { z } from 'zod'
import { IBaseValidator } from '@Validators/baseValidator'
import { IBaseService } from '@Services/baseService'

interface IBaseController<S> {
  handle(item: S): Promise<S>
}

export default abstract class BaseController<S> implements IBaseController<S> {
  protected _service: IBaseService<S>
  protected _validator: IBaseValidator<S>
  private zod: typeof z

  constructor(service: IBaseService<S>, validator: IBaseValidator<S>) {
    this._service = service
    this._validator = validator
    this.zod = z
  }

  abstract handle(item: S): Promise<S>
}
