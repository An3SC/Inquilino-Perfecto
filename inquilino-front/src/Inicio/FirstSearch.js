import { useState } from "react"
import { useHistory } from "react-router-dom"

function FirstSearch() {
    const [city, setCity] = useState('')
    const [price, setPrice] = useState('')

    const [, setResults] = useState()

    let history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        const url = `http://localhost:9999/vivienda/busqueda?` + `ciudad=${city}` /*+ `&precio2=${price}`*/
        const res = await fetch(url)
        const data = await res.json()
        setResults(data)
        history.push(`/search/&ciudad=${city}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Dinos dónde buscas
                </div>
                <input type='text' placeholder='Ciudad...'
                    value={city} onChange={e => setCity(e.target.value)}
                />
                <label>
                    Precio máximo
                    <select value={price} onChange={e => setPrice(e.target.value)}>
                        <option value='' hidden>Max</option>
                        <option value={400}>400</option>
                        <option value={500}>500</option>
                        <option value={600}>600</option>
                        <option value={700}>700</option>
                    </select>
                </label>
                <button>Buscar</button>
            </form>
        </div>
    )
}

export default FirstSearch