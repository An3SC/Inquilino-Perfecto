import { useState } from "react"

function Recovery() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        await fetch('http://localhost:9999/usuario/recover-password', {
            headers: { 'Context-Type': 'application/json' },
            body: JSON.stringify({ email }),
            method: 'POST'
        })
        setSent(true)
    }

    if (sent) return (
        <div>
            Te hemos enviado un correo con las instrucciones
        </div>
    )

    return (
        <form onSubmit={handleSubmit}>
            Introduce tu email para que te enviemos las instrucciones
            <div>
                <input placeholder='Email...' type='email' required
                    value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button>Enviar</button>
        </form>
    )
}

export default Recovery