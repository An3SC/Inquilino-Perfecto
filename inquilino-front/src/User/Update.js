import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import './update.css'

function UpdateUserWrapper() {
    const { id } = useParams()
    const data = useFetch(`http://localhost:9999/usuario/${id}`)
    return data ? <Update data={data[0]} /> : false
}

function Update({ data }) {
    const login = useSelector(s => s.login)
    const { id } = useParams()

    const [nombre, setNombre] = useState(data.nombre || '')
    const [apellidos, setApellidos] = useState(data.apellidos || '')
    const [provincia, setProvincia] = useState(data.provincia || '')
    const [ciudad, setCiudad] = useState(data.ciudad || '')
    // const [email, setEmail] = useState(data.email || '')
    // const [password, setPassword] = useState(data.password || '')
    const [fechaNacimiento, setFechaNacimiento] = useState(data.fechaNacimiento || '')
    const [descripcion, setDescripcion] = useState(data.descripcion || '')
    const [telefono, setTelefono] = useState(data.telefono || '')

    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        const userImage = e.target.userImage.files[0]
        console.log(userImage)

        const fd = new FormData()
        fd.append('imagen', userImage)
        fd.append('nombre', nombre)
        fd.append('apellidos', apellidos)
        fd.append('provincia', provincia)
        fd.append('ciudad', ciudad)
        // fd.append('email', email)
        // fd.append('password', password)
        fd.append('fechaNacimiento', fechaNacimiento)
        fd.append('descripcion', descripcion)
        fd.append('telefono', telefono)

        const ret = fetch(`http://localhost:9999/usuario/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': login.token },
            body: fd
        })
        if (ret.ok) {
            history.push(`/user/${id}`)
        } else {
            console.log('Ha habido un error')
        }

    }

    const avatarUrl = data.imagen && (`http://localhost:9999/images/${data.imagen}.jpg`)
    const avatarStyle = login && data.imagen && { backgroundImage: 'url(' + avatarUrl + ')' }

    return (
        <div className='updateContainer'>
            <h2>Edita tu perfil</h2>
            <form onSubmit={handleSubmit}>
                <label className='avatarPicker'>
                    <span>Foto de perfil:</span>
                    <div className='value'>
                        <div className="avatar" style={avatarStyle} />
                        <input name="userImage" type="file" accept="image/*" />
                    </div>
                </label>
                <label>
                    Nombre:
                    <input value={nombre} onChange={e => setNombre(e.target.value)} />
                </label>
                <label>
                    Apellidos:
                    <input value={apellidos} onChange={e => setApellidos(e.target.value)} />
                </label>
                <label>
                    Provincia:
                    <input value={provincia} onChange={e => setProvincia(e.target.value)} />
                </label>
                <label>
                    Ciudad:
                    <input value={ciudad} onChange={e => setCiudad(e.target.value)} />
                </label>
                {/* <label>
                    Email:
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </label> */}
                <label>
                    Fecha de nacimiento:
                    <input type='date' value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                </label>
                <label>
                    Descripcion:
                    <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                </label>
                <label>
                    Teléfono:
                    <input type='number' value={telefono} onChange={e => setTelefono(e.target.value)} />
                </label>
                <button>Guardar</button>
            </form>
        </div>
    )
}

export default UpdateUserWrapper