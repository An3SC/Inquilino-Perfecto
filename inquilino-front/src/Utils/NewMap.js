import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useCallback, useMemo, useRef, useState } from "react"
import './Map.css'

function NewMap({ center, position, onChange }) {

    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    onChange(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <div className='pageMap'>
            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={position}
                    onChange={eventHandlers}
                    ref={markerRef}>
                    <Popup minWidth={90}>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? 'Llévame contigo'
                                : 'Pulsa aquí para poder moverme'}
                        </span>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default NewMap