const { getConnection } = require('../db/db')
const { dateToDb } = require('../utils/moment')

const search = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection()

        //OBTENER LOS CRITERIOS DE BÚSQUEDA
        const {
            provincia,
            ciudad,
            nBanos,
            nHabitaciones,
            m2,
            precio1,
            precio2,
            fecha_entrada,
            fecha_salida,
            ascensor,
            garaje,
            balcon,
            jardin,
            order,
            direction } = req.query;

        //NOMBRAMOS LA QUERY BASE
        let query = `select piso.id, piso.precio_piso, piso.provincia, piso.ciudad, piso.m2, piso.direccion from piso
                    left outer join reserva on reserva.id_piso = piso.id`;

        //ESTABLECEMOS LOS PARÁMETROS DE BÚSQUEDA
        const params = [];

        //ESTABLECER CRITERIO DE SENTIDO DE BÚSQUEDA
        const orderDirection = (direction && direction.toLowerCase()) === 'asc' ? 'ASC' : 'DESC';

        //ESTABLECER CRITERIO DE ORDEN
        let orderBy;
        switch (order) {
            case 'precio_piso':
                orderBy = 'precio_piso'
                break
            case 'fechaActualizacion':
                orderBy = 'fechaActualizacion'
                break
            default:
                orderBy = 'fechaActualizacion'
        }

        //CONSTRUIMOS QUERY MULTIBÚSQUEDA
        if (provincia || ciudad || nBanos || nHabitaciones || m2 || precio1 || precio2 || (fecha_entrada && fecha_salida) || ascensor || garaje || balcon || jardin) {

            //ESTABLECEMOS CONDICIONES PARA LA QUERY
            const conditions = [];
            if (provincia) {
                conditions.push(`provincia LIKE ?`)
                params.push(`%${provincia}%`)
            }
            if (ciudad) {
                conditions.push(`ciudad LIKE ?`)
                params.push(`%${ciudad}%`)
            }
            if (nBanos) {
                conditions.push(`nBanos >= ?`)
                params.push(`${nBanos}`)
            }
            if (nHabitaciones) {
                conditions.push(`nHabitaciones >= ?`)
                params.push(`${nHabitaciones}`)
            }
            if (m2) {
                conditions.push(`m2 >= ?`)
                params.push(`${m2}`)
            }
            if (precio1 || precio2) {
                if (!precio1) {
                    conditions.push(`precio_piso <= ?`)
                    params.push(`${precio2}`)
                } else if (!precio2) {
                    conditions.push(`precio_piso >= ?`)
                    params.push(`${precio1}`)
                } else if (precio1 && precio2) {
                    conditions.push(`precio_piso between ? and ?`)
                    params.push(`${precio1}`, `${precio2}`)
                }
            }
            if (fecha_entrada && fecha_salida) {
                const entrada = dateToDb(fecha_entrada)
                const salida = dateToDb(fecha_salida)

                conditions.push(`(fecha_entrada not between ? and ?
                    and fecha_salida not between ? and ?
                    and not (fecha_entrada < ? and fecha_salida > ?)
                    or (reserva.id_reserva is null))`)
                params.push(`${entrada}`, `${salida}`, `${entrada}`, `${salida}`, `${entrada}`, `${salida}`)
            }
            if (ascensor) {
                conditions.push(`ascensor = ?`)
                params.push(`${ascensor}`)
            }
            if (garaje) {
                conditions.push(`garaje = ?`)
                params.push(`${garaje}`)
            }
            if (balcon) {
                conditions.push(`balcon = ?`)
                params.push(`${balcon}`)
            }
            if (jardin) {
                conditions.push(`jardin = ?`)
                params.push(`${jardin}`)
            }

            //FINALIZAMOS CONSTRUCCIÓN DE QUERY
            query = `${query} where ${conditions.join(
                ` and `
            )} group by piso.id order by ${orderBy} ${orderDirection}`;

        }
        console.log(query, params)
        const [result] = await connection.query(query, params)
        res.send({
            data: result
        })
    } catch (e) {
        next(e)
    } finally {
        if (connection) {
            connection.release()
        }
    }
}

module.exports = {
    search
}