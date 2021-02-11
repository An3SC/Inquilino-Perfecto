import { useState } from "react"
import { useSelector } from "react-redux"

function CreateHome() {
    const [ciudad, setCiudad] = useState('')
    const [provincia, setProvincia] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nHabitaciones, setNHabitaciones] = useState('')
    const [m2, setM2] = useState('')
    const [nBanos, setNBanos] = useState('')
    const [precio_piso, setPrecio_piso] = useState('')
    const [ascensor, setAscensor] = useState('no')
    const [garaje, setGaraje] = useState('no')
    const [balcon, setBalcon] = useState('no')
    const [jardin, setJardin] = useState('no')
    const [descripcion, setDescripcion] = useState('')

    const login = useSelector(s => s.login)

    const handleSubmit = async e => {
        e.preventDefault()
        const headers = { 'Content-Type': 'application/json' }
        if (login) headers['Authorization'] = login.token
        const ret = await fetch('http://localhost:9999/vivienda', {
            headers,
            body: JSON.stringify({
                provincia, ciudad, direccion, precio_piso,
                nBanos, nHabitaciones, ascensor, garaje,
                balcon, jardin, m2, descripcion
            }),
            method: 'POST'
        })
        setCiudad('')
        setProvincia('')
        setNBanos('')
        setNHabitaciones('')
        setM2('')
        setPrecio_piso('')
        setAscensor('')
        setGaraje('')
        setBalcon('')
        setJardin('')
    }

    return (
        <form onSubmit={handleSubmit}>
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
                <input type='checkbox' name='ascensor' value={ascensor} onChange={e => setAscensor('si')} />
                </label>
                <label>
                    Garaje
                <input type='checkbox' name='garaje' value={garaje} onChange={e => setGaraje('si')} />
                </label>
                <label>
                    Balcón
                <input type='checkbox' name='balcon' value={balcon} onChange={e => setBalcon('si')} />
                </label>
                <label>
                    Jardín
                <input type='checkbox' name='jardin' value={jardin} onChange={e => setJardin('si')} />
                </label>
                <textarea name='descripcion' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
            </div>
            <button>Publicar</button>
        </form>
    )
}

export default CreateHome