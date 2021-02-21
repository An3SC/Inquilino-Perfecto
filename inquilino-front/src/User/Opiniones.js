import { Link } from "react-router-dom"
import useFetch from "../useFetch"
import './User.css'

function Opiniones() {
    const opiniones = useFetch() || []

    return (
        <div className='opinionesContainer'>
            <h1>Mis opiniones</h1>
            {/* {opiniones && opiniones.map(o =>
                <div className='opinionesContent'>
                    <Link key={b.id} to={`/opiniones/${o.id_reserva}`}>
                        <ul>

                        </ul>
                    </Link>
                </div>
            )} */}
        </div>
    )
}

export default Opiniones