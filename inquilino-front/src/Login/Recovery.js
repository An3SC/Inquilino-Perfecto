import { useState } from "react"

function Recovery() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        await fetch('http://localhost:9999/usuario/recover-password', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            method: 'POST'
        })
        setSent(true)
    }

    const handleReset = async e => {
        e.preventDefault()
        await fetch('http://localhost:9999/usuario/password/reset/' + code, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
            method: 'PUT'
        })
        setCode('')
        setPassword('')
    }

    return (
        <div>
            {!sent &&
                <form onSubmit={handleSubmit}>
                    Introduce tu email para que te enviemos las instrucciones
                    <div>
                        <input placeholder='Email...' type='email' required
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <button>Enviar</button>
                </form>
            }
            {sent &&
                <form onSubmit={handleReset}>
                    Introduce el código que te hemos enviado y tu nueva contraseña
                    <input name='code' placeholder='Código...' value={code} onChange={e => setCode(e.target.value)} required />
                    <input name='code' placeholder='Nueva contraseña' type='password' value={password} onChange={e => setPassword(e.target.value)} required />
                    <button>Cambiar</button>
                </form>
            }
        </div>
    )
}

export default Recovery