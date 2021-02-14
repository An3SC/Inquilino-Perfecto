import { useParams } from "react-router-dom"
import useFetch from "../useFetch"

function Validate() {
    const { code } = useParams()

    const validated = useFetch(`http://localhost:9999/usuario/validate/${code}`) || []

    return (
        <div className='validateContainer'>
            {validated &&
                <div>Tu email ha sido validado correctamente</div>
            }
        </div>
    )
}

export default Validate

// function Validate() {
//     const { code } = useParams()

//     const handleValidate = async e => {
//         e.preventDefault()
//         try {
//             await fetch(`http://localhost:9999/usuario/validate/${code}`)
//         } catch (e) {
//             console.warn(e)
//         }
//     }

//     return (
//         <div>
//             <button onClick={handleValidate}>¡Valídame!</button>
//         </div>
//     )
// }

// export default Validate