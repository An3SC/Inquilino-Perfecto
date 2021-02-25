import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import useFetch from "../useFetch"

function MyHomes() {
    const { id } = useParams()
    const [page, setPage] = useState(1)

    const login = useSelector(s => s.login)

    const homesData = useFetch(`http://localhost:9999/usuario/vivienda/${id}`) || []

    const paginatedResults = homesData ? homesData.slice(3 * (page - 1), 3 * page) : []
    const max = homesData ? Math.ceil(homesData.length / 3) : []

    return (
        <div className='myHomesContainer'>
            <h1>Mis viviendas</h1>
            {homesData &&
                <div className='pagination'>
                    <button className='back' onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                    <span>{page} / {max}</span>
                    <button className='forward' onClick={() => setPage(page < max ? page + 1 : max)} />
                </div>}
            {homesData && paginatedResults.map(h =>
                <div className='myHomes' key={h.id} >
                    <ul>
                        <li>Ciudad: <b>{h.ciudad}</b></li>
                        <li>Dirección: <b>{h.direccion}</b></li>
                        <li>Precio: <b>{h.precio_piso}€</b></li>
                    </ul>
                    {h.id_usuario === login.id &&
                        <Link to={`/myHome/${h.id}`}>Ver más</Link>}
                    {h.id_usuario !== login.id &&
                        <Link to={`/home/${h.id}`}>Ver más</Link>}
                </div>
            )}
        </div>
    )
}

export default MyHomes