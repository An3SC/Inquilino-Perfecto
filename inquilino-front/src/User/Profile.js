import { Route, Switch, useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Tabs from "../Utils/Tabs"
import './User.css'

function Profile() {
    const { id } = useParams()

    const userData = useFetch(`http://localhost:9999/usuario/${id}`) || []
    const user = userData[0]

    const history = useHistory()

    const handleUpdate = e => {
        e.preventDefault()
        history.push(`/user/update/${id}`)
    }

    const userUrl = user && (`http://localhost:9999/images/${user.imagen}.jpg`)

    return (
        <div className='profileContainer'>
            {user &&
                <div>
                    <ul>
                        <img alt='avatar' src={userUrl} />
                        <li>{user.nombre}</li>
                        <li>{user.provincia}</li>
                        <li>{user.ciudad}</li>
                        <li>{user.descripcion}</li>
                    </ul>
                </div>}
            <div onClick={handleUpdate}>
                <button>Actualizar mis datos</button>
            </div>
            <div>
                <Tabs />
            </div>
            <Switch>
                <Route path={`/user/${id}/Viviendas`}>
                    Aquí van las viviendas
                </Route>
                <Route path={`/user/${id}/Opiniones`}>
                    Aquí van las opiniones
                </Route>
                <Route path={`/user/${id}/Reservas`}>
                    Aquí van las reservas
                </Route>
            </Switch>
        </div>
    )
}

export default Profile