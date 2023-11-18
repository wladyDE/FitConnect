import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import GeolocationMarker from "./markers/geoMarker/GeolocationMarker";
import Spinner from '../spinner/Spinner';
import TrainingMarkers from "./markers/GoogleMapMarkers";

import 'leaflet/dist/leaflet.css';
import './map.scss';
import GeoLocation from "./geoLocation/GeoLocation";

const Map = () => {
    const [position, setPosition] = useState([51.5134, 7.4686]);
    const [isLoading, setLoading] = useState(true);
    const [plusBtn, setPlusBtn] = useState(false);
    const [mapClick, setMapClick] = useState(null);
    const [selected, setSelected] = useState(null);
    const [map, setMap] = useState(null)

    useEffect(() => {
        getGeoLocation();
    }, []);

    useEffect(() => {
        changeMapCursor();
    }, [plusBtn]);

    const getGeoLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition([latitude, longitude]);
                    setLoading(false);
                },
                (error) => {
                    console.error('Error getting geolocation:', error.message);
                }
            );
        } else {
            //TODO : add geolocation Error
            console.error('Geolocation is not supported by your browser');
        }
    }

    const changeMapCursor = () => {
        const mapContainer = document.querySelector('.global-map');
        if (mapContainer) {
            mapContainer.style.cursor = plusBtn ? 'pointer' : 'grab';
        }
    }

    const onMapClick = (event) => {
        if (plusBtn) {
            setMapClick(event)
        }
    }

    const onAddTrainingClick = () => {
        setPlusBtn(!plusBtn);
        setSelected(null);
    }

    if (isLoading)
        return (<div className="spinner-container">
            <Spinner />
        </div>);

    return (
        <>
            <MapContainer center={position} zoom={13} className="global-map" onClick={onMapClick} ref={setMap}>
                <TileLayer
                    url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
                    attribution='&copy; Wikimedia'
                />
                <MyComponent />

                <GeolocationMarker position={position} />
                <TrainingMarkers mapClick={mapClick} plusBtn={plusBtn} setPlusBtn={setPlusBtn} selected={selected} setSelected={setSelected} />

            </MapContainer>

            <GeoLocation map={map} position={position} />

            <button className={`btn btn-add ${plusBtn ? 'btn-active' : ''}`} onClick={onAddTrainingClick}>Add Training</button>
            <button className={`btn btn-add-media ${plusBtn ? 'btn-active' : ''}`} onClick={onAddTrainingClick}>+</button>
        </>
    );

    function MyComponent() {
        const map = useMapEvents({
            click: (mapClick) => {
                if (plusBtn) {
                    setMapClick({ lat: mapClick.latlng.lat, lng: mapClick.latlng.lng })
                }
                if (selected) {
                    setSelected(null);
                }
            }
        })
        return null
    }
}

export default Map;