import { useParams } from "react-router-dom"
import AcceptOrDeclineBooking from "../Bookings/AcceptOrDeclineBooking"
import useFetch from "../useFetch"

function HomeBoookings() {
    const { id } = useParams()

    const reservas = useFetch(`http://localhost:9999/vivienda/reservas/${id}`) || []

    return (
        <div>
            {reservas && reservas.map(r =>
                <div className='homeBookingsContent' key={r.id}>
                    <ul>
                        <li>Nombre: {r.nombre}</li>
                        <li>Email: {r.email}</li>
                        <li>Precio: {r.precio}</li>
                        <li>Fecha de reserva: {r.fecha_reserva}</li>
                        <li>Fecha de entrada: {r.fecha_entrada}</li>
                        <li>Fecha de salida: {r.fecha_salida}</li>
                    </ul>
                    {r.estado === 'pendiente' &&
                        <div>
                            <AcceptOrDeclineBooking id={r.id} />
                        </div>
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