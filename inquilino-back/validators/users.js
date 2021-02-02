const Joi = require('joi');

const userValidator = Joi.object({
    nombre: Joi.string()
        .max(15)
        .error(
            new Error('El nombre no puede exceder los 15 caracteres')
        ),
    apellidos: Joi.string()
        .max(50)
        .error(
            new Error('Los apellidos no deben exceder los 50 caracteres')
        ),
    fechaNacimiento: Joi.date().timestamp()
        .error(
            new Error('La fecha debe ser válida')
        ),
    provincia: Joi.string()
        // .valid('Pontevedra', 'A Coruña', 'Lugo', 'Ourense')
        .error(
            new Error('Debe proporcionar una provincia válida')
        ),
    ciudad: Joi.string()
        .min(3)
        .max(20)
        .error(
            new Error('La ciudad debe tener un mínimo de 3 y un máximo de 20 caracteres')
        ),
    descripcion: Joi.string()
        .min(10)
        .max(500)
        .error(
            new Error('La descripción debe tener un mínimo de 10 y un máximo de 500 caracteres')
        ),
    telefono: Joi.number()
        .integer()
})

const emailValidator = Joi.object({
    email: Joi.string()
        .required()
}
)

const passwordValidator = Joi.object({
    password: Joi.string()
        .required()
}
)

module.exports = {
    userValidator,
    passwordValidator,
    emailValidator
}