import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

function Reservar() {
    const { id } = useParams()

    const login = useSelector(s => s.login)

    const booking = useSelector(s => s.booking)
    const dispatch = useDispatch()

    const [fecha_entrada, setFechaEntrada] = useState('')
    const [fecha_salida, setFechaSalida] = useState('')

    // const history = useHistory()

    const handleBooking = async e => {
        e.preventDefault()
        try {
            const ret = await fetch(`http://localhost:9999/vivienda/${id}/reserva`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': login.token
                },
                body: JSON.stringify({ fecha_entrada, fecha_salida }),
                method: 'POST'
            })
            console.log(ret)
            const data = await ret.json()
            dispatch({ type: 'booking', data })

            console.log(booking.resultId)
            if (ret.ok) {
                // history.push('/booking/:id')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleBooking}>
            <label>
                Fecha de entrada
                <input type='date' name='fechaEntrada' value={fecha_entrada} onChange={e => setFechaEntrada(e.target.value)} required />
                Fecha de salida
                <input type='date' name='fechaSalida' value={fecha_salida} onChange={e => setFechaSalida(e.target.value)} required />
            </label>
            <button>Reservar</button>
        </form>
    )
}

export default Reservar