import { useState } from "react"
import { useHistory } from "react-router-dom"

function FirstSearch() {
    const [cityUrl, setCityUrl] = useState('')

    let history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        history.push(cityUrl ? `/search/${cityUrl}` : `/searchPage`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Dinos dónde buscas
                </div>
                <input type='text' placeholder='Ciudad...'
                    value={cityUrl} onChange={e => setCityUrl(e.target.value)}
                />
                <button>Buscar</button>
            </form>
        </div>
    )
}

export default FirstSearch