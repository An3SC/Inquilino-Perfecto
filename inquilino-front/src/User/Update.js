import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Header from "../Header"
import useFetch from "../useFetch"

function Update() {
    const login = useSelector(s => s.login)
    const { id } = useParams()

    const userData = useFetch(`http://localhost:9999/usuario/${id}`) || []
    const user = userData[0]

    const [nombre, setNombre] = useState(user && (user.nombre || ''))
    const [apellidos, setApellidos] = useState(user && (user.apellidos || ''))
    const [provincia, setProvincia] = useState(user && (user.provincia || ''))
    const [ciudad, setCiudad] = useState(user && (user.ciudad || ''))
    // const [email, setEmail] = useState(user && (user.email || ''))
    // const [password, setPassword] = useState(user && (user.password || ''))
    const [fechaNacimiento, setFechaNacimiento] = useState(user && (user.fechaNacimiento || ''))
    const [descripcion, setDescripcion] = useState(user && (user.descripcion || ''))
    const [telefono, setTelefono] = useState(user && (user.telefono || ''))


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

        fetch(`http://localhost:9999/usuario/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + login.token },
            body: fd
        })
        // .then(res => res.json())
        // .then(data => {

        // })
    }

    const avatarStyle = login && login.userImage && { backgroundImage: 'url(' + login.userImage + ')' }

    return (
        <div className='updateContainer'>
            <h2>Edita tu perfil</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Foto de perfil:</span>
                    <div >
                        <div className="avatar" style={avatarStyle} />
                        <input name="userImage" type="file" accept="image/*" />
                        {/* Ojo: Los input type file no usan value/onChange! */}
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

export default Update