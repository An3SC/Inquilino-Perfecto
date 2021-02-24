import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import useFetch from '../useFetch'
import './Map.css'

function MapWrapper({ id }) {
    const data = useFetch(`http://localhost:9999/vivienda/${id}`)
    return data ? <Map data={data[0]} /> : false
}

function Map({ data }) {

    return (
        <div className='pageMap'>
            <MapContainer center={[data.latitude, data.longitude]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[data.latitude, data.longitude]} />
            </MapContainer>
        </div>
    )
}

export default MapWrapper