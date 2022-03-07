import Joi from '@hapi/joi';

let userValidate = {
    registerValidate(data) {
        const schema = Joi.object({
            email: Joi.string().required().min(10).max(100),
            nome: Joi.string().required().min(10).max(100),
            nascimento: Joi.string().required().min(10).max(10),
            senha: Joi.string().required().min(8).max(250)
        });

        return schema.validate(data);
    },

    loginValidate(data) {
        const schema = Joi.object({
            email: Joi.string().required().min(10).max(100),
            senha: Joi.string().required().min(8).max(250)
        });

        return schema.validate(data);
    }
};

export default userValidate;
