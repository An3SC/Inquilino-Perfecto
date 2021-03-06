import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import './Login.css'

function Reset() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [sent, setSent] = useState(false)

    const { code } = useParams()

    const history = useHistory()

    const handleReset = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:9999/usuario/password/reset/' + code, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
            method: 'PUT'
        })
        setPassword('')
        if (res.ok) {
            history.push('/')
            setSent(!sent)
        } else {
            setError(true)
        }
    }

    return (
        <div className='resetContainer'>
            <h1>Cambia tu contraseña</h1>
            <div className='resetContent'>
                <form onSubmit={handleReset}>
                    <h1>Introduce tu nueva contraseña</h1>
                    <input name='password' placeholder='Nueva contraseña' type='password' value={password} onChange={e => setPassword(e.target.value)} required />
                    {error &&
                        <div>Error en el reseteo</div>
                    }
                    <button />
                    {!sent &&
                        <div className='pikachuRunning' />
                    }
                    {sent &&
                        <div className='pikachuSent' />
                    }
                </form>
            </div>
        </div>
    )
}

export default Reset