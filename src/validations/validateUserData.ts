import Joi from "@hapi/joi";

const registerValidate = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100),
    name: Joi.string().required().min(10).max(100),
    nascimento: Joi.string().required().min(10).max(10),
    senha: Joi.string().required().min(8).max(250),
  });

  return schema.validate(data);
};

const loginValidate = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    email: Joi.string().required().min(10).max(100),
    senha: Joi.string().required().min(8).max(250),
  });

  return schema.validate(data);
};

export { loginValidate, registerValidate };
