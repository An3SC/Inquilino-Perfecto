import { useParams } from "react-router-dom"
import useFetch from "../useFetch"
import './Login.css'

function Validate() {
    const { code } = useParams()

    const validated = useFetch(`http://localhost:9999/usuario/validate/${code}`) || []

    return (
        <div className='validateContainer'>
            {validated &&
                <div>¡Tu email ha sido validado correctamente!</div>
            }
        </div>
    )
}

export default Validate