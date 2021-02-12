import { useParams } from "react-router-dom"
import useFetch from "../useFetch"

function ShowHome() {
    const { id } = useParams()

    const vivienda = useFetch(`http://localhost:9999/vivienda/` + `${id}`) || []
    console.log(vivienda)

    return (
        <div>
            {vivienda.map(v =>
                <div>
                    <div>{v.ciudad}</div>
                    <div>{v.provincia}</div>
                    <div>{v.direccion}</div>
                </div>
            )}
        </div>
    )
}

export default ShowHome