import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

function Register() {

    const register = useSelector(s => s.register)

    const dispatch = useDispatch()

    // const [error, setError] = useState()

    const [user, setUser] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:9999/usuario', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
                method: 'POST'
            })

            // console.log(res)
            const data = await res.json()
            // console.log(data)
            dispatch({ type: 'register', data })
        } catch (e) {
            console.warn(e)
        }
    }

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     fetch('http://localhost:9999/usuario', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.token) {
    //                 register(data)
    //             } else {
    //                 setError(data.error || true)
    //             }
    //         })
    //         .catch(e => setError(true))
    // }

    console.log(register)

    if (register) return <Redirect to="/" />

    return (
        <form onSubmit={handleSubmit}>
            <input name='nombre' placeholder='Nombre...' value={user.nombre || ''} onChange={e => setUser({ ...user, nombre: e.target.value })} required />
            {/* <input name='apellidos' placeholder='Apellidos...' value={user.apellidos || ''} onChange={e => setUser({ ...user, apellidos: e.target.value })} /> */}
            <input name='provincia' placeholder='Provincia...' value={user.provincia || ''} onChange={e => setUser({ ...user, provincia: e.target.value })} required />
            {/* <input name='ciudad' placeholder='Ciudad...' value={user.ciudad || ''} onChange={e => setUser({ ...user, ciudad: e.target.value })} /> */}
            <input name='email' type='email' placeholder='Email...' value={user.email || ''} onChange={e => setUser({ ...user, email: e.target.value })} required />
            <input name='password' type='password' placeholder='Contraseña...' value={user.password || ''} onChange={e => setUser({ ...user, password: e.target.value })} required />
            {/* <input name='descripcion' placeholder='Descripcion...' value={user.descripcion || ''} onChange={e => setUser({ ...user, descripcion: e.target.value })} /> */}
            <button>¡Regístrame!</button>
            {/* {error &&
                <div className="error">
                    {error === true ? 'Error de registro' : error}
                </div>
            } */}
        </form>
    )
}

export default Register