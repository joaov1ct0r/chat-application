import Joi from "@hapi/joi";

export default class ValidateUser {
  registerValidate(data: object): Joi.ValidationResult {
    const schema: Joi.ObjectSchema<object> = Joi.object({
      email: Joi.string().required().min(10).max(100),
      name: Joi.string().required().min(10).max(100),
      nascimento: Joi.string().required().min(10).max(10),
      senha: Joi.string().required().min(8).max(250),
    });

    return schema.validate(data);
  }

  loginValidate(data: object): Joi.ValidationResult {
    const schema: Joi.ObjectSchema<object> = Joi.object({
      email: Joi.string().required().min(10).max(100),
      senha: Joi.string().required().min(8).max(250),
    });

    return schema.validate(data);
  }
}
