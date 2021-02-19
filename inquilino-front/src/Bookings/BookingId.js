import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"

function BookingId() {
    const { id } = useParams()

    const reserva = useFetch(`http://localhost:9999/reserva/${id}`) || []

    const login = useSelector(s => s.login)

    const history = useHistory()

    const handleDelete = async e => {
        e.preventDefault()
        const res = await fetch(`http://localhost:9999/reserva/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': login.token }
        })
        if (res.ok) {
            history.push(`/userBookings`)
        } else {
            console.log('Ha habido un error')
        }
    }

    return (
        <div className='bookingIdContainer'>
            <h1>Mi reserva</h1>
            <div className='bookingIdContent'>
                <ul key={reserva.id}>
                    <li>{reserva.ciudad}</li>
                    <li>{reserva.direccion}</li>
                    <li>{reserva.fecha_entrada}</li>
                    <li>{reserva.fecha_salida}</li>
                    <li>{reserva.precio_reserva}</li>
                </ul>
                <div>
                    <button onClick={handleDelete}>Eliminar</button>
                </div>
            </div>

        </div>
    )
}

export default BookingId