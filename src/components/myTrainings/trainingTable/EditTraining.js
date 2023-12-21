import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { MapForm } from '../../map/mapForm/MapForm'
import ReactDOM from 'react-dom';
import { update } from '../../../service/MarkerService'
import ConfirmationPopup from '../../confirmationPopup/ConfirmationPopup';

const EditTraining = ({ marker, setMarkers, setView }) => {
    const { currentUser } = useContext(AuthContext);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const onFormSubmit = async (values) => {
        await update(values, marker.id, currentUser)
        setShowConfirmationPopup(true);
        const newMarker = { ...marker, ...values, trainingTime: marker.trainingTime };

        setMarkers(current =>
            current.map(m => m.id === marker.id ? newMarker : m)
        );
        setTimeout(() => {
            setView('editSuccess');
        }, 2000)
    };


    if (showConfirmationPopup) {
        return <ConfirmationPopup id='update' whiteBorder={true} />
    }

    return ReactDOM.createPortal(
        <div className="trainings__edit">
            <button type="button" className="close-button" onClick={() => setView(null)}>&times;</button>
            <MapForm
                selected={marker}
                setSelected={setView}
                onClose={() => setView(null)}
                onSubmit={onFormSubmit}
            />
        </div>,
        document.getElementById('root')
    );
};

export default EditTraining;