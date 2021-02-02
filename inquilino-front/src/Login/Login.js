import { useState } from "react"
import { useLogin } from "../LoginContext"
import { login } from '../api'

function Login() {
    const [status, setStatus] = useState()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [, setLogin] = useLogin()

    const handleSubmit = async e => {
        e.preventDefault()
        setStatus('loading')
        try {
            const data = await login(email, password)
            console.log(data)
            setLogin(data)
            setStatus('success')
        } catch (e) {
            console.warn(e)
            setStatus('error')
        }
    }

    if (status === 'loading') {
        return 'Enviando...'
    }

    if (status === 'success') {
        return 'Bienvenido!'
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='email'
                className='email'
                placeholder='Email...'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type='password'
                className='password'
                placeholder='Contraseña...'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <div>
                <button>Iniciar</button>
                {status === 'error' &&
                    <div>Usuario o contraseña incorrecta</div>
                }
            </div>
        </form>
    )
}

export default Login