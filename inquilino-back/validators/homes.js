const Joi = require('joi');

const homeValidator = Joi.object({
    provincia: Joi.string()
        .required()
        .error(
            new Error('Debe escoger una válida')
        ),
    ciudad: Joi.string()
        .required()
        .min(3)
        .error(
            new Error('La ciudad debe tener más de tres caracteres')
        ),
    direccion: Joi.string()
        .min(3)
        .required()
        .error(
            new Error('La dirección debe tener más de tres caracteres')
        ),
    precio_piso: Joi.number()
        .required()
        .error(
            new Error('Debe proporcionar un precio numérico')
        ),
    nBanos: Joi.number()
        .required()
        .integer()
        .error(
            new Error('Debe proporcionar un número')
        ),
    nHabitaciones: Joi.number()
        .required()
        .integer()
        .error(
            new Error('Debe proporcionar un número válido')
        ),
    ascensor: Joi.string()
        .valid('si', 'no'),
    garaje: Joi.string()
        .valid('si', 'no'),
    balcon: Joi.string()
        .valid('si', 'no'),
    jardin: Joi.string()
        .valid('si', 'no'),
    m2: Joi.number()
        .required()
        .error(
            new Error('Debe proporcionar un número válido')
        ),
    descripcion: Joi.string()
        .max(500)
        .error(
            new Error('La descripción no debe exceder los 500 caracteres')
        )
})

module.exports = {
    homeValidator
}