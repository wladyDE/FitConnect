import React, { useEffect, useState, useContext, useCallback } from 'react';
import MarkerInfo from "./markerInfo/MarkerInfo";
import { AuthContext } from "../../../context/AuthContext";
import { Marker } from 'react-leaflet';
import { MapForm } from "../mapForm/MapForm";
import ConfirmationPopup from '../../confirmationPopup/ConfirmationPopup';
import { trainings, getSize } from '../../../utils/trainings';
import '../map.scss';
import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";
import {
  save as saveMarkerToDatabase,
  load as loadMarkersFromDatabase,
  remove as removeMarkerFromDatabase,
  update as updateMarkerInTheDataBase
} from '../../../service/MarkerService';
import { useTransition, animated } from 'react-spring';
import { animation } from '../../../utils/utils';
import { filterMarkers } from './utils';
import ReactDOM from 'react-dom';
import { getFeedback } from '../../../service/FeedbackService';

const TrainingMarkers = ({ selected, setSelected, mapClick, plusBtn, setPlusBtn, filter }) => {
  const [markers, setMarkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [tempMarker, setTempMarker] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const formTransition = useTransition(showForm, animation);

  useEffect(() => {
    const unsubscribe = loadMarkersFromDatabase((updatedMarkers) => {
      setMarkers(updatedMarkers);
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    onMapClick();
  }, [mapClick]);

  const deleteMarker = async (markerId) => {
    await removeMarkerFromDatabase(markerId, currentUser);

    setMarkers((markers) => markers.filter(marker => marker.id !== markerId));
    setShowPopup('delete');
  }

  const updateMarker = async (values, id) => {
    const updatedMarker = await updateMarkerInTheDataBase(values, id, currentUser);

    if (updatedMarker) {
      setMarkers(currentMarkers => {
        const updatedMarkers = [...currentMarkers];
        const indexToUpdate = updatedMarkers.findIndex(marker => marker.id === id);
        updatedMarkers[indexToUpdate] = updatedMarker;
        return updatedMarkers;
      });

      setShowPopup('update');
    } else {
      setShowForm(false);
    }
  }

  const onFormSubmit = async (values) => {
    const rating = await getFeedback(currentUser.uid); 

    const userInfo = {
      id: currentUser.uid,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      rating : rating.stars
    };

    const newMarker = {
      id: uuid(),
      ...tempMarker,
      ...values,
      owner: userInfo,
      people: [userInfo],
      status : 'active',
      time: Timestamp.fromDate(new Date()),
      trainingTime: Timestamp.fromDate(new Date(values.trainingTime))
    };

    setMarkers((current) => [
      ...current,
      newMarker
    ]);
    saveMarkerToDatabase(newMarker, currentUser);
    setShowForm(false);
    setPlusBtn(false);
    setShowPopup('create');
  };

  const onMapClick = useCallback(() => {
    (plusBtn) && (
      setTempMarker({ lat : mapClick.lat, lng: mapClick.lng }),
      setShowForm(true)
    )
  }, [plusBtn, mapClick]);

  const currentMarkers = filterMarkers(filter, markers); 

  return (
    <>
      {currentMarkers.map((marker, index) => {
        const training = trainings.find(t => t.activityType === marker.activityType);
        const iconUrl = training ? training.icon : null;
        const position = [marker.lat, marker.lng]

        return (
          <Marker
            key={marker.id + index}
            position={position}
            icon={L.icon({ iconUrl: iconUrl, iconSize: [34, 34] })}
            eventHandlers={{
              click: () => {
                setSelected(!selected || selected.id !== marker.id ? marker : null);
              },
            }}
          />
        );
      })}

      {selected && (
        <MarkerInfo
          selected={selected}
          setSelected={setSelected}
          deleteMarker={deleteMarker}
          updateMarker={updateMarker}
        />
      )}

      {formTransition((style, item) =>
      item && ReactDOM.createPortal(
        <animated.div style={style}>
          <MapForm
            onSubmit={onFormSubmit}
            onClose={() => setShowForm(false)}
            className='element'
            style = {{width : '400'}}
          />
        </animated.div>,
        document.getElementById('root') 
        )
      )}

      {showPopup &&
        <ConfirmationPopup
          id={showPopup}
          setShowPopup={setShowPopup}
        />}
    </>
  )
}

export default TrainingMarkers;