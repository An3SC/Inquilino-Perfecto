import { useState } from "react"

function Register() {

    const [user, setUser] = useState({})
    const [registered, setRegistered] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:9999/usuario', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            method: 'POST'
        })
        setUser('')
        setRegistered(true)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name='nombre' placeholder='Nombre...' value={user.nombre || ''} onChange={e => setUser({ ...user, nombre: e.target.value })} required />
            <input name='apellidos' placeholder='Apellidos...' value={user.apellidos || ''} onChange={e => setUser({ ...user, apellidos: e.target.value })} />
            <input name='provincia' placeholder='Provincia...' value={user.provincia || ''} onChange={e => setUser({ ...user, provincia: e.target.value })} required />
            <input name='ciudad' placeholder='Ciudad...' value={user.ciudad || ''} onChange={e => setUser({ ...user, ciudad: e.target.value })} />
            <input name='email' type='email' placeholder='Email...' value={user.email || ''} onChange={e => setUser({ ...user, email: e.target.value })} required />
            <input name='password' type='password' placeholder='Contraseña...' value={user.password || ''} onChange={e => setUser({ ...user, password: e.target.value })} required />
            <input name='descripcion' placeholder='Descripcion...' value={user.descripcion || ''} onChange={e => setUser({ ...user, descripcion: e.target.value })} />
            <button>¡Regístrame!</button>
            {registered &&
                <div>
                    <label>¡Te hemos enviado un correo electrónico!</label>
                </div>
            }
        </form>
    )
}

export default Register