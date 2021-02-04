import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

function Reset() {
    const { code } = useParams()
    const [password, setPassword] = useState('')
    const [sent, setSent] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        await fetch('http://chat-api.trek-quest.com/recovery', {
            headers: { 'Context-Type': 'application/json' },
            body: JSON.stringify({ password, code }),
            method: 'POST'
        })
        setSent(true)
    }

    if (sent) return (
        <div>
            Contraseña cambiada con éxito!
        </div>
    )

    return (
        <form className='page login' onSubmit={handleSubmit}>
            Selecciona una nueva contraseña:
            <div>
                <input placeholder='Password...' type='password' required
                    value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button>Enviar</button>
        </form>
    )
}

export default Reset