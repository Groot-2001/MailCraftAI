import * as Joi from 'joi';

export const EnvValidation = Joi.object({
    PORT: Joi.number().default(3000),

    PERPLEXITY_API_KEY: Joi.string().required(),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_NAME: Joi.string().required(),
});
