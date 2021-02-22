import { useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Valorar from "../Utils/Valorar"
import DeleteBooking from "./DeleteBooking"

function BookingIdWrapper() {
    const { id } = useParams()
    const reserva = useFetch(`http://localhost:9999/reserva/${id}`)
    return reserva ? <BookingId reserva={reserva} /> : false
}

function BookingId({ reserva }) {
    const { id } = useParams()

    return (
        <div className='bookingIdContainer'>
            <h1>Mi reserva</h1>
            <div className='bookingIdContent'>
                <ul key={reserva.id_reserva}>
                    <li>{reserva.ciudad}</li>
                    <li>{reserva.direccion}</li>
                    <li>{reserva.fecha_entrada}</li>
                    <li>{reserva.fecha_salida}</li>
                    <li>{reserva.precio_reserva}</li>
                </ul>
                <DeleteBooking id={id} />
                <div>
                    <Valorar previousScore={reserva.score_piso} id={reserva.id_reserva} />
                </div>
            </div>

        </div>
    )
}

export default BookingIdWrapper