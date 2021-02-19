import { useParams } from "react-router-dom"
import useFetch from "../useFetch"

function HomeBoookings() {

    const { id } = useParams()

    const reservas = useFetch(`http://localhost:9999/vivienda/reservas/${id}`) || []

    const handleAccept = e => {
        e.preventDefault()
    }

    const handleDecline = e => {
        e.preventDefault()
    }

    return (
        <div>
            {reservas && reservas.map(r =>
                <div key={r.id}>
                    <ul>
                        <li>Nombre: {r.nombre}</li>
                        <li>Email: {r.email}</li>
                        <li>Precio: {r.precio}</li>
                        <li>Fecha de reserva: {r.fecha_reserva}</li>
                        <li>Fecha de entrada: {r.fecha_entrada}</li>
                        <li>Fecha de salida: {r.fecha_salida}</li>
                    </ul>
                    <button onClick={handleAccept}>Aceptar</button>
                    <button onClick={handleDecline}>Declinar</button>
                </div>
            )}
        </div>
    )
}

export default HomeBoookings