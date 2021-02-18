import { useState } from "react"
import './Login.css'

function Register() {

    const [user, setUser] = useState({})
    const [registered, setRegistered] = useState(false)

    const [error, setError] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        const ret = await fetch('http://localhost:9999/usuario', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            method: 'POST'
        })
        if (ret.ok) {
            setUser('')
            setRegistered(true)
        } else {
            setError(true)
        }

    }

    return (
        <div className='registerContainer'>
            {!registered &&
                <form onSubmit={handleSubmit}>
                    <input name='nombre' placeholder='Nombre...' value={user.nombre || ''} onChange={e => setUser({ ...user, nombre: e.target.value })} required />
                    <input name='apellidos' placeholder='Apellidos...' value={user.apellidos || ''} onChange={e => setUser({ ...user, apellidos: e.target.value })} />
                    <input name='provincia' placeholder='Provincia...' value={user.provincia || ''} onChange={e => setUser({ ...user, provincia: e.target.value })} required />
                    <input name='ciudad' placeholder='Ciudad...' value={user.ciudad || ''} onChange={e => setUser({ ...user, ciudad: e.target.value })} />
                    <input name='email' type='email' placeholder='Email...' value={user.email || ''} onChange={e => setUser({ ...user, email: e.target.value })} required />
                    <input name='birthDate' type='date' value={user.fechaNacimiento || ''} onChange={e => setUser({ ...user, fechaNacimiento: e.target.value })} />
                    <input name='password' type='password' placeholder='Contraseña...' value={user.password || ''} onChange={e => setUser({ ...user, password: e.target.value })} required />
                    <input name='avatar' type='file' />
                    <input name='descripcion' placeholder='Descripcion...' value={user.descripcion || ''} onChange={e => setUser({ ...user, descripcion: e.target.value })} />
                    {error &&
                        <div>Error en la creación</div>
                    }
                    <button>¡Regístrame!</button>
                </form>}
            {registered &&
                <div>
                    <label>¡Te hemos enviado un correo electrónico!</label>
                </div>
            }
        </div>

    )
}

export default Register