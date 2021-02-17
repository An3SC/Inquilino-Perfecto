import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"

function Menu({ children }) {
    const [open, setOpen] = useState(false)

    const login = useSelector(s => s.login)
    const dispatch = useDispatch()

    const handleOpen = e => {
        e.preventDefault()
        setOpen(!open)
    }

    const handleLogout = () => {
        dispatch({ type: 'logout' })
    }

    const history = useHistory()

    const handleProfile = e => {
        e.preventDefault()
        history.push(`/user/${login.id}`)
    }

    const handlePisos = e => {
        e.preventDefault()
        history.push(`/user/homes/${login.id}`)
    }

    const handleBookings = e => {
        e.preventDefault()
        history.push(`/userBookings`)
    }


    return (
        <div onClick={handleOpen}>
            <button>{children}</button>
            {open &&
                <div>
                    <Link onClick={handleProfile}>Mi perfil</Link>
                    <Link onClick={handlePisos}>Mis pisos</Link>
                    <Link onClick={handleBookings}>Mis reservas</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            }

        </div>
    )
}

export default Menu