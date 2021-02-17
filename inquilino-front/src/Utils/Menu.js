import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

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

    return (
        <div onClick={handleOpen}>
            <button>{children}</button>
            {open &&
                <div className='userLinks'>
                    <Link to={`/user/${login.id}`}>Mi perfil</Link>
                    <Link to={`/user/homes/${login.id}`}>Mis pisos</Link>
                    <Link to={`/userBookings`}>Mis reservas</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            }

        </div>
    )
}

export default Menu