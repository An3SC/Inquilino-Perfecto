import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import './Utils.css'

function Menu({ children }) {
    const [open, setOpen] = useState(false)

    const login = useSelector(s => s.login)
    const dispatch = useDispatch()

    const handleOpen = e => {
        e.preventDefault()
        setOpen(!open)
    }

    const history = useHistory()

    const handleLogout = () => {
        dispatch({ type: 'logout' })
        history.push('/')
    }

    return (
        <div onClick={handleOpen}>
            <button className='burgerUser'>{children}</button>
            {open &&
                <div className='userLinks'>
                    <Link to='/createHome'>Publicar vivienda</Link>
                    <Link to={`/user/${login.id}`}>Mi perfil</Link>
                    <Link to={`/user/homes/${login.id}`}>Mis pisos</Link>
                    <Link to='/userBookings'>Mis reservas</Link>
                    <button className='logout' onClick={handleLogout}>Logout</button>
                </div>
            }

        </div>
    )
}

export default Menu