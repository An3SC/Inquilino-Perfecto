import { useSelector } from "react-redux"
import { Route, Switch, useHistory, useParams } from "react-router-dom"
import MyBookings from "../Bookings/MyBookings"
import useFetch from "../useFetch"
import Tabs from "../Utils/Tabs"
import MyHomes from "../Viviendas/MyHomes"
import './User.css'

function Profile() {
    const { id } = useParams()

    const userData = useFetch(`http://localhost:9999/usuario/${id}`) || []
    const user = userData[0]

    const login = useSelector(s => s.login)

    const history = useHistory()

    const handleUpdate = e => {
        e.preventDefault()
        history.push(`/user/update/${id}`)
    }

    return (
        <div className='profileContainer'>
            <h1>Mi perfil</h1>
            <div className='profileUser'>
                {user &&
                    <div className='userDataContainer'>
                        <div className='avatar' style={user && user.imagen && { backgroundImage: `url(http://localhost:9999/images/${user.imagen}.jpg)` }} />
                        <ul>
                            <li><b>{user.nombre}</b></li>
                            <li>Provincia: <b>{user.provincia}</b></li>
                            <li>Ciudad: <b>{user.ciudad}</b></li>
                            <li>Sobre mí: <b>{user.descripcion}</b></li>
                        </ul>
                        {(user.id === login.id) &&
                            <button onClick={handleUpdate}>Actualizar mis datos</button>}
                    </div>}
                <div className='tabsContainer'>
                    <div>
                        <Tabs />
                    </div>
                    <Switch>
                        <Route path={`/user/:id/Viviendas`}>
                            <div className='tabOption'>
                                <MyHomes />
                            </div>
                        </Route>
                        <Route path={`/user/${id}/Reservas`}>
                            <div className='tabOption'>
                                <MyBookings />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Profile