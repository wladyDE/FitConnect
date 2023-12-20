import React, { useState, useEffect, useContext } from 'react';
import { Popup } from 'react-leaflet';
import { MapForm } from '../../mapForm/MapForm';
import OptionWindow from './optionWindow/OptionWindow';
import ConfirmationModal from './confirmationModal/ConfirmationModal';
import MarkerView from './markerView/MarkerView';
import { AuthContext } from "../../../../context/AuthContext";

const MarkerInfo = ({ selected, setSelected, deleteMarker, updateMarker }) => {
    const [view, setView] = useState('options');
    const { currentUser } = useContext(AuthContext);
    const { lat, lng } = selected;

    useEffect(() => {
        if (selected !== null) {
            setView('options')
        }
    }, [selected]);

    const onViewBtnClick = (e) => {
        e.stopPropagation();
        setView('view-only');
    }

    const onCloseBtnClick = (e) => {
        e.stopPropagation();
        setSelected(null);
    }

    return (
        selected &&
        <Popup position={{ lat, lng }} closeButton={false} >
            <button type="button" className="close-button" onClick={(e) => onCloseBtnClick(e)}>&times;</button>
            {currentUser.uid !== selected.owner.id ? (
                <MarkerView selected={selected} />
            ) : (
                <>
                    {view === 'options' && (
                        <OptionWindow
                            onViewBtnClick={onViewBtnClick}
                            setView={setView}
                            setSelected={setSelected}
                        />
                    )}

                    {view === 'view-only' && (
                        <MarkerView selected={selected} />
                    )}

                    {view === 'delete confirmation' && (
                        <ConfirmationModal
                            onDeleteBtnClick={deleteMarker}
                            selected={selected}
                            setSelected={setSelected}
                            setView={setView}
                            type={'delete'}
                        />
                    )}

                    {view === 'edit-form' && (
                        <MapForm
                            onSubmit={updateMarker}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    )}
                </>
            )}
        </Popup>
    );
}

export default MarkerInfo;