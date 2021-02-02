const Joi = require('joi');

const homeValidator = Joi.object({
    provincia: Joi.string()
        .valid('Pontevedra', 'A Coruña', 'Lugo', 'Ourense')
        .required()
        .error(
            new Error('Debe escoger una de las proporcionadas')
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
    precio: Joi.number()
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
    m2: Joi.number()
        .required()
        .error(
            new Error('Debe proporcionar un número válido')
        ),
    id_usuario: Joi.number()
        .required()
        .integer()
        .error(
            new Error('Debe proporcionar un número de usuario')
        ),
    jardin: Joi.string()
        .valid('si', 'no'),
    garaje: Joi.string()
        .valid('si', 'no'),
    balcon: Joi.number()
        .integer(),
    ascensor: Joi.string()
        .valid('si', 'no'),
    descripcion: Joi.string()
        .max(500)
        .error(
            new Error('La descripción no debe exceder los 500 caracteres')
        )
})

module.exports = {
    homeValidator
}