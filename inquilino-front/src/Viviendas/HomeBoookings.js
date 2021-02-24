import { useState } from "react"
import { useParams } from "react-router-dom"
import AcceptOrDeclineBooking from "../Bookings/AcceptOrDeclineBooking"
import useFetch from "../useFetch"
import moment from 'moment'
import Valorar from '../Utils/Valorar'

function HomeBoookings() {
    const { id } = useParams()
    const [page, setPage] = useState(1)

    const reservas = useFetch(`http://localhost:9999/vivienda/reservas/${id}`) || []
    console.log(reservas)

    const paginatedResults = reservas ? reservas.slice(2 * (page - 1), 2 * page) : []
    const max = reservas ? Math.ceil(reservas.length / 2) : []

    return (
        <div className='homeBookingsContainer'>
            {reservas &&
                <div className='pagination'>
                    <button className='back' onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                    <span>{page} / {max}</span>
                    <button className='forward' onClick={() => setPage(page < max ? page + 1 : max)} />
                </div>}
            {reservas && paginatedResults.map(r =>
                <div className='homeBookingsContent' key={r.id}>
                    <ul>
                        <li>Nombre: <b>{r.nombre}</b></li>
                        <li>Email: <b>{r.email}</b></li>
                        <li>Precio: <b>{r.precio}€</b></li>
                        <li>Realizó la petición: <b>{moment(r.fecha_reserva).format("DD-MM-YYYY")}</b></li>
                        <li>Fecha de entrada: <b>{moment(r.fecha_entrada).format("DD-MM-YYYY")}</b></li>
                        <li>Fecha de salida: <b>{moment(r.fecha_salida).format("DD-MM-YYYY")}</b></li>
                    </ul>
                    {r.estado === 'pendiente' &&
                        <div>
                            <AcceptOrDeclineBooking id={r.id} />
                        </div>
                    }
                    {r.estado === 'aceptado' &&
                        <label>
                            <Valorar previousScore={r.avg_scoreUsuario} id={r.id} />
                            ({r.countScoreUsuario})
                        </label>

                    }
                    {r.estado === 'aceptado' &&
                        <p>
                            Ya has aceptado esta reserva.
                        </p>
                    }
                    {r.estado === 'declinado' &&
                        <p>
                            Ya has rechazado esta reserva.
                        </p>
                    }
                </div>
            )}
        </div>
    )
}

export default HomeBoookings