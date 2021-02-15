import { useState } from 'react'
import './Tabs.css'

function Tabs({ tabList, onChange }) {
    const [value, setValue] = useState('disabled')
    tabList = tabList || ['Tus pisos', 'Opiniones', 'Reservas']
    const handleClick = tab => {
        setValue(tab)
        if (onChange) onChange(tab)
    }
    return (
        <div className='tabs '>
            {tabList.map(tab =>
                <div className={value === tab ? 'enabled' : ''} onClick={() => handleClick(tab)}>{tab}</div>

            )}
        </div>
    )
}

export default Tabs;