import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

function Reservar() {
    const { id } = useParams()

    const login = useSelector(s => s.login)

    const [fecha_entrada, setFechaEntrada] = useState('')
    const [fecha_salida, setFechaSalida] = useState('')

    const [error, setError] = useState()

    const history = useHistory()

    const handleBooking = async e => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:9999/vivienda/${id}/reserva`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': login.token
                },
                body: JSON.stringify({ fecha_entrada, fecha_salida }),
                method: 'POST'
            })
            if (res.ok) {
                const data = await res.json()
                history.push(`/booking/${data.resultId}`)
            } else {
                setError(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='reservarContainer'>
            <form onSubmit={handleBooking}>
                <label className='reservarLabel'>
                    <label>
                        Fecha de entrada
                <input type='date' name='fechaEntrada' value={fecha_entrada} onChange={e => setFechaEntrada(e.target.value)} required />
                    </label>
                    <label>
                        Fecha de salida
                <input type='date' name='fechaSalida' value={fecha_salida} onChange={e => setFechaSalida(e.target.value)} required />
                    </label>
                </label>
                <button>Reservar</button>
                {error &&
                    <div>No puede reservar en las fechas seleccionadas</div>
                }
            </form>
        </div>
    )
}

export default Reservar