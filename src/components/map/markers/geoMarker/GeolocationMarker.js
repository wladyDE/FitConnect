import React from 'react';
import { Marker } from 'react-leaflet';
import geolocationImg from '../../../../ressources/img/geolocation.png';

const GeolocationMarker = ({ position }) => {
  return (
    <Marker
      position={position}
      icon={L.icon({ iconUrl: geolocationImg, iconSize: [34, 34] })}
    />
  )
}

export default GeolocationMarker