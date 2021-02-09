const Joi = require('joi');

const authValidator = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .error(
            new Error('email should be a standard email')
        ),

    password: Joi.string()
        .required(),

    nombre: Joi.string()
        .required(),

    provincia: Joi.string()
        .required(),

    apellidos: Joi.string(),

    ciudad: Joi.string(),

    descripcion: Joi.string()
    /**
     * Aquí hay que meter todos los elementos not null que queramos validar,
     * como nombre, ciudad, etc.
     */
})

module.exports = {
    authValidator
}