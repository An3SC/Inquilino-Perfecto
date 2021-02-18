import { Link, useParams } from "react-router-dom"
import useFetch from "../useFetch"

function MyHomes() {
    const { id_usuario } = useParams()

    const homesData = useFetch(`http://localhost:9999/usuario/vivienda/${id_usuario}`) || []

    return (
        <div className='myHomesContainer'>
            {homesData && homesData.map(h =>
                <div key={h.id} >
                    <ul>
                        <li>{h.provincia}</li>
                        <li>{h.ciudad}</li>
                        <li>{h.direccion}</li>
                    </ul>
                    <Link to={`/updateHome/${h.id}`}>Editar</Link>
                </div>
            )}
        </div>
    )
}

export default MyHomes