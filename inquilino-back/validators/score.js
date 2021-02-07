const Joi = require('joi')

const scoreValidator = Joi.object({
    score: Joi.number()
        .min(0)
        .max(5)
        .error(
            new Error('El score debe ser un número comprendido entre el 0 y el 10')
        )
})

module.exports = {
    scoreValidator
}