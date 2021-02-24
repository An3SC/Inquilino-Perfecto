const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring')

const db = require('../db/mysql')
const utils = require('../utils/utils')

const { authValidator } = require('../validators/auth')

const register = async (req, res) => {
    try {
        // await authValidator.validateAsync(req.body)
        const { email, password, nombre, provincia, apellidos, ciudad, descripcion, fechaNacimiento } = req.body
        const user = await db.getUser(email)
        if (user) {
            res.status(400).send()
            return
        }
        const passwordBcrypt = await bcrypt.hash(password, 10);

        const validationCode = randomstring.generate(21)

        await db.register(email, passwordBcrypt, nombre, provincia, apellidos, ciudad, descripcion, fechaNacimiento, validationCode)

        utils.sendConfirmationMail(email, `http://${process.env.FRONT_DOMAIN}/validate/${validationCode}`)

    } catch (e) {
        console.log(e)
        res.status(400).send()
        return
    }

    res.send()
}

const validate = async (req, res) => {
    const { code } = req.params;

    try {
        db.checkValidationCode(code)
        res.send('Validado correctamente')
    } catch (e) {
        res.status(401).send('Usuario no validado')
    }

}


const login = async (req, res) => {
    const { email, password } = req.body

    const user = await db.getUser(email)

    if (!user) {
        res.status(401).send()
        return
    }

    const username = user.nombre
    const imagen = user.imagen
    const userEmail = user.email
    const id = user.id

    const passwordIsvalid = await bcrypt.compare(password, user.password);

    if (!passwordIsvalid) {
        res.status(401).send()
        return
    }

    const tokenPayload = {
        isAdmin: user.role === 'admin',
        role: user.role,
        email: user.email,
        id: user.id,
        /**
         * Ponemos cualquier tipo de información que
         * pueda ser de utilidad en los endpoints
         */
    }

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
        expiresIn: '1d'
    });

    res.send({
        token,
        userEmail,
        username,
        imagen,
        id
    })
}

module.exports = {
    register,
    validate,
    login
}
