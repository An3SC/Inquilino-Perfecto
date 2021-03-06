import { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import Rating from '../Utils/Rating';
import './Viviendas.css'

const queryString = require('query-string');

function SearchPage() {
    const [city, setCity] = useState('')
    const [provincia, setProvincia] = useState('')
    const [nHabitaciones, setNHabitaciones] = useState('')
    const [m2, setM2] = useState('')
    const [nBanos, setNBanos] = useState('')
    const [precio1, setPrecio1] = useState('')
    const [precio2, setPrecio2] = useState('')
    const [fechaEntrada, setFechaEntrada] = useState('')
    const [fechaSalida, setFechaSalida] = useState('')
    const [ascensor, setAscensor] = useState(false)
    const [garaje, setGaraje] = useState(false)
    const [balcon, setBalcon] = useState(false)
    const [jardin, setJardin] = useState(false)

    const [open, setOpen] = useState(false)

    const [page, setPage] = useState(1)

    const { cityUrl } = useParams()

    const parsedData = queryString.parse(window.location.search)

    const stringifiedData = queryString.stringify(parsedData)

    const searchPage = useFetch(`http://localhost:9999/vivienda/busqueda?`
        + (cityUrl ? `ciudad=${cityUrl}` : '')
        + (`&${stringifiedData}`)) || []

    const results = searchPage.data

    const paginatedResults = results ? results.slice(3 * (page - 1), 3 * page) : []
    const max = results ? Math.ceil(results.length / 3) : []

    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        const url = `/search/`
            + (city ? `${city}` : '') + `&provincia=${provincia}&nBanos=${nBanos}`
            + `&nHabitaciones=${nHabitaciones}&m2=${m2}&precio1=${precio1}`
            + `&precio2=${precio2}&fecha_entrada=${fechaEntrada}&fecha_salida=${fechaSalida}`
            + `&ascensor=${ascensor ? 'si' : ''}&garaje=${garaje ? 'si' : ''}`
            + `&balcon=${balcon ? 'si' : ''}&jardin=${jardin ? 'si' : ''}`
        history.push(url)
        setPage(1)
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
        setFechaEntrada('')
        setFechaSalida('')
        setAscensor('')
        setGaraje('')
        setBalcon('')
        setJardin('')
        setPage(1)
    }

    const handleOpen = e => {
        e.preventDefault()
        setOpen(!open)
    }

    return (
        <div className='searchPage'>
            <div className='searchFilters'>
                <button className='moreFilters' onClick={handleReset}>Despejar</button>
                <button className='moreFilters' onClick={handleOpen}>Más filtros</button>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='ciudad' placeholder={'Ciudad...'} value={city} onChange={e => setCity(e.target.value)} required />
                    <input type='text' name='provincia' placeholder='Provincia...' value={provincia} onChange={e => setProvincia(e.target.value)} />
                    {open &&
                        <div className='filterContainer'>
                            <label>
                                <p>Baños</p>
                                <select name='banos' value={nBanos} onChange={e => setNBanos(e.target.value)}>
                                    <option value='' >Baños</option>
                                    <option value={0} >Todo</option>
                                    <option value={1} >1</option>
                                    <option value={2} >2</option>
                                    <option value={3} >3 o más</option>
                                </select>
                            </label>
                            <label>
                                <p>Habitaciones</p>
                                <select name='habitaciones' value={nHabitaciones} onChange={e => setNHabitaciones(e.target.value)}>
                                    <option value='' >Habitaciones</option>
                                    <option value={0} >Todo</option>
                                    <option value={1} >1</option>
                                    <option value={2} >2</option>
                                    <option value={3} >3</option>
                                    <option value={4} >4 o más</option>
                                </select>
                            </label>
                            <label>
                                <p>Metros cuadrados</p>
                                <select name='m2' value={m2} onChange={e => setM2(e.target.value)}>
                                    <option value='' hidden>m2</option>
                                    <option value={0} >Indiferente</option>
                                    <option value={50} >50</option>
                                    <option value={60} >60</option>
                                    <option value={70} >70</option>
                                    <option value={80} >80</option>
                                    <option value={100} >100</option>
                                    <option value={120} >120 o más</option>
                                </select>
                            </label>
                            <label>
                                <p>Precio</p>
                                <select name='' value={precio1} onChange={e => setPrecio1(e.target.value)}>
                                    <option value='' hidden>Min</option>
                                    <option value={0}>Indiferente</option>
                                    <option value={200}>200€</option>
                                    <option value={300}>300€</option>
                                    <option value={400}>400€</option>
                                    <option value={500}>500€</option>
                                    <option value={600}>600€</option>
                                    <option value={700}>700€</option>
                                    <option value={800}>800€</option>
                                    <option value={900}>900€</option>
                                    <option value={1000}>1000€</option>
                                    <option value={1100}>1100€</option>
                                    <option value={1200}>1200€</option>
                                </select>
                                <select value={precio2} onChange={e => setPrecio2(e.target.value)}>
                                    <option value='' hidden>Max</option>
                                    <option value={999999}>Indiferente</option>
                                    <option value={200}>200€</option>
                                    <option value={300}>300€</option>
                                    <option value={400}>400€</option>
                                    <option value={500}>500€</option>
                                    <option value={600}>600€</option>
                                    <option value={700}>700€</option>
                                    <option value={800}>800€</option>
                                    <option value={900}>900€</option>
                                    <option value={1000}>1000€</option>
                                    <option value={1100}>1100€</option>
                                    <option value={1200}>1200€</option>
                                </select>
                            </label>
                            <label className='searchDate'>
                                <p>Fecha de entrada</p>
                                <input type='date' name='fechaEntrada' value={fechaEntrada} onChange={e => setFechaEntrada(e.target.value)} />
                                <p>Fecha de salida</p>
                                <input type='date' name='fechaSalida' value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} />
                            </label>
                            <label className='otrosFiltros'>
                                <label>
                                    Ascensor
                                <input type='checkbox' name='ascensor' checked={ascensor} onChange={e => setAscensor(e.target.checked)} />
                                Garaje
                                <input type='checkbox' name='garaje' checked={garaje} onChange={e => setGaraje(e.target.checked)} />
                                </label>
                                <label>
                                    Balcón
                                <input type='checkbox' name='balcon' checked={balcon} onChange={e => setBalcon(e.target.checked)} />
                                Jardín
                                <input type='checkbox' name='jardin' checked={jardin} onChange={e => setJardin(e.target.checked)} />
                                </label>
                            </label>
                        </div>}
                    <button className='searchButton' />
                </form>
            </div>
            {results &&
                <div className='pagination'>
                    <button className='back' onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                    <span>{page} / {max}</span>
                    <button className='forward' onClick={() => setPage(page < max ? page + 1 : max)} />
                </div>}
            <div className='searchResults'>
                <div>
                    {results && paginatedResults.map(result =>
                        <Link key={result.id} to={`/home/${result.id}`}>
                            <div className='result'>
                                <div className='pisoImagen' style={result.imagen && { backgroundImage: `url(http://localhost:9999/images/${result.imagen}.jpg)` }} />
                                <div>
                                    <Rating value={result.avg_score} />
                                    ({result.countScores})
                                </div>
                                <ul>
                                    <li>Ciudad: <b>{result.ciudad}</b></li>
                                    <li>Provincia: <b>{result.provincia}</b></li>
                                    <li>Dirección: <b>{result.direccion}</b></li>
                                    <li>Precio: <b>{result.precio_piso}€</b></li>
                                </ul>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div >
    )
}

export default SearchPage