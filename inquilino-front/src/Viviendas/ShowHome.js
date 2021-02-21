import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Reservar from "../Bookings/Reservar"
import useFetch from "../useFetch"
import Rating from "../Utils/Rating"

function ShowHome() {
    const { id } = useParams()

    const [sameUser, setSameUser] = useState(false)

    const vivienda = useFetch(`http://localhost:9999/vivienda/${id}`) || []

    console.log(vivienda)

    const login = useSelector(s => s.login)

    // const viviendaUsuario = vivienda[0].id_usuario

    // console.log(viviendaUsuario)

    // if (login.id === viviendaUsuario) {
    //     setSameUser(true)
    // } else {
    //     console.log('No es el mismo usuario')
    // }

    return (
        <div >
            {vivienda.map(v =>
                <div className='showHomeContainer'>
                    <h1 id='direccionShow'>{v.direccion}</h1>
                    <div className='showHomeContent'>
                        <div className='showHomeData'>
                            <div className='resultImage' />
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

export default ShowHome