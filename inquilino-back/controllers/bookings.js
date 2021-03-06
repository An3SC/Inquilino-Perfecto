const db = require('../db/mysql')
const jwt = require('jsonwebtoken');
const { scoreValidator } = require('../validators/score');

const utils = require('../utils/utils')

const booking = async (req, res) => {
    const {
        id
    } = req.params

    const {
        fecha_entrada,
        fecha_salida
    } = req.body

    const {
        authorization
    } = req.headers

    const booking = await db.existBooking(fecha_entrada, fecha_salida, id)

    if (booking) {
        res.status(403).send()
        return
    }

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        const id_usuario = await db.getUser(decodedToken.email)

        const result = await db.createBooking(id, id_usuario.id, fecha_entrada, fecha_salida)
        const resultId = result.insertId

        const email = await db.getEmailBooking(resultId)

        utils.sendBookingMail(email, `http://${process.env.FRONT_DOMAIN}/myHome/${id}`)

        res.send({ resultId })
    } catch (e) {
        console.log(e)
        res.status(402).send()
    }
}

const deleteBooking = async (req, res) => {
    const { id } = req.params

    try {
        const booking = await db.getBooking(id)

        if (!booking) {
            res.status(404).send()
            return
        }

        await db.deleteBooking(id)

    } catch (e) {
        console.log(e)
        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            console.log(e)
            res.status(500).send()
        }
    }
    res.send()
}

const getListOfBookings = async (req, res) => {
    const { authorization } = req.headers

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        const id_usuario = await db.getUser(decodedToken.email)
        let bookings = await db.getListBookings(id_usuario.id)
        res.send(bookings)
    } catch (e) {
        console.log(e)
        res.status(403).send()
    }
}

const getBooking = async (req, res) => {
    const { id } = req.params

    try {
        const booking = await db.getBooking(id)

        if (!booking) {
            console.log('Es este ')
            res.status(404).send()
        } else {
            res.send(booking)
        }
    } catch (e) {
        res.status(500).send()
    }
}

const homeBookings = async (req, res) => {
    const { id } = req.params

    try {
        const booking = await db.homeBookings(id)

        if (!booking) {
            console.log('Es este ')
            res.status(404).send()
        } else {
            res.send(booking)
        }
    } catch (e) {
        res.status(500).send()
    }
}

const acceptBooking = async (req, res) => {
    const { id } = req.params

    console.log(id)

    try {
        await db.acceptBooking(id)
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}

const declineBooking = async (req, res) => {
    const { id } = req.params

    try {
        await db.declineBooking(id)
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}

const scoreBooking = async (req, res) => {
    const { score } = req.body
    const { authorization } = req.headers

    console.log(score)

    try {
        // await scoreValidator.validateAsync(req.body)

        const bookingId = parseInt(req.params.id)

        const decodedToken = jwt.verify(authorization, process.env.SECRET)
        const { id } = await db.getUser(decodedToken.email)

        const { id_usuario } = await db.getBooking(bookingId)
        const propietario = await db.haveBooking(bookingId)
        const id_propietario = propietario[0].propietario

        if (id === id_usuario) {
            await db.scoreHome(score, bookingId)
            console.log('Ha puntuado al piso')
        } else if (id === id_propietario) {
            await db.scoreUser(score, bookingId)
            console.log('Ha puntuado al usuario')
        } else {
            console.log('Da error aquí')
            res.status(403).send()
        }

    } catch (e) {
        console.log(e)
        res.status(403).send()
        return
    }
    res.send()
}

module.exports = {
    booking,
    deleteBooking,
    getListOfBookings,
    getBooking,
    acceptBooking,
    declineBooking,
    scoreBooking,
    homeBookings
}