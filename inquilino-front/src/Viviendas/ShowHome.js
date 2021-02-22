import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Reservar from "../Bookings/Reservar"
import useFetch from "../useFetch"
import Rating from "../Utils/Rating"

function ShowHomeWrapper() {
    const { id } = useParams()
    const data = useFetch(`http://localhost:9999/vivienda/${id}`)
    return data ? <ShowHome data={data} /> : false
}

function ShowHome({ data }) {
    const { id } = useParams()

    const [sameUser, setSameUser] = useState(false)

    console.log(data)

    const login = useSelector(s => s.login)

    const viviendaUsuario = data.id_usuario

    if (login.id === viviendaUsuario) {
        setSameUser(true)
    } else {
        console.log('No es el mismo usuario')
    }

    const homeUrl = data[0].imagen && (`http://localhost:9999/images/${data[0].imagen}.jpg`)
    const homeStyle = login && data[0].imagen && { backgroundImage: 'url(' + homeUrl + ')' }

    return (
        <div >
            {data.map(v =>
                <div className='showHomeContainer'>
                    <h1 id='direccionShow'>{v.direccion}</h1>
                    <div className='showHomeContent'>
                        <div className='showHomeData'>
                            <div className='resultImage' style={homeStyle} />
                            <ul key={v.id}>
                                <li><b>{v.ciudad}</b></li>
                                <li><b>{v.provincia}</b></li>
                                <li><b>{v.direccion}</b></li>
                                <li><b>{v.precio_piso}</b></li>
                                <li><b>{v.score_piso}</b></li>
                            </ul>
                        </div>
                        <label className='showHomeStars'>
                            <Rating value={v.score_piso} />
                        </label>
                        {!sameUser &&
                            <Reservar />
                        }
                        {sameUser &&
                            <Link to={`/updateHome/${id}`}>Editar</Link>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowHomeWrapper