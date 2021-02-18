import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Utils.css'

function Tabs() {
    const [active,] = useState()

    const login = useSelector(s => s.login)

    const tabList = ['Viviendas', 'Opiniones', 'Reservas']

    return (
        <div className='tabs '>
            {tabList.map(tab =>
                <NavLink to={`/user/${login && login.id}/${tab}`} activeClassName={active}>{tab}</NavLink>
            )}
        </div>
    )
}

export default Tabs;