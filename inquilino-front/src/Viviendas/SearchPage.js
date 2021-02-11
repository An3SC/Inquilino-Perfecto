import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../useFetch'

function SearchPage() {
    const [city, setCity] = useState('')
    const [provincia, setProvincia] = useState('')
    const [nHabitaciones, setNHabitaciones] = useState('')
    const [m2, setM2] = useState('')
    const [nBanos, setNBanos] = useState('')
    const [precio1, setPrecio1] = useState('')
    const [precio2, setPrecio2] = useState('')
    const [ascensor, setAscensor] = useState(false)
    const [garaje, setGaraje] = useState(false)
    const [balcon, setBalcon] = useState(false)
    const [jardin, setJardin] = useState(false)

    const [results, setResults] = useState('')
    const dataResults = results.data

    const { cityUrl } = useParams()

    const searchPage = useFetch(`http://localhost:9999/vivienda/busqueda?` + `ciudad=${cityUrl}`) || []
    const firstResults = searchPage.data

    const handleSubmit = async e => {
        e.preventDefault()
        const url = `http://localhost:9999/vivienda/busqueda?`
            + `ciudad=${city ? city : cityUrl}` + `&provincia=${provincia}` + `&nBanos=${nBanos}`
            + `&nHabitaciones=${nHabitaciones}` + `&m2=${m2}` + `&precio1=${precio1}`
            + `&precio2=${precio2}` + `&ascensor=${ascensor ? 'si' : ''}` + `&garaje=${garaje ? 'si' : ''}`
            + `&balcon=${balcon ? 'si' : ''}` + `&jardin=${jardin ? 'si' : ''}`
        const res = await fetch(url)
        const data = await res.json()
        setResults(data)
    }

    const handleReset = e => {
        e.preventDefault()
        setCity('')
        setProvincia('')
        setNBanos('')
        setNHabitaciones('')
        setM2('')
        setPrecio1('')
        setPrecio2('')
        setAscensor('')
        setGaraje('')
        setBalcon('')
        setJardin('')
    }

    console.log(results)

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name='ciudad' placeholder={city ? city : cityUrl} value={city} onChange={e => setCity(e.target.value)} />
                    <input name='provincia' placeholder='Provincia...' value={provincia} onChange={e => setProvincia(e.target.value)} />
                    <label>
                        Baños
                        <select name='banos' value={nBanos} onChange={e => setNBanos(e.target.value)}>
                            <option value='' >Baños</option>
                            <option value={1} >1</option>
                            <option value={2} >2</option>
                            <option value={3} >3 o más</option>
                        </select>
                    </label>
                    <label>
                        Habitaciones
                        <select name='habitaciones' value={nHabitaciones} onChange={e => setNHabitaciones(e.target.value)}>
                            <option value='' >Habitaciones</option>
                            <option value={1} >1</option>
                            <option value={2} >2</option>
                            <option value={3} >3</option>
                            <option value={4} >4 o más</option>
                        </select>
                    </label>
                    <label>
                        Metros cuadrados
                        <select name='m2' value={m2} onChange={e => setM2(e.target.value)}>
                            <option value='' hidden>m2</option>
                            <option value={50} >50</option>
                            <option value={70} >70</option>
                            <option value={90} >90</option>
                            <option value={110} >110 o más</option>
                        </select>
                    </label>
                    <label>
                        Precio
                        <select name='' value={precio1} onChange={e => setPrecio1(e.target.value)}>
                            <option value='' hidden>Min</option>
                            <option value={200}>400</option>
                            <option value={300}>500</option>
                            <option value={400}>600</option>
                            <option value={500}>700</option>
                        </select>
                        <select value={precio2} onChange={e => setPrecio2(e.target.value)}>
                            <option value='' hidden>Max</option>
                            <option value={700}>700</option>
                            <option value={800}>800</option>
                            <option value={900}>900</option>
                            <option value={1000}>1000</option>
                        </select>
                    </label>
                    <label>
                        Ascensor
                        <input type='checkbox' name='ascensor' checked={ascensor} onChange={e => setAscensor(e.target.checked)} />
                        Garaje
                        <input type='checkbox' name='garaje' checked={garaje} onChange={e => setGaraje(e.target.checked)} />
                        Balcón
                        <input type='checkbox' name='balcon' checked={balcon} onChange={e => setBalcon(e.target.checked)} />
                        Jardín
                        <input type='checkbox' name='jardin' checked={jardin} onChange={e => setJardin(e.target.checked)} />
                    </label>
                    <button>Buscar</button>
                </form>
                <div>
                    <button onClick={handleReset}>Borrar</button>
                </div>
            </div>
            <div>
                <ul>
                    {dataResults && dataResults.map(result =>
                        <li key={result.id}>
                            <div>{result.ciudad}</div>
                            <div>{result.provincia}</div>
                            <div>{result.direccion}</div>
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <ul>
                    {!dataResults && firstResults && firstResults.map(result =>
                        <li key={result.id}>
                            <div>{result.ciudad}</div>
                            <div>{result.provincia}</div>
                            <div>{result.direccion}</div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SearchPage 