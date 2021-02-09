const db = require('../db/mysql')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')

const utils = require('../utils/utils')

const { userValidator, passwordValidator, emailValidator } = require('../validators/users');

const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await db.getUserById(id)
        if (!user.length) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    } catch (e) {
        res.status(500).send()
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.getUserById(id)
        if (!user) {
            res.status(404).send()
            return
        }
        await db.deleteUserById(id)
        res.send()
    } catch (e) {
        if (e.message === 'unknown-id') {
            res.status(404).send()
        } else {
            res.status(500).send()
        }
    }
}

const updateUser = async (req, res) => {
    const {
        nombre,
        apellidos,
        fechaNacimiento,
        provincia,
        ciudad,
        descripcion,
        telefono } = req.body
    const { id } = req.params
    try {
        await userValidator.validateAsync(req.body)
        await db.updateUser(nombre, apellidos, fechaNacimiento, provincia, ciudad, descripcion, telefono, id)
        console.log(db.updateUser(nombre, apellidos, fechaNacimiento, provincia, ciudad, descripcion, telefono, id))
    } catch (e) {
        let statusCode = 400;
        if (e.message === 'database-error') {
            statusCode = 500
        }
        res.status(statusCode).send(e.message)
        return
    }
    res.send()
}
/**
 * Hay que hacer algo con los notnull, ya que los piden para actualizar los
 * cambios. IFNULL? ISNULL? SQL.
 */

const updateUserPassword = async (req, res) => {
    try {
        await passwordValidator.validateAsync(req.body)

        const { newPassword } = req.body
        const { id } = req.params

        const passwordBcrypt = await bcrypt.hash(newPassword, 10)
        await db.updateUserPassword(passwordBcrypt, id)
    } catch (e) {
        res.status(403).send()
    }
    res.send()
}

const updateUserEmail = async (req, res) => {
    try {
        await emailValidator.validateAsync(req.body)

        const { email } = req.body
        const { id } = req.params

        const validationCode = randomstring.generate(21)

        await db.updateUserEmail(email, id, validationCode)

        utils.updateEmailMail(email, `http://${process.env.PUBLIC_DOMAIN}/usuario/validate/${validationCode}`)

    } catch (e) {
        console.log(e)
        res.status(403).send()
    }
    res.send()
}

const recoverPassword = async (req, res) => {
    try {
        await emailValidator.validateAsync(req.body)

        const { email } = req.body
        console.log(email)

        const user = await db.getUser(email)

        if (!user) {
            res.status(401).send()
            return
        }
        const validationCode = randomstring.generate(21)

        await db.updatePasswordCode(validationCode, email)

        utils.recoverPasswordMail(email, validationCode)
    } catch (e) {
        console.log(e)
        res.status(403).send()
    }
    res.send()
}

/**
 * Se podría hacer que el usuario tuviera que copar el validationCode.
 * Se le pasa como parámetro en el email, lo pega en el apartado de
 * reset password y ejecuta la actualización de la contraseña. Para
 * ello habría que borrar el link enviado al recoverPasswordMail y
 * cambiarlo por el validationCode
 */

const resetPassword = async (req, res) => {
    try {
        await passwordValidator.validateAsync(req.body)

        const { code } = req.params
        const { password } = req.body

        const passwordBcrypt = await bcrypt.hash(password, 10)

        await db.resetPassword(passwordBcrypt, code)

        await db.checkUpdateCode(code)

        res.send('Su contraseña se ha actualizado')
    } catch (e) {
        res.status(403).send('Usuario no validado')
    }
    res.send()
}

module.exports = {
    getUserById,
    deleteUser,
    updateUser,
    updateUserPassword,
    updateUserEmail,
    recoverPassword,
    resetPassword
}