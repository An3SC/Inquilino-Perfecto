import { Link, useHistory, useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Tabs from "../Utils/Tabs"
import Update from "./Update"

function Profile() {
    const { id } = useParams()

    const userData = useFetch(`http://localhost:9999/usuario/${id}`) || []
    const user = userData[0]

    const history = useHistory()

    const handleUpdate = e => {
        e.preventDefault()
        history.push(`/user/update/${id}`)
    }

    return (
        <div className='profileContainer'>
            {user &&
                <div>
                    <ul>
                        <img src={user.imagen} />
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
        </div>
    )
}

export default Profile