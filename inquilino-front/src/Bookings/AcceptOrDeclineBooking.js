import { useState } from "react"
import { useSelector } from "react-redux"

function AcceptOrDeclineBooking({ id }) {
    const [accepted, setAccepted] = useState(false)
    const [declined, setDeclined] = useState(false)

    const [done, setDone] = useState(false)

    const login = useSelector(s => s.login)

    const handleAccept = async e => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:9999/reserva/accept/${id}`, {
                headers: { 'Authorization': login.token },
                method: 'PUT'
            })
            console.log('Hace el accept')
            if (res.ok) {
                setAccepted(true)
                setDone(true)
            }
        } catch (e) {
            console.warn(e)
        }
    }

    const handleDecline = async e => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:9999/reserva/decline/${id}`, {
                headers: { 'Authorization': login.token },
                method: 'PUT'
            })
            console.log('Hace el decline')
            if (res.ok) {
                setDeclined(true)
                setDone(true)
            }
        } catch (e) {
            console.warn(e)
        }
    }

    return (
        <div>
            {!done &&
                <div>
                    <button onClick={handleAccept}> Aceptar</button>
                    <button onClick={handleDecline}> Rechazar</button>
                </div>}
            {accepted &&
                <label>Has aceptado la reserva</label>}
            {declined &&
                <label>Has rechazado la reserva</label>}
        </div>
    )
}

export default AcceptOrDeclineBooking