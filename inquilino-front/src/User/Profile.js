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
            <h1>Mi perfil</h1>
            <div className='profileUser'>
                {user &&
                    <div className='userDataContainer'>
                        <ul>
                            <img alt='avatar' src={userUrl} />
                            <li>{user.nombre}</li>
                            <li>Provincia: {user.provincia}</li>
                            <li>Ciudad: {user.ciudad}</li>
                            <li>Sobre mí: {user.descripcion}</li>
                        </ul>
                        <button onClick={handleUpdate}>Actualizar mis datos</button>
                    </div>}
                <div className='tabsContainer'>
                    <div>
                        <Tabs />
                    </div>
                    <Switch>
                        <Route path={`/user/${id}/Viviendas`}>
                            <div className='tabOption'>
                                Aquí van las viviendas
                            </div>
                        </Route>
                        <Route path={`/user/${id}/Opiniones`}>
                            <div className='tabOption'>
                                Aquí van las opiniones
                            </div>
                        </Route>
                        <Route path={`/user/${id}/Reservas`}>
                            <div className='tabOption'>
                                Aquí van las reservas
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Profile