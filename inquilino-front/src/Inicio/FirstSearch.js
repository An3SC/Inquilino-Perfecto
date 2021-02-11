import { useState } from "react"
import { useHistory } from "react-router-dom"

function FirstSearch() {
    const [cityUrl, setCityUrl] = useState('')

    let history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        history.push(`/search/${cityUrl}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    🦕🦖 dónde buscas
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