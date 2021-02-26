import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Reservar from "../Bookings/Reservar"
import useFetch from "../useFetch"
import Rating from "../Utils/Rating"
import Map from '../Utils/Map'

function ShowHomeWrapper() {
    const { id } = useParams()
    const data = useFetch(`http://localhost:9999/vivienda/${id}`)
    return data ? <ShowHome data={data} /> : false
}

function ShowHome({ data }) {
    const { id } = useParams()

    const login = useSelector(s => s.login)

    return (
        <div >
            {data.map(v =>
                <div className='showHomePage'>
                    <h1 id='direccionShow'>{v.direccion}</h1>
                    <div className='showHomeContainer'>
                        <div className='showMap'>
                            <h3>Localización</h3>
                            <Map id={id} />
                        </div>
                        <div className='showHomeContent'>
                            <div className='showHomeData'>
                                <div className='pisoImagen' style={data[0].imagen && { backgroundImage: `url(http://localhost:9999/images/${data[0].imagen}.jpg)` }} />
                                <ul key={v.id}>
                                    <li>Ciudad: <b>{v.ciudad}</b></li>
                                    <li>Provincia: <b>{v.provincia}</b></li>
                                    <li>Direccion: <b>{v.direccion}</b></li>
                                    <li>Habitaciones: <b>{v.nHabitaciones}</b></li>
                                    <li>Baños: <b>{v.nBanos}</b></li>
                                    <li>Precio: <b>{v.precio_piso}€</b></li>
                                    <li><b>{v.score_piso}</b></li>
                                </ul>
                            </div>
                            <label className='showHomeStars'>
                                <Rating value={v.avg_score} />
                                ({v.countScore})
                            </label>
                            {v.id_usuario !== login.id &&
                                <div className='whoOwns'>
                                    <p>Este piso pertece a</p>
                                    <Link to={`/user/${v.id_usuario}`}><p className='homeOwner'>{v.nombre}</p></Link>
                                </div>}
                            {v.id_usuario !== login.id &&
                                <Reservar />
                            }
                            {v.id_usuario === login.id &&
                                <Link to={`/myHome/${id}`}><button className='editButton1' /></Link>
                            }
                            {v.id_usuario === login.id &&
                                <div className='boyCat' />
                            }
                        </div>
                    </div>
                </div>
            )
            }

        </div >
    )
}

export default ShowHomeWrapper