import { useParams } from "react-router-dom"
import Reservar from "../Bookings/Reservar"
import useFetch from "../useFetch"

function ShowHome() {
    const { id } = useParams()

    const vivienda = useFetch(`http://localhost:9999/vivienda/${id}`) || []

    return (
        <div className='showHomeContainer'>
            {vivienda.map(v =>
                <div>
                    <div>{v.ciudad}</div>
                    <div>{v.provincia}</div>
                    <div>{v.direccion}</div>
                </div>
            )}
            <Reservar />
        </div>
    )
}

export default ShowHome