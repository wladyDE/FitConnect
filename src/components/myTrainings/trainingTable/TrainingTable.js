import React, { useState, useEffect, useContext } from 'react';
import { getUser } from '../../../service/UserService';
import { formatRelative } from "date-fns";
import { capitalizeFirstLetter } from '../../../utils/utils';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import defaultUserPhoto from '../../../ressources/img/user.png'
import { AuthContext } from '../../../context/AuthContext';
import { remove } from '../../../service/MarkerService'
import EditTraining from './EditTraining';
import ConfirmationPopup from '../../confirmationPopup/ConfirmationPopup';

const TrainingTable = ({ markers, status, setMarkers }) => {
    const { currentUser } = useContext(AuthContext);
    const [participantImages, setParticipantImages] = useState({});
    const [view, setView] = useState(null);

    const loadParticipantImages = async (participants) => {
        const users = await Promise.all(participants.map(p => getUser(p.id)));
        return users.map(user => user.photoURL || defaultUserPhoto);
    };

    useEffect(() => {
        markers.forEach(async (marker) => {
            const images = await loadParticipantImages(marker.people);
            setParticipantImages(prevImages => ({ ...prevImages, [marker.id]: images }));
        });
    }, []);

    useEffect(() => {
        if(view && (view.info === 'deleteSuccess')){
            setTimeout(() => setView(null), 2000); 
        }
        if(view && (view.info === 'editSuccess')){
            setView(null); 
        }
    }, [view]);

    const title = status === 'active' ? 'Upcoming Trainings' : 'Completed Trainings';

    const onEdit = (index) => {
        setView({ info: 'edit', index })
    }

    const onDelete = async (index) => {
        await remove(markers[index].id, currentUser); 
        setMarkers(prevMarkers =>
            prevMarkers.filter(prev => prev.id !== markers[index].id))
        setView({info: 'deleteSuccess'})
    }

    return (
        <div className={status === 'active' ? 'mt30' : null}>
            <h1 className="trainings__title">{title}</h1>
            <table className="trainings__table">
                <thead>
                    <tr>
                        <th className='cell'>Training</th>
                        <th className='cell'>Date</th>
                        <th className='cell'>Description</th>
                        <th className='cell'>Participants</th>
                    </tr>
                </thead>
                <tbody>
                    {markers.map((marker, index) => (
                        <tr key={index}>
                            <td className='cell'>{capitalizeFirstLetter(marker.activityType)}</td>
                            <td className='cell'>{formatRelative(new Date(marker.trainingTime.seconds * 1000), new Date())}</td>
                            <td className='cell'>{marker.description}</td>
                            <td className='cell'>
                                {participantImages[marker.id] && participantImages[marker.id].map((img, idx) => (
                                    <img key={idx} src={img} alt="Participant" />
                                ))}
                            </td>
                            {status === 'active' && (
                                <>
                                    <td className='cell trainings__button' onClick={() => onEdit(index)}><MdOutlineModeEdit /></td>
                                    <td className='cell trainings__button' onClick={() => onDelete(index)}><MdDelete /></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                (view && view.info === 'edit') && (
                    <EditTraining
                        marker={markers[view.index]}
                        setView={setView}
                        setMarkers={setMarkers}
                    />
                )
            }

            {
                (view && view.info === 'deleteSuccess') && (
                    <ConfirmationPopup id='delete' whiteBorder={true}/>
                )
            }
        </div>
    )
}

export default TrainingTable