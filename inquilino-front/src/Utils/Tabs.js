import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import useFetch from '../useFetch'
import './Utils.css'

function Tabs({ id }) {
    const [active,] = useState()

    const data = useFetch(`http://localhost:9999/usuario/${id}`)

    const login = useSelector(s => s.login)

    const tabList = data ? (data[0].id === login.id ? ['Viviendas', 'Reservas'] : ['Viviendas']) : []

    return (
        <div className='tabs '>
            <NavLink to={`/user/${data && data[0].id}/${tabList[0]}`} activeClassName={active}>{tabList[0]}</NavLink>
            {data && data[0].id === login.id &&
                <NavLink to={`/user/${login && login.id}/${tabList[1]}`} activeClassName={active}>{tabList[1]}</NavLink>}
        </div>
    )
}

export default Tabs;