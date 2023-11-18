import { useCallback } from 'react';
import geolocationImg from '../../../ressources/img/compass.png';
import './geoLocation.scss';

const GeoLocation = ({map, position}) => {
    const onGeolocationClick = useCallback(() => {
        map.setView(position, 13)
      }, [map]) 

  return (
    <a onClick={onGeolocationClick} className='geolocation'>
        <img src={geolocationImg} alt="geoLocation" />
    </a>
  )
}

export default GeoLocation