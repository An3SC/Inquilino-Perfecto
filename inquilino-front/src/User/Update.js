import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import './User.css'

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

    const handleSubmit = async e => {
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

        const res = await fetch(`http://localhost:9999/usuario/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': login.token },
            body: fd
        })
        if (res.ok) {
            history.push(`/user/${id}`)
        } else {
            console.log('Ha habido un error')
        }

    }

    const avatarUrl = login && login.imagen && (`http://localhost:9999/images/${login.imagen}.jpg`)
    const avatarStyle = login && login.imagen && { backgroundImage: 'url(' + avatarUrl + ')' }

    return (
        <div className='updateContainer'>
            <h1>Edita tu perfil</h1>
            <div className='updateContent'>
                <form onSubmit={handleSubmit}>
                    <label className='avatarPicker'>
                        <span>Foto actual:</span>
                        <div className="avatarEdit" style={avatarStyle} />
                        <input name="userImage" type="file" accept="image/*" />
                    </label>
                    <label>
                        Nombre:
                    <input type='text' value={nombre} onChange={e => setNombre(e.target.value)} />
                    </label>
                    <label>
                        Apellidos:
                    <input type='text' value={apellidos} onChange={e => setApellidos(e.target.value)} />
                    </label>
                    <label>
                        Provincia:
                    <input type='text' value={provincia} onChange={e => setProvincia(e.target.value)} />
                    </label>
                    <label>
                        Ciudad:
                    <input type='text' value={ciudad} onChange={e => setCiudad(e.target.value)} />
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
                    <textarea rows='3' cols='25' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                    </label>
                    <label>
                        Teléfono:
                    <input type='number' value={telefono} onChange={e => setTelefono(e.target.value)} />
                    </label>
                    <button className='updateButton'>Guardar</button>
                </form>
            </div>

        </div>
    )
}

export default UpdateUserWrapper