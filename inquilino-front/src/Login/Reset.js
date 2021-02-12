import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

function Reset() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState()

    const { code } = useParams()

    const history = useHistory()

    const handleReset = async e => {
        e.preventDefault()
        const ret = await fetch('http://localhost:9999/usuario/password/reset/' + code, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
            method: 'PUT'
        })
        setPassword('')
        if (ret.ok) {
            history.push('/')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <form onSubmit={handleReset}>
                Introduce tu nueva contraseña
                <input name='code' placeholder='Nueva contraseña' type='password' value={password} onChange={e => setPassword(e.target.value)} required />
                <button>Cambiar</button>
                {error &&
                    <div>Error en el reseteo</div>
                }
            </form>
        </div>
    )
}

export default Reset