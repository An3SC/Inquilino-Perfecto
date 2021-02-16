import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function CreateHome() {
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

    const [error, setError] = useState()

    const login = useSelector(s => s.login)

    const history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        const headers = { 'Content-Type': 'application/json' }
        if (login) headers['Authorization'] = login.token
        const ret = await fetch('http://localhost:9999/vivienda', {
            headers,
            body: JSON.stringify({
                provincia, ciudad, direccion, precio_piso,
                nBanos, nHabitaciones, ascensor, garaje,
                balcon, jardin, m2, descripcion: descripcion ? descripcion : []
            }),
            method: 'POST'
        })
        if (ret.ok) {
            // console.log(ret.body)
            // const data = await ret.json()
            // console.log(data)
            // history.push('//home/:id')
        } else {
            console.log('Error')
            setError(true)
        }
    }

    return (
        <div className='createHomeContainer'>
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
                {error &&
                    <div>Error en la creación</div>
                }
                <button>Publicar</button>
            </form>
        </div>

    )
}

export default CreateHome