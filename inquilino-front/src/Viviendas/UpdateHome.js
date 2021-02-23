import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Rating from "../Utils/Rating"
import HomeBoookings from "./HomeBoookings"

function UpdateHomeWrapper() {
    const { id } = useParams()
    const data = useFetch(`http://localhost:9999/vivienda/${id}`)
    return data ? <UpdateHome data={data[0]} /> : false
}

function UpdateHome({ data }) {
    const [ciudad, setCiudad] = useState(data.ciudad || '')
    const [provincia, setProvincia] = useState(data.provincia || '')
    const [direccion, setDireccion] = useState(data.direccion || '')
    const [nHabitaciones, setNHabitaciones] = useState(data.nHabitaciones || '')
    const [m2, setM2] = useState(data.m2 || '')
    const [nBanos, setNBanos] = useState(data.nBanos || '')
    const [precio_piso, setPrecio_piso] = useState(data.precio_piso || '')
    const [ascensor, setAscensor] = useState((data.ascensor ? 1 : '') || 0)
    const [garaje, setGaraje] = useState((data.garaje ? 1 : '') || 0)
    const [balcon, setBalcon] = useState((data.balcon ? 1 : '') || 0)
    const [jardin, setJardin] = useState((data.jardin ? 1 : '') || 0)
    const [descripcion, setDescripcion] = useState(data.descripcion || '')

    const { id } = useParams()
    const login = useSelector(s => s.login)
    const id_usuario = login.id

    const history = useHistory()

    console.log(data)

    const handleSubmit = async e => {
        e.preventDefault()
        const pisoImagen = e.target.pisoImagen.files[0]

        const fd = new FormData()
        fd.append('imagen', pisoImagen)
        fd.append('ciudad', ciudad)
        fd.append('provincia', provincia)
        fd.append('direccion', direccion)
        fd.append('nHabitaciones', nHabitaciones)
        fd.append('m2', m2)
        fd.append('nBanos', nBanos)
        fd.append('precio_piso', precio_piso)
        fd.append('ascensor', ascensor ? 1 : 0)
        fd.append('garaje', garaje ? 1 : 0)
        fd.append('balcon', balcon ? 1 : 0)
        fd.append('jardin', jardin ? 1 : 0)
        fd.append('descripcion', descripcion)
        fd.append('id_usuario', id_usuario)

        const ret = await fetch(`http://localhost:9999/vivienda/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': login.token },
            body: fd
        })
        if (ret.ok) {
            history.push(`/home/${id}`)
        } else {
            console.log('Ha habido un error')
        }
    }

    const homeUrl = data.imagen && (`http://localhost:9999/images/${data.imagen}.jpg`)
    const homeStyle = login && data.imagen && { backgroundImage: 'url(' + homeUrl + ')' }

    const handleDelete = e => {
        e.preventDefault()
        const ret = fetch(`http://localhost:9999/vivienda/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': login.token },
        })
        if (ret.ok) {
            history.push(`/home/${id}`)
        } else {
            console.log('Ha habido un error')
        }
        history.push(`/user/${login.id}/Viviendas`)
    }

    const [open, setOpen] = useState(false)

    const handleEdit = e => {
        e.preventDefault()
        setOpen(!open)
    }


    return (
        <div className='updateHomeContainer'>
            {data && (id_usuario === data.id_usuario) && <h1>Mi vivienda</h1>}
            {data && (id_usuario !== data.id_usuario) &&
                <div>
                    <div className='obiWanBanner' />
                    <Link to='/' >Este no es el sitio que buscabas</Link>
                </div>
            }
            {data && (id_usuario === data.id_usuario) &&
                <div className='updateHomeContent'>
                    {!open &&
                        <div className='myHomeData' >
                            <div className='pisoImagen' style={data.imagen && { backgroundImage: `url(http://localhost:9999/images/${data.imagen}.jpg)` }} />
                            <ul>
                                <li>Provincia: <b>{data.provincia}</b></li>
                                <li>Ciudad: <b>{data.ciudad}</b></li>
                                <li>Dirección: <b>{data.direccion}</b></li>
                                <li>Precio: <b>{data.precio_piso}€</b></li>
                                <li>Habitaciones: <b>{data.nHabitaciones}</b></li>
                                <li>Baños: <b>{data.nBanos}</b></li>
                                <label><Rating value={data.avg_score} />
                                ({data.countScore})</label>
                            </ul>
                        </div>}
                    {open && <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <span>Subir foto:</span>
                                <div >
                                    <div className="pisoImagen" style={homeStyle} />
                                    <input name="pisoImagen" type="file" accept="image/*" />
                                </div>
                            </label>
                            <input name='ciudad' placeholder='Ciudad...' value={ciudad} onChange={e => setCiudad(e.target.value)} />
                            <input name='provincia' placeholder='Provincia...' value={provincia} onChange={e => setProvincia(e.target.value)} />
                            <input name='direccion' placeholder='Direccion...' value={direccion} onChange={e => setDireccion(e.target.value)} />
                            <input name='banos' type='number' placeholder='Baños...' value={nBanos} onChange={e => setNBanos(e.target.value)} />
                            <input name='habitaciones' type='number' placeholder='Habitaciones...' value={nHabitaciones} onChange={e => setNHabitaciones(e.target.value)} />
                            <input name='m2' type='number' placeholder='m2...' value={m2} onChange={e => setM2(e.target.value)} />
                            <input name='precio' type='number' placeholder='Precio...' value={precio_piso} onChange={e => setPrecio_piso(e.target.value)} />
                            <div>
                                <label>
                                    Ascensor
                <input type='checkbox' name='ascensor' checked={ascensor} onChange={e => setAscensor(e.target.checked)} />
                                </label>
                                <label>
                                    Garaje
                <input type='checkbox' name='garaje' checked={garaje} onChange={e => setGaraje(e.target.checked)} />
                                </label>
                                <label>
                                    Balcón
                <input type='checkbox' name='balcon' checked={balcon} onChange={e => setBalcon(e.target.checked)} />
                                </label>
                                <label>
                                    Jardín
                <input type='checkbox' name='jardin' checked={jardin} onChange={e => setJardin(e.target.checked)} />
                                </label>
                                <textarea name='descripcion' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                            </div>
                            <button>Guardar</button>
                        </form>
                        <button onClick={handleDelete}>Borrar</button>
                    </div>}
                    <button onClick={handleEdit}>Editar</button>
                    <div>
                        <HomeBoookings />
                    </div>
                </div>}
        </div>
    )
}

export default UpdateHomeWrapper