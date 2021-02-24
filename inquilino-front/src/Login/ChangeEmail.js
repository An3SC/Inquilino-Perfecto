import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

function ChangeEmail() {
    const [email, setEmail] = useState('')
    const { id } = useParams()
    const [error, setError] = useState()
    const [sent, setSent] = useState(false)

    const login = useSelector(s => s.login)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleChange = async e => {
        e.preventDefault()
        const res = await fetch(`http://localhost:9999/usuario/${id}/email`, {
            headers: {
                'Authorization': login.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
            method: 'PUT'
        })
        if (res.ok) {
            setSent(!sent)
            history.push(`/`)
            dispatch({ type: 'logout' })
        } else {
            setError(true)
        }
    }

    return (
        <div className='changeEmailContainer'>
            <h1>Cambia tu email</h1>
            <div className='changeEmailContent'>
                <form onSubmit={handleChange}>
                    <h1>Introduce tu nuevo email</h1>
                    <input type='email' placeholder='Nuevo email' value={email} onChange={e => setEmail(e.target.value)} required />
                    <div>Tu email actual es: <b>{login.userEmail}</b></div>
                    {error &&
                        <div>Error en el cambio de email</div>
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

export default ChangeEmail