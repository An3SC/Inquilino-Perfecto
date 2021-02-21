import { useState } from "react"
import { useHistory } from "react-router-dom"
import './Home.css'

function FirstSearch() {
    const [cityUrl, setCityUrl] = useState('')
    const [fechaEntrada, setFechaEntrada] = useState()
    const [fechaSalida, setFechaSalida] = useState()

    let history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        history.push(`/search/` + (cityUrl ? `${cityUrl}?` : '?') + (fechaEntrada ? `fecha_entrada=${fechaEntrada}&` : '') + (fechaSalida ? `fecha_salida=${fechaSalida}` : ''))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='firstSearchForm'>
                <input type='text' placeholder='¿En qué ciudad buscas?'
                    value={cityUrl} onChange={e => setCityUrl(e.target.value)}
                    required
                />
                <div className='firstDatesContainer'>
                    <label>
                        Fecha de entrada
                    <input type='date' value={fechaEntrada} onChange={e => setFechaEntrada(e.target.value)} />
                    </label>
                    <label>
                        Fecha de salida
                    <input type='date' value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} />
                    </label>
                </div>
                <button>Buscar</button>
            </form>
        </div>
    )
}

export default FirstSearch