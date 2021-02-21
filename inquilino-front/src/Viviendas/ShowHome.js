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

    const login = useSelector(s => s.login)

    // const viviendaUsuario = vivienda[0].id_usuario

    // console.log(viviendaUsuario)

    // if (login.id === viviendaUsuario) {
    //     setSameUser(true)
    // } else {
    //     console.log('No es el mismo usuario')
    // }

    return (
        <div className='showHomeContainer'>
            {vivienda.map(v =>
                <div key={v.id}>
                    <div>{v.ciudad}</div>
                    <div>{v.provincia}</div>
                    <div>{v.direccion}</div>
                    <Rating value={v.score_piso} />
                </div>
            )}
            {!sameUser &&
                <Reservar />
            }
            {sameUser &&
                <Link to={`/updateHome/${id}`}>Editar</Link>
            }
        </div>
    )
}

export default ShowHome