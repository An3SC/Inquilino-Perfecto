import { useState } from "react"
import { Link } from "react-router-dom"
import useFetch from "../useFetch"
import './Bookings.css'
import moment from 'moment'

function MyBookings() {
    const [page, setPage] = useState(1)

    const bookingsData = useFetch(`http://localhost:9999/reserva`) || []
    console.log(bookingsData)

    const paginatedResults = bookingsData ? bookingsData.slice(2 * (page - 1), 2 * page) : []
    const max = bookingsData ? Math.ceil(bookingsData.length / 2) : []

    return (
        <div className='myBookingsContainer'>
            <h1>Mis reservas</h1>
            {bookingsData &&
                <div className='pagination'>
                    <button className='back' onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                    <span>{page} / {max}</span>
                    <button className='forward' onClick={() => setPage(page < max ? page + 1 : max)} />
                </div>}
            {bookingsData && paginatedResults.map(b =>
                <div className='myBookingsContent'>
                    <Link key={b.id} to={`/booking/${b.id_reserva}`}>
                        <div className={b.estado === 'aceptado' ? 'aceptada' : (b.estado === 'declinado' ? 'declinada' : 'pendiente')}>
                            <div className='bookingImagen' style={b.imagen && { backgroundImage: `url(http://localhost:9999/images/${b.imagen}.jpg)` }} />
                        </div>
                        <ul>
                            <li>Ciudad: <b>{b.ciudad}</b></li>
                            <li>Dirección: <b>{b.direccion}</b></li>
                            <li>Precio: <b>{b.precio_reserva}€</b></li>
                            <li>Fecha de entrada: <b>{moment(b.fecha_entrada).format("DD-MM-YYYY")}</b></li>
                            <li>Fecha de salida: <b>{moment(b.fecha_salida).format("DD-MM-YYYY")}</b></li>
                            <li>Estado: <b>{b.estado}</b></li>
                        </ul>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default MyBookings