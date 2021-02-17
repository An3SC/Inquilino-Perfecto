import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function Reservar() {
    const { id } = useParams()

    const login = useSelector(s => s.login)

    const [fecha_entrada, setFechaEntrada] = useState('')
    const [fecha_salida, setFechaSalida] = useState('')

    const handleBooking = e => {
        e.preventDefault()
        try {
            fetch(`http://localhost:9999/vivienda/${id}/reserva`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': login.token
                },
                body: JSON.stringify({ fecha_entrada, fecha_salida }),
                method: 'POST'
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleBooking}>
            <label>
                Fecha de entrada
                <input type='date' name='fechaEntrada' value={fecha_entrada} onChange={e => setFechaEntrada(e.target.value)} />
                Fecha de salida
                <input type='date' name='fechaSalida' value={fecha_salida} onChange={e => setFechaSalida(e.target.value)} />
            </label>
            <button>Reservar</button>
        </form>
    )
}

export default Reservar