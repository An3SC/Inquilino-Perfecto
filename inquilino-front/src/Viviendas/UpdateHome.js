import React from 'react'
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Rating from "../Utils/Rating"
import HomeBoookings from "./HomeBoookings"
import Map from '../Utils/Map'
import NewMap from '../Utils/NewMap'

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

    const center = {
        lat: 42.1617654,
        lng: -8.6196778,
    }

    const [position, setPosition] = useState(center)
    const latitude = position.lat
    const longitude = position.lng


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
        fd.append('latitude', latitude)
        fd.append('longitude', longitude)
        fd.append('descripcion', descripcion)
        fd.append('id_usuario', id_usuario)

        const res = await fetch(`http://localhost:9999/vivienda/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': login.token },
            body: fd
        })
        if (res.ok) {
            history.push(`/home/${id}`)
        } else {
            console.log('Ha habido un error')
        }
    }

    const homeUrl = data.imagen && (`http://localhost:9999/images/${data.imagen}.jpg`)
    const homeStyle = login && data.imagen && { backgroundImage: 'url(' + homeUrl + ')' }

    const handleDelete = e => {
        e.preventDefault()
        const res = fetch(`http://localhost:9999/vivienda/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': login.token },
        })
        if (res.ok) {
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

    const hiddenUpload = React.useRef(null)

    const handleUpload = e => {
        e.preventDefault()
        hiddenUpload.current.click()
    }

    const [preview, setPreview] = useState(null)

    const handlePreview = e => {
        e.preventDefault()
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handlePosition = newPosition => {
        setPosition(newPosition)
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
                <div className='updateHomeFlex'>
                    {open && <div className='showMap'>
                        <h3>Pulsa en el marcador para darnos una ubicación</h3>
                        <NewMap center={center} position={position} onChange={handlePosition} />
                    </div>}
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
                                <div className='homePicker'>
                                    {!preview && <div>
                                        <span>Foto actual:</span>
                                        <div className="pisoImagen" style={homeStyle} />
                                    </div>}
                                    {preview && <div className='previewContainer'>
                                        <span>Foto seleccionada:</span>
                                        <div className='previewCreate' style={{ backgroundImage: `url(${preview})` }} />
                                    </div>}
                                    <input name="pisoImagen" type="file" accept="image/*" ref={hiddenUpload} onChange={handlePreview} style={{ display: 'none' }} />
                                    <button onClick={handleUpload}>Sube una foto</button>
                                </div>
                                <div className='firstInputs'>
                                    <div>
                                        <fieldset>
                                            <legend>Ciudad</legend>
                                            <input name='ciudad' placeholder='Ciudad...' value={ciudad} onChange={e => setCiudad(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Provincia</legend>
                                            <input name='provincia' placeholder='Provincia...' value={provincia} onChange={e => setProvincia(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Direccion</legend>
                                            <input name='direccion' placeholder='Direccion...' value={direccion} onChange={e => setDireccion(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Baños</legend>
                                            <input name='banos' type='number' placeholder='Baños...' value={nBanos} onChange={e => setNBanos(e.target.value)} />
                                        </fieldset>
                                    </div>
                                    <div>
                                        <fieldset>
                                            <legend>Habitaciones</legend>
                                            <input name='habitaciones' type='number' placeholder='Habitaciones...' value={nHabitaciones} onChange={e => setNHabitaciones(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Metros cuadrados</legend>
                                            <input name='m2' type='number' placeholder='m2...' value={m2} onChange={e => setM2(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <legend>Precio</legend>
                                            <input name='precio' type='number' placeholder='Precio...' value={precio_piso} onChange={e => setPrecio_piso(e.target.value)} />
                                        </fieldset>
                                        <div className='homeFormOptions'>
                                            <div>
                                                <label>
                                                    Ascensor
                                                <input type='checkbox' name='ascensor' checked={ascensor} onChange={e => setAscensor(e.target.checked)} />
                                                </label>
                                                <label>
                                                    Garaje
                                                <input type='checkbox' name='garaje' checked={garaje} onChange={e => setGaraje(e.target.checked)} />
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    Balcón
                                                <input type='checkbox' name='balcon' checked={balcon} onChange={e => setBalcon(e.target.checked)} />
                                                </label>
                                                <label>
                                                    Jardín
                                                <input type='checkbox' name='jardin' checked={jardin} onChange={e => setJardin(e.target.checked)} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <textarea rows='5' cols='50' placeholder='Cuéntanos algo sobre tu vivienda' name='descripcion' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                                </div>
                                <div className='updateHomeButtons'>
                                    <div className='deleteHomeButton' onClick={(e) => { if (window.confirm('¿De veras quieres borrarla?')) handleDelete(e) }}>Borrar</div>
                                    <button>Guardar</button>
                                </div>
                            </form>
                        </div>}
                        {!open && <button className='editButton1' onClick={handleEdit} />}
                        {open && <button className='editButton2' onClick={handleEdit} />}
                        {!open && <div>
                            <HomeBoookings />
                        </div>}
                    </div>
                </div>}
            <div>
                <Map />
            </div>
        </div>
    )
}

export default UpdateHomeWrapper