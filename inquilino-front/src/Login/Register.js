import { useState } from "react"
import { Link } from "react-router-dom"
import './Login.css'

function Register() {

    const [user, setUser] = useState({})
    const [registered, setRegistered] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        if (user.password !== confirmPassword) {
            alert('Las contraseñas deben coincidir')
        } else {
            const res = await fetch('http://localhost:9999/usuario', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
                method: 'POST'
            })
            if (res.ok) {
                setUser('')
                setRegistered(true)
            } else {
                setError(true)
            }
        }
    }

    return (
        <div className='registerContainer'>
            {registered ?
                <h1>¡Encantados de conocerte!</h1>
                : <h1>¿Quieres crear un perfil?</h1>
            }
            <div className='registerContent'>
                <h1>Registro</h1>
                {!registered &&
                    <form onSubmit={handleSubmit}>
                        <input name='nombre' placeholder='Nombre...' value={user.nombre || ''} onChange={e => setUser({ ...user, nombre: e.target.value })} required />
                        <input name='ciudad' placeholder='Ciudad...' value={user.ciudad || ''} onChange={e => setUser({ ...user, ciudad: e.target.value })} />
                        <input name='email' type='email' placeholder='Email...' value={user.email || ''} onChange={e => setUser({ ...user, email: e.target.value })} required />
                        <input name='password' type='password' placeholder='Contraseña...' value={user.password || ''} onChange={e => setUser({ ...user, password: e.target.value })} required />
                        <input name='password' type='password' placeholder='Confirma tu contraseña...' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        {error &&
                            <div>Error en la creación</div>
                        }
                        <button />
                    </form>}
                {registered &&
                    <div className='registeredMessage'>
                        <label>¡Revisa tu email, te hemos enviado un correo electrónico!</label>
                        <Link to='/login'>Inicia sesión</Link>
                    </div>
                }
            </div>
        </div>

    )
}

export default Register