import { Link, useParams } from "react-router-dom"
import useFetch from "../useFetch"

function MyHomes() {
    const { id } = useParams()

    const homesData = useFetch(`http://localhost:9999/usuario/vivienda/${id}`) || []

    return (
        <div className='myHomesContainer'>
            <h1>Mis pisos</h1>
            {homesData && homesData.map(h =>
                <div className='myHomes' key={h.id} >
                    <ul>
                        <li>Provincia: {h.provincia}</li>
                        <li>Ciudad: {h.ciudad}</li>
                        <li>Dirección: {h.direccion}</li>
                        <li>Precio: {h.precio_piso}</li>
                    </ul>
                    <Link to={`/updateHome/${h.id}`}>Ver más</Link>
                </div>
            )}
        </div>
    )
}

export default MyHomes