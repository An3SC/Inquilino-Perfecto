import { useState } from "react"
import './Login.css'

function Recovery() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        const ret = await fetch('http://localhost:9999/usuario/recover-password', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            method: 'POST'
        })
        if (ret.ok) {
            setEmail('')
            setSent(true)
        } else {
            setSent(false)
        }
    }

    return (
        <div className='recoveryContainer'>
            <h1>Recupera tu contraseña</h1>
            <div className='recoveryContent'>
                <form onSubmit={handleSubmit}>
                    <h1>Introduce tu email</h1>
                    <div>
                        <input placeholder='Email...' type='email' required
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    {sent &&
                        <div>Revisa tu email</div>
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

export default Recovery