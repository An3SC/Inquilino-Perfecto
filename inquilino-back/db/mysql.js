const { image } = require('faker');
const moment = require('moment')

const { getConnection } = require("./db");

const performQuery = async (query, params) => {
    let connection;
    console.log(query)
    console.log(params)

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

const register = async (email, password, nombre, provincia, apellidos, ciudad, descripcion, fechaNacimiento, validationCode) => {
    const query = `insert into usuario (email, password, nombre, provincia, apellidos, ciudad, descripcion, fechaNacimiento, validationCode) values (?,?,?,?,?,?,?,?,?)`
    const params = [email, password, nombre, provincia, apellidos, ciudad, descripcion, fechaNacimiento, validationCode]
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

    const result = await performQuery(query, params)
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

    try {
        if (result) {
            const query = `update usuario set estado = 'activo', validationCode = '' where validationCode = ?`
            await performQuery(query, [code])
        }
    } catch (e) {
        console.log(e)
    }
}


// QUERYS DE HOMES ///

const createHome = async (fechaPublicacion, provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario) => {
    const query = `insert into piso(fechaPublicacion, provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario)
    VALUES(UTC_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const params = [provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario]
    const result = await performQuery(query, params)
    return result
}

const listHomes = async () => {
    const query = `select * from piso`
    const [...result] = await performQuery(query)
    return result
}

const myHomes = async (id) => {
    const query = `select * from piso where id_usuario = ?`
    const params = [id]

    const [...result] = await performQuery(query, params)
    return result
}

const getHome = async (id) => {
    const query = `select p.provincia "provincia",
                p.ciudad "ciudad",
                p.direccion "direccion",
                p.nBanos "nBanos",
                p.nHabitaciones "nHabitaciones",
                p.m2 "m2",
                p.precio_piso "precio_piso",
                p.ascensor "ascensor",
                p.garaje "garaje",
                p.balcon "balcon",
                p.jardin "jardin",
                p.id_usuario "id_usuario",
                p.imagen 'imagen',
                u.nombre 'nombre',
                p.score 'piso_score',
                avg(r.score_piso) "avg_score",
                count (score_piso) as countScore
	from piso p left join reserva r on p.id = r.id_piso right join usuario u on p.id_usuario= u.id where p.id =  ? group by p.id`
    const params = [id]

    const result = await performQuery(query, params)
    return result
}

const getOwner = async (id_piso) => {
    const query = `select p.id "id_piso",
    u.id "owner_id",
    u.email "email" from piso p join usuario u on p.id_usuario = u.id where p.id= ?`
    const params = [id_piso]

    const [...result] = await performQuery(query, params)
    return result
}

const deleteHome = async (id) => {
    const query = `delete from piso where id = ?`
    const params = [id]

    await performQuery(query, params)
}

const updateHome = async (provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario, id) => {
    const query = `
    update piso set fechaActualizacion = UTC_TIMESTAMP,
    provincia = ?,
    ciudad = ?,
    direccion = ?,
    precio_piso = ?,
    nBanos = ?,
    nHabitaciones = ?,
    ascensor = ?,
    garaje = ?,
    balcon = ?,
    jardin = ?,
    m2 = ?,
    descripcion = ?,
    id_usuario = ?
    where id = ?`

    const params = [provincia, ciudad, direccion, precio_piso, nBanos, nHabitaciones, ascensor, garaje, balcon, jardin, m2, descripcion, id_usuario, id]
    await performQuery(query, params)
}



//QUERYS DE IMAGES ///

const saveUserImage = async (imagen, id) => {
    const query = `update usuario set imagen = ? where id = ?`
    const params = [imagen, id]

    console.log(query, params)
    await performQuery(query, params)
}

const saveHomeImage = async (imagen, id) => {
    const query = `update piso set imagen = ? where id = ?`
    const params = [imagen, id]

    console.log(query, params)
    await performQuery(query, params)
}



/// QUERYS DE BOOKINGS ///

const createBooking = async (id_piso, id_usuario, fecha_entrada, fecha_salida) => {
    const query = `insert into reserva(id_piso, id_usuario, fecha_entrada, fecha_salida, precio_reserva) values(?,?,?,?,(select precio_piso from piso where id = ?))`
    const params = [id_piso, id_usuario, fecha_entrada, fecha_salida, id_piso]

    const result = await performQuery(query, params)
    return result
}

const getBooking = async (id) => {
    const query = `select r.id_reserva,
                    r.id_usuario,
                    p.id 'id_piso',
                    p.direccion,
                    p.ciudad,
                    r.precio_reserva,
                    r.fecha_entrada,
                    r.fecha_salida,
                    r.score_piso,
                    r.score_usuario
                    from reserva r join piso p on r.id_piso =p.id where r.id_reserva = ?`
    const params = [id]

    const [result] = await performQuery(query, params)
    return result
}

const getEmailBooking = async (resultId) => {
    const query = `select u.email
                    from usuario u
                    left join piso p on p.id_usuario = u.id
                    right join reserva r on p.id = r.id_piso where r.id_reserva = ? group by r.id_reserva`
    const params = [resultId]

    const [result] = await performQuery(query, params)
    return result
}

const homeBookings = async (id) => {
    const query = `select u.nombre 'nombre',
                    u.email 'email',
                    r.id_reserva 'id',
                    r.precio_reserva 'precio',
                    r.fecha_reserva 'fecha_reserva',
                    r.fecha_entrada 'fecha_entrada',
                    r.estado 'estado',
                    r.fecha_salida 'fecha_salida' from reserva r join usuario u on r.id_usuario = u.id where id_piso = ?`
    const params = [id]

    const [...result] = await performQuery(query, params)
    return result
}

const existBooking = async (fecha_entrada, fecha_salida, id) => {
    const query = `select * from reserva where (fecha_entrada between ? and ?
    and fecha_salida between ? and ?) and id_piso = ?`
    const params = [fecha_entrada, fecha_salida, fecha_entrada, fecha_salida, id]

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
    const query = `select r.id_reserva,
                r.id_usuario,
                p.id 'id_piso',
                p.direccion,
                p.ciudad,
                p.imagen,
                r.precio_reserva,
                r.fecha_entrada,
                r.fecha_salida,
                r.estado
                from reserva r join piso p on r.id_piso =p.id where r.id_usuario = ?`
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

const acceptBooking = async (id_reserva) => {
    const query = `update reserva
                set estado = 'aceptado'
                where id_reserva = ?`
    const params = [id_reserva]

    await performQuery(query, params)
}

const declineBooking = async (id_reserva) => {
    const query = `update reserva
                set estado = 'declinado'
                where id_reserva = ?`
    const params = [id_reserva]

    await performQuery(query, params)
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
    getOwner,
    listHomes,
    myHomes,
    getHome,
    deleteHome,
    updateHome,
    saveUserImage,
    saveHomeImage,
    createBooking,
    getBooking,
    getEmailBooking,
    homeBookings,
    existBooking,
    deleteBooking,
    getListBookings,
    haveBooking,
    acceptBooking,
    declineBooking,
    scoreUser,
    scoreHome
}