import { useState } from "react"

function DeclineBooking({ id }) {
    const [declined, setDeclined] = useState(false)

    const handleDecline = async e => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:9999/reserva/decline/${id}`, {
                method: 'PUT'
            })
            console.log(id)
            if (res.ok) {
                setDeclined(true)
            }
        } catch (e) {
            console.warn(e)
        }
    }
    return (
        <div>
            {!declined &&
                <button onClick={handleDecline}> Rechazar</button>}
            {declined &&
                <label>Has rechazado la reserva</label>}
        </div>
    )
}

export default DeclineBooking