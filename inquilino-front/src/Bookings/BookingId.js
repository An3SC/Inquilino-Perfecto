import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Valorar from "../Utils/Valorar"
import DeleteBooking from "./DeleteBooking"
import moment from 'moment'

function BookingIdWrapper() {
    const { id } = useParams()
    const reserva = useFetch(`http://localhost:9999/reserva/${id}`)
    return reserva ? <BookingId reserva={reserva} /> : false
}

function BookingId({ reserva }) {
    const { id } = useParams()

    console.log(reserva)

    const login = useSelector(s => s.login)

    return (
        <div className='bookingIdContainer'>
            { reserva && (login.id === reserva.id_usuario) && <h1>Mi reserva</h1>}
            { reserva && (login.id !== reserva.id_usuario) &&
                <div>
                    <div className='obiWanBanner' />
                    <Link to='/' >Este no es el sitio que buscabas</Link>
                </div>
            }
            { reserva && (login.id === reserva.id_usuario) &&
                <div className='bookingIdContent'>
                    <div className={reserva.estado === 'aceptado' ? 'aceptada' : (reserva.estado === 'declinado' ? 'declinada' : 'pendiente')}>
                        <div className='bookingImagen' style={reserva.imagen && { backgroundImage: `url(http://localhost:9999/images/${reserva.imagen}.jpg)` }} />
                    </div>
                    <div>
                        <ul key={reserva.id_reserva}>
                            <li>Ciudad: <b>{reserva.ciudad}</b></li>
                            <li>Dirección: <b>{reserva.direccion}</b></li>
                            <li>Fecha de entrada: <b>{moment(reserva.fecha_entrada).format("DD-MM-YYYY")}</b></li>
                            <li>Fecha de salida: <b>{moment(reserva.fecha_salida).format("DD-MM-YYYY")}</b></li>
                            <li>Precio: <b>{reserva.precio_reserva}€</b></li>
                            <li>Estado: <b>{reserva.estado}</b></li>
                        </ul>
                        <div >
                            <Link to={`/home/${reserva.id_piso}`}><p className='homeOwner'>Ver anuncio</p></Link>
                        </div>
                        {reserva && reserva.estado === 'pendiente' &&
                            <DeleteBooking id={id} />
                        }
                        {reserva && reserva.estado === 'aceptado' && <div>
                            <Valorar previousScore={reserva.score_piso} id={reserva.id_reserva} />
                        </div>}
                    </div>
                </div>}
            <div className='boyCouch' />
        </div>
    )
}

export default BookingIdWrapper