import { useParams } from "react-router-dom"
import useFetch from "../useFetch"

function MyHomes() {
    const { id_usuario } = useParams()
    console.log(id_usuario)

    const homesData = useFetch(`http://localhost:9999/usuario/vivienda/${id_usuario}`) || []
    console.log(homesData)
    const myHomes = homesData

    return (
        <div className='myHomesContainer'>
            {homesData && homesData.map(h =>
                <ul>
                    <li>{h.provincia}</li>
                    <li>{h.ciudad}</li>
                    <li>{h.direccion}</li>
                </ul>
            )}
        </div>
    )
}

export default MyHomes