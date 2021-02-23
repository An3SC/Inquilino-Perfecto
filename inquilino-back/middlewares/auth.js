const jwt = require('jsonwebtoken');

const db = require('../db/mysql')

const isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        const user = await db.getUser(decodedToken.email)

        if (!user) {
            throw new Error()
        }

        req.auth = decodedToken;
    } catch (e) {
        console.log(e)
        res.status(401).send()
        return
    }
    next();
}

const isSameUserOrAdmin = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        const { id } = await db.getUser(decodedToken.email)
        req.auth = decodedToken;
        console.log(req.auth.id)
        if (id === req.auth.id || req.auth.isAdmin) {
            next()
        }
    } catch (e) {
        res.status(403).send()
        return
    }
}

const isOwner = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const id_piso = parseInt(req.params.id)
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        const { id } = await db.getUser(decodedToken.email)
        const owner = await db.getOwner(id_piso)
        const owner_id = owner[0].owner_id

        if (id === owner_id) {
            next()
        }
    } catch (e) {
        console.log(e)
        res.status(403).send()
    }
}

const isAdmin = async (req, res, next) => {
    const { authorization } = req.headers;
    const decodedToken = jwt.verify(authorization, process.env.SECRET)
    req.auth = decodedToken;

    if (!req.auth || !req.auth.isAdmin) {
        res.status(403).send()
        return
    }
    next()
}

const haveBooking = async (req, res, next) => {
    const { authorization } = req.headers

    try {
        const bookingId = parseInt(req.params.id)

        const decodedToken = jwt.verify(authorization, process.env.SECRET)
        const { id } = await db.getUser(decodedToken.email)
        console.log(id)
        const { id_usuario } = await db.getBooking(bookingId)
        console.log(id_usuario)
        const propietario = await db.haveBooking(bookingId)
        const id_propietario = propietario[0].propietario

        if (id_usuario === id || id_propietario === id) {
            console.log('Tiene reserva')
            next()
        } else {
            console.log('Error')
            res.status(403).send()
        }
    } catch (e) {
        console.log(e)
        res.status(403).send()
        return
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isSameUserOrAdmin,
    isOwner,
    haveBooking
};