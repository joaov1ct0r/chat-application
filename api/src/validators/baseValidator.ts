import { SafeParseReturnType, ZodObject, ZodRawShape } from 'zod'

export interface IBaseValidator<T> {
  validate(
    schema: ZodObject<ZodRawShape>,
    data: object,
  ): SafeParseReturnType<T, object>
}

export default abstract class BaseValidator<T> implements IBaseValidator<T> {
  validate(
    schema: ZodObject<ZodRawShape>,
    data: object,
  ): SafeParseReturnType<T, object> {
    const result = schema.safeParse(data)

    return result as SafeParseReturnType<T, object>
  }
}
