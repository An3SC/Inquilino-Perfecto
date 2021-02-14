import { useState } from "react"

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
            <form onSubmit={handleSubmit}>
                Introduce tu email para que te enviemos las instrucciones
                    <div>
                    <input placeholder='Email...' type='email' required
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                {sent &&
                    <div>Revisa tu email</div>
                }
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default Recovery