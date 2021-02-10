import { useState } from 'react'
// import { useParams } from 'react-router-dom'
import useFetch from '../useFetch'

function SearchPage() {
    const [city, setCity] = useState('')
    const [price1, setPrice1] = useState('')
    const [price2, setPrice2] = useState('')


    const currentUrl = window.location.href
    const currentCity = currentUrl && currentUrl.split('&').find(t => t.startsWith('ciudad='))
    // const currentBanos = currentUrl && currentUrl.split('&').find(t => t.startsWith('nBanos='))
    // const currentPrice = currentUrl && currentUrl.split('&').find(t => t.startsWith('price='))
    const cityUrl = currentCity ? currentCity.substr(7) : 1
    // const price = currentPrice ? currentPrice.substr(5) : 1

    // console.log(currentBanos)

    // FUNCIÓN CON USO DE PARAMS
    // const { city, banos } = useParams()

    const searchPage = useFetch(`http://localhost:9999/vivienda/busqueda?` + `ciudad=${cityUrl}`) || []
    const firstResults = searchPage.data
    // console.log(firstResults)

    const handleSubmit = async e => {
        e.preventDefault()
        //     const url = `http://localhost:9999/vivienda/busqueda?` + `ciudad=${city}` /*+ `&precio2=${price}`*/
        //     const res = await fetch(url)
        //     const data = await res.json()
        //     setResults(data)
        //     // history.push(`/search/&ciudad=${city}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='ciudad' placeholder='Ciudad...' value={city} onChange={e => setCity(e.target.value)} />
                <label>
                    Precio
                    <select value={price1} onChange={e => setPrice1(e.target.value)}>
                        <option value='' hidden>Min</option>
                        <option value={200}>400</option>
                        <option value={300}>500</option>
                        <option value={400}>600</option>
                        <option value={500}>700</option>
                    </select>
                    <select value={price2} onChange={e => setPrice2(e.target.value)}>
                        <option value='' hidden>Max</option>
                        <option value={600}>400</option>
                        <option value={700}>500</option>
                        <option value={800}>600</option>
                        <option value={900}>700</option>
                    </select>
                </label>
                <button>Buscar</button>
            </form>
            <div>
                <ul>
                    {firstResults && firstResults.map(result =>
                        <li key={result.id}>
                            <div>
                                {result.ciudad}
                            </div>
                            <div>
                                {result.direccion}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SearchPage 