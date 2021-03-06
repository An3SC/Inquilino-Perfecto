import React from 'react'
import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import NewMap from "../Utils/NewMap"

function CreateHome() {
    const center = {
        lat: 42.1617654,
        lng: -8.6196778,
    }

    const [ciudad, setCiudad] = useState('')
    const [provincia, setProvincia] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nHabitaciones, setNHabitaciones] = useState('')
    const [m2, setM2] = useState('')
    const [nBanos, setNBanos] = useState('')
    const [precio_piso, setPrecio_piso] = useState('')
    const [ascensor, setAscensor] = useState(false)
    const [garaje, setGaraje] = useState(false)
    const [balcon, setBalcon] = useState(false)
    const [jardin, setJardin] = useState(false)
    const [descripcion, setDescripcion] = useState('')

    const [position, setPosition] = useState(center)
    const latitude = position.lat
    const longitude = position.lng

    const [error, setError] = useState()

    const login = useSelector(s => s.login)

    const history = useHistory()

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
        fd.append('descripcion', descripcion ? descripcion : [])

        const res = await fetch('http://localhost:9999/vivienda', {
            headers: { 'Authorization': login.token },
            body: fd,
            method: 'POST'
        })
        if (res.ok) {
            history.push(`/user/${login.id}/Viviendas`)
        } else {
            console.log('Error')
            setError(true)
        }
    }

    const handlePosition = newPosition => {
        setPosition(newPosition)
    }

    const [preview, setPreview] = useState(null)

    const handlePreview = e => {
        e.preventDefault()
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const hiddenUpload = React.useRef(null)

    const handleUpload = e => {
        e.preventDefault()
        hiddenUpload.current.click()
    }

    return (
        <div className='createHome'>
            <h1>Anúnciate</h1>
            <div className='createHomeContainer'>
                <div className='showMap'>
                    <h3>Pulsa en el marcador</h3>
                    <NewMap center={center} position={position} onChange={handlePosition} />
                </div>
                <div className='createHomeForm'>
                    <h1>Rellena los datos</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <div className='previewContainer'>
                                <span>Foto seleccionada:</span>
                                {preview &&
                                    <div className='previewCreate' style={{ backgroundImage: `url(${preview})` }} />}
                            </div>
                            <div>
                                <input name="pisoImagen" type="file" onChange={handlePreview} ref={hiddenUpload} style={{ display: 'none' }} accept="image/*" />
                                <button onClick={handleUpload}>Sube una foto</button>
                            </div>
                        </label>
                        <input name='ciudad' type='text' placeholder='Ciudad...' value={ciudad} onChange={e => setCiudad(e.target.value)} />
                        <input name='provincia' type='text' placeholder='Provincia...' value={provincia} onChange={e => setProvincia(e.target.value)} />
                        <input name='direccion' type='text' placeholder='Direccion...' value={direccion} onChange={e => setDireccion(e.target.value)} />
                        <input name='banos' type='number' placeholder='Baños...' value={nBanos} onChange={e => setNBanos(e.target.value)} />
                        <input name='habitaciones' type='number' placeholder='Habitaciones...' value={nHabitaciones} onChange={e => setNHabitaciones(e.target.value)} />
                        <input name='m2' type='number' placeholder='m2...' value={m2} onChange={e => setM2(e.target.value)} />
                        <input name='precio' type='number' placeholder='Precio...' value={precio_piso} onChange={e => setPrecio_piso(e.target.value)} />
                        <div className='homeFormOptions'>
                            <label>
                                <span>
                                    Ascensor
                                <input type='checkbox' name='ascensor' checked={ascensor} onChange={e => setAscensor(e.target.checked)} />
                                </span>
                                <span>
                                    Garaje
                                <input type='checkbox' name='garaje' checked={garaje} onChange={e => setGaraje(e.target.checked)} />
                                </span>
                            </label>
                            <label>
                                <span>
                                    Balcón
                                <input type='checkbox' name='balcon' checked={balcon} onChange={e => setBalcon(e.target.checked)} />
                                </span>
                                <span>
                                    Jardín
                                <input type='checkbox' name='jardin' checked={jardin} onChange={e => setJardin(e.target.checked)} />
                                </span>
                            </label>
                        </div>
                        <textarea name='descripcion' rows='4' cols='45' placeholder='¡Cuéntanos lo que te gusta de tu casa!' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                        {error &&
                            <div className='errorCreacion'>Error en la creación</div>
                        }
                        <button className='publicarHome'>Publicar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateHome