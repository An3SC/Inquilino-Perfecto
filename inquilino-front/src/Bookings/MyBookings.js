import useFetch from "../useFetch"

function MyBookings() {
    const bookingsData = useFetch(`http://localhost:9999/reserva`) || []
    console.log(bookingsData)

    return (
        <div className='myBookingsContainer'>
            Mis reservas
            {bookingsData && bookingsData.map(b =>
                <ul>
                    <li>{b.ciudad}</li>
                    <li>{b.direccion}</li>
                    <li>{b.fecha_entrada}</li>
                    <li>{b.fecha_salida}</li>
                    <li>{b.precio_reserva}</li>
                </ul>
            )}
        </div>
    )
}

export default MyBookings