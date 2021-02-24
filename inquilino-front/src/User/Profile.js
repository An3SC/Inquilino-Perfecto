import { useSelector } from "react-redux"
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom"
import MyBookings from "../Bookings/MyBookings"
import useFetch from "../useFetch"
import Tabs from "../Utils/Tabs"
import MyHomes from "../Viviendas/MyHomes"
import Rating from '../Utils/Rating'
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
                            <li className='descriptionUser'>Sobre mí: <b>{user.descripcion}</b></li>
                        </ul>
                        <div className='ratingUser'>
                            <Rating value={user.score_usuario} />
                            ({user.count_score_usuario})
                        </div>
                        {(user.id === login.id) &&
                            <div className='userDataButtons'>
                                <button onClick={handleUpdate}>Actualizar mis datos</button>
                                <Link to='/recovery'><button>Cambiar mi contraseña</button></Link>
                                <Link to={`/changeMail/${login.id}`}><button>Cambiar mi email</button></Link>
                            </div>}
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