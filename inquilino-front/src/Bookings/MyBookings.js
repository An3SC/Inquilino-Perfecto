import { Link } from "react-router-dom"
import useFetch from "../useFetch"

function MyBookings() {
    const bookingsData = useFetch(`http://localhost:9999/reserva`) || []
    console.log(bookingsData)

    return (
        <div className='myBookingsContainer'>
            Mis reservas
            {bookingsData && bookingsData.map(b =>
                <Link key={b.id} to={`/booking/${b.id_reserva}`}>
                    <ul>
                        <li>{b.ciudad}</li>
                        <li>{b.direccion}</li>
                        <li>{b.fecha_entrada}</li>
                        <li>{b.fecha_salida}</li>
                        <li>{b.precio_reserva}</li>
                    </ul>
                </Link>
            )}
        </div>
    )
}

export default MyBookings