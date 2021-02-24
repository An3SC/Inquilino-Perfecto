import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useCallback, useMemo, useRef, useState } from "react"
import './Map.css'

function NewMap() {
    const center = {
        lat: 42.1617654,
        lng: -8.6196778,
    }

    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
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
            <MapContainer center={center} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}>
                    <Popup minWidth={90}>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? 'Marker is draggable'
                                : 'Click here to make marker draggable'}
                        </span>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default NewMap