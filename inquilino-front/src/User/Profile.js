import { useParams } from "react-router-dom"
import useFetch from "../useFetch"
import Tabs from "../Utils/Tabs"

function Profile() {
    const { id } = useParams()

    const userData = useFetch(`http://localhost:9999/usuario/${id}`) || []
    const user = userData[0]

    return (
        <div className='profileContainer'>
            {user &&
                <div>
                    <ul>
                        <li>{user.nombre}</li>
                        <li>{user.provincia}</li>
                        <li>{user.ciudad}</li>
                        <li>{user.descripcion}</li>
                    </ul>
                </div>}
            <div>
                <Tabs />
            </div>
        </div>
    )
}

export default Profile