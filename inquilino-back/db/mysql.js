const { image } = require('faker');
const moment = require('moment')

const { getConnection } = require("./db");

const performQuery = async (query, params) => {
    let connection;
    console.log(query)

    try {
        connection = await getConnection();

        const [result] = await connection.query(query, params)

        return result;
    } catch (e) {
        console.log(e)
        throw new Error('database-error')
    } finally {
        if (connection) {
            connection.release()
        }
    }
}


// QUERYS DE USUARIOS ///

/**
 * Cuando se ejecute bien, va a hacer falta meter con el email y password
 * los campos not null que hayamos puesto.
 */

const register = async (email, password, nombre, provincia, apellidos, ciudad, descripcion, validationCode) => {
    const query = `insert into usuario (email, password, nombre, provincia, apellidos, ciudad, descripcion, validationCode) values (?,?,?,?,?,?,?,?)`
    const params = [email, password, nombre, provincia, apellidos, ciudad, descripcion, validationCode]
    console.log(params)

    await performQuery(query, params)
}

const getUser = async (email) => {
    const query = `select * from usuario where email = ?`
    const params = [email]

    const [result] = await performQuery(query, params)
    return result
}

const getUserById = async (id) => {
    const query = `select * from usuario where id = ?`
    const params = [id]

    const [result] = await performQuery(query, params)
    return result
}

const updateUser = async (nombre, apellidos, fechaNacimiento, provincia, ciudad, descripcion, telefono, id) => {
    const query = `
    update usuario set nombre = ?,
    apellidos = ?,
    fechaNacimiento = ?,
    provincia = ?,
    ciudad = ?,
    descripcion = ?,
    telefono = ?
    where id = ?
    `
    const params = [nombre, apellidos, fechaNacimiento, provincia, ciudad, descripcion, telefono, id]
    console.log(params)

    await performQuery(query, params)
}

const updateUserPassword = async (password, id) => {
    const query = `update usuario set password = ?
        where id = ?`
    const params = [password, id]

    await performQuery(query, params)
}

const updateUserEmail = async (email, id, validationCode) => {
    const query = `update usuario set email = ?, validationCode = ? where id = ?`
    const params = [email, validationCode, id]

    await performQuery(query, params)
}

const updatePasswordCode = async (validationCode, email) => {
    const query = `update usuario set validationCode = ? where email = ?`
    const params = [validationCode, email]

    await performQuery(query, params)
}

const resetPassword = async (password, validationCode) => {
    const query = `update usuario set password = ? where validationCode = ?`
    const params = [password, validationCode]

    await performQuery(query, params)
}

const deleteUserById = async (id) => {
    const query = `delete from usuario where id = ?`
    const params = [id]

    await performQuery(query, params)
}

const checkValidationCode = async (code) => {
    const query = `select * from usuario where validationCode = ?`
    const params = [code]

    const [result] = await performQuery(query, params)

    if (result) {
        const query = `update usuario set estado = 'activo', validationCode = '' where validationCode = ?`
        await performQuery(query, [code])
    } else {
        throw new Error('validation-error')
    }
}

const checkUpdateCode = async (code) => {
    const query = `select * from usuario where validationCode = ?`
    const params = [code]

    const [result] = await performQuery(query, params)

    if (result) {
        const query = `update usuario set estado = 'activo', validationCode = '' where validationCode = ?`
        await performQuery(query, [code])
    } else {
        throw new Error('validation-error')
    }
}


// QUERYS DE HOMES ///

const createHome = async (fechaPublicacion, provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario) => {
    const query = `insert into piso(fechaPublicacion, provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario)
    VALUES(UTC_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const params = [provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario]
    await performQuery(query, params)
}

const listHomes = async () => {
    const query = `select * from piso`
    const [...result] = await performQuery(query)
    return result
}

const getHome = async (id) => {
    const query = `select * from piso where id = ?`
    const params = [id]

    const result = await performQuery(query, params)
    return result
}

const deleteHome = async (id) => {
    const query = `delete from piso where id = ?`
    const params = [id]

    await performQuery(query, params)
}

const updateHome = async (provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, m2, id_usuario, id) => {
    const query = `
    update piso set fechaActualizacion = UTC_TIMESTAMP,
    provincia = ?,
    ciudad = ?,
    direccion = ?,
    precio_piso = ?,
    nBanos = ?,
    nHabitaciones = ?,
    m2 = ?,
    id_usuario = ?
    where id = ?`

    const params = [provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, m2, id_usuario, id]
    await performQuery(query, params)
}



//QUERYS DE IMAGES ///

const saveHomeImage = async (imagen, id_piso) => {
    const query = `insert into imagenesPiso (id_piso, imagen) values (?, ?)`
    const params = [imagen, id_piso]

    console.log(query, params)
    await performQuery(query, params)
}



/// QUERYS DE BOOKINGS ///

const createBooking = async (id_piso, id_usuario) => {
    const query = `insert into reserva(id_piso, id_usuario, precio_reserva) values(?,?,(select precio_piso from piso where id = ?))`
    const params = [id_piso, id_usuario, id_piso]

    await performQuery(query, params)
}

const getBooking = async (id) => {
    const query = `select * from reserva where id_reserva = ?`
    const params = [id]

    const [result] = await performQuery(query, params)
    return result
}

const deleteBooking = async (id) => {
    const query = `delete from reserva where id_reserva = ?`
    const params = [id]

    await performQuery(query, params)
}
/**
 * Hay que poner un UPDATE, para que no se borren las cosas
 */

const getListBookings = async (id_usuario) => {
    const query = `select * from reserva where id_usuario = ?`
    const params = [id_usuario]

    const [...result] = await performQuery(query, params)
    return result
}

const haveBooking = async (id_reserva) => {
    const query = `select
            r.id_reserva "reserva",
            r.id_piso "piso",
            r.id_usuario "inquilino",
            p.id_usuario "propietario"
        from reserva r
        join piso p on p.id = r.id_piso
        where r.id_reserva = ?
        group by r.id_reserva`
    const params = [id_reserva]

    const [...result] = await performQuery(query, params)
    return result
}

const scoreUser = async (score, id_reserva) => {
    const query = `update reserva set score_usuario = ? where id_reserva = ?`
    const params = [score, id_reserva]

    await performQuery(query, params)
}

const scoreHome = async (score, id_reserva) => {
    const query = `update reserva set score_piso = ? where id_reserva = ?`
    const params = [score, id_reserva]

    await performQuery(query, params)
}


module.exports = {
    register,
    getUser,
    getUserById,
    updateUser,
    updateUserPassword,
    updateUserEmail,
    updatePasswordCode,
    resetPassword,
    updateUser,
    deleteUserById,
    checkValidationCode,
    checkUpdateCode,
    createHome,
    listHomes,
    getHome,
    deleteHome,
    updateHome,
    saveHomeImage,
    createBooking,
    getBooking,
    deleteBooking,
    getListBookings,
    haveBooking,
    scoreUser,
    scoreHome
}