import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function DeleteBooking({ id }) {

    const login = useSelector(s => s.login)

    const history = useHistory()

    const handleDelete = async e => {
        e.preventDefault()
        const res = await fetch(`http://localhost:9999/reserva/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': login.token }
        })
        if (res.ok) {
            history.push(`/user/${login.id}/Reservas`)
        } else {
            console.log('Ha habido un error')
        }
    }

    return (
        <div>
            <div className='deleteHomeButton' onClick={(e) => { if (window.confirm('¿De veras quieres borrarla?')) handleDelete(e) }}>Borrar</div>
        </div>
    )
}

export default DeleteBooking