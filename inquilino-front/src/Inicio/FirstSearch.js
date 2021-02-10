import { useState } from "react"
import { useHistory } from "react-router-dom"

function FirstSearch() {
    const [city, setCity] = useState('')
    // const [price, setPrice] = useState('')
    // const [banos, setBanos] = useState('')

    let history = useHistory()

    // FUNCIÓN CON USO DE PARAMS
    // const handleSubmit = async e => {
    //     e.preventDefault()
    //     history.push(`/search/${city}/${banos}`)
    // }

    const handleSubmit = async e => {
        e.preventDefault()
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
                {/* <input type='number' min='0' value={banos} onChange={e => setBanos(e.target.value)} /> */}
                {/* <label>
                    Precio máximo
                    <select value={price} onChange={e => setPrice(e.target.value)}>
                        <option value='' hidden>Max</option>
                        <option value={400}>400</option>
                        <option value={500}>500</option>
                        <option value={600}>600</option>
                        <option value={700}>700</option>
                    </select>
                </label> */}
                <button>Buscar</button>
            </form>
        </div>
    )
}

export default FirstSearch