import { useState } from "react"

function AcceptBooking({ id }) {
    const [accepted, setAccepted] = useState(false)

    const handleAccept = async e => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:9999/reserva/accept/${id}`, {
                method: 'PUT'
            })
            console.log(id)
            if (res.ok) {
                setAccepted(true)
            }
        } catch (e) {
            console.warn(e)
        }
    }

    return (
        <div>
            {!accepted &&
                <button onClick={handleAccept}> Aceptar</button>}
            {accepted &&
                <label>Has aceptado la reserva</label>}
        </div>
    )
}

export default AcceptBooking