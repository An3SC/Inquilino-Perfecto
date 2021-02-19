const db = require('../db/mysql');
const jwt = require('jsonwebtoken');

const { homeValidator } = require('../validators/homes')

const createHome = async (req, res) => {
    const {
        provincia,
        ciudad,
        direccion,
        precio_piso,
        nBanos,
        nHabitaciones,
        ascensor,
        garaje,
        balcon,
        jardin,
        m2,
        descripcion,
        fechaPublicacion } = req.body

    const { authorization } = req.headers

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        // const id_usuario = await db.getUser(decodedToken.email)
        const id_usuario = decodedToken.id
        // await homeValidator.validateAsync(req.body)

        await db.createHome(fechaPublicacion, provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario)

    } catch (e) {
        console.log(e)
        let statusCode = 400;
        if (e.message === 'database-error') {
            statusCode = 500
        }
        res.status(statusCode).send(e.message)
        return
    }
    res.send()
}

const getListOfHomes = async (req, res) => {
    try {
        let homes = await db.listHomes()
        res.send(homes)
    } catch (e) {
        res.status(500).send()
    }
}

const getMyHomes = async (req, res) => {
    const { id } = req.params

    try {
        const myHomes = await db.myHomes(id)
        if (!myHomes.length) {
            res.status(404).send()
        } else {
            res.send(myHomes)
        }
    } catch (e) {
        res.status(500).send()
    }
}

const getHome = async (req, res) => {
    const { id } = req.params

    try {
        const home = await db.getHome(id)
        if (!home.length) {
            res.status(404).send()
        } else {
            res.send(home)
        }
    } catch (e) {
        res.status(500).send()
    }
}

const deleteHome = async (req, res) => {
    const { id } = req.params;

    try {
        const home = await db.getHome(id)

        if (!home.length) {
            res.status(404).send()
            return
        }

        await db.deleteHome(id)

        res.send()
    } catch (e) {
        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}

const updateHome = async (req, res) => {
    const {
        provincia,
        ciudad,
        direccion,
        precio_piso,
        nBanos,
        nHabitaciones,
        ascensor,
        garaje,
        balcon,
        jardin,
        m2,
        descripcion,
        id_usuario } = req.body

    console.log(req.body)

    const { id } = req.params

    try {
        // await homeValidator.validateAsync(req.body)
        await db.updateHome(provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario, id)
    } catch (e) {
        console.log(e)
        let statusCode = 400;
        if (e.message === 'database-error') {
            statusCode = 500
        }
        res.status(statusCode).send(e.message)
        return
    }
    res.send()
}

module.exports = {
    createHome,
    getListOfHomes,
    getMyHomes,
    getHome,
    deleteHome,
    updateHome,
}
