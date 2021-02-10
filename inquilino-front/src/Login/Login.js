import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            // console.log(res)
            const data = await res.json()
            // console.log(data)
            dispatch({ type: 'login', data })
        } catch (e) {
            console.warn(e)
        }
    }

    if (login) return <Redirect to="/" />


    return (
        <form onSubmit={handleSubmit}>
            <div>
                Inicia sesión
            </div>
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
            </div>
            <p>
                <Link to="/recovery">¿No recuerdas tu contraseña?</Link>
            </p>
        </form>
    )
}

export default Login