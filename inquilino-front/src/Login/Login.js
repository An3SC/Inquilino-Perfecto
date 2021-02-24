import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()

    const login = useSelector(s => s.login)
    const dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:9999/usuario/login', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                method: 'POST'
            })
            if (res.ok) {
                const data = await res.json()
                dispatch({ type: 'login', data })
            } else {
                setError(true)
            }
        } catch (e) {
            console.warn(e)
        }
    }

    if (login) return <Redirect to="/" />


    return (
        <form onSubmit={handleSubmit} className='loginContainer'>
            <h1>¡Saludos!</h1>
            <div className='loginContent'>
                <h1>Inicia sesión</h1>
                <input
                    type='email'
                    className='email'
                    placeholder='Email...'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoFocus
                />
                <input
                    type='password'
                    className='password'
                    placeholder='Contraseña...'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button />
                {error &&
                    <div>Parece que ha habido un problema para iniciar sesión</div>
                }
                <p>
                    <Link to="/recovery">¿No recuerdas tu contraseña?</Link>
                </p>
                <p>
                    <Link to='/register'>¿No tienes una cuenta?</Link>
                </p>
            </div>

        </form>
    )
}

export default Login