import React, { useState, useEffect, useContext } from 'react';
import './markerContent.scss';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import { formatRelative } from "date-fns";
import { AuthContext } from '../../../../../../context/AuthContext';
import { capitalizeFirstLetter, findPercentage } from '../../../../../../utils/utils';
import ConfirmationModal from '../../../markerInfo/confirmationModal/ConfirmationModal';
import ParticipantAvatars from './participantAvatars/ParticipantAvatars';
import { getRequestStatusContent } from './markerStatus/MarkerStatus';
import Spinner from '../../../../../spinner/Spinner';
import { getParticipants } from '../../../../../../service/MarkerService';
import { save, getRequest } from '../../../../../././../service/RequestService'

const MarkerContent = ({ selected, setView }) => {
    const [requestStatus, setRequestStatus] = useState(null);
    const [participants, setParticipants] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            setRequestStatus(null);

            if (currentUser.uid === selected.owner.id) {
                setParticipants(await getParticipants(selected));
                setRequestStatus('view');
            } else {
                const existingRequest = await getRequest(selected, currentUser);
                setParticipants(await getParticipants(selected));

                if (existingRequest) {
                    setRequestStatus(existingRequest.status);
                } else {
                    if (selected.people.length >= selected.maxPeople + 1) {
                        setRequestStatus('full');
                    } else {
                        setRequestStatus('classic');
                    }
                }
            }
        };

        fetchData();
    }, [selected]);

    const { activityType, maxPeople, description, time, trainingTime } = selected;
    const percentage = findPercentage(time, trainingTime);

    const onJoin = async (e) => {
        await save(selected, currentUser);
        e.stopPropagation();
        setRequestStatus('active');
    }

    const content = getRequestStatusContent((e) =>{ 
        setShowConfirmModal(true)
        e.stopPropagation();
    });

    return (
        showConfirmModal ? (<ConfirmationModal setShowConfirmModal={setShowConfirmModal} join={onJoin} type={'join'} />)

            :

            <div className='marker-info'>
                <p className='info-activity'>{capitalizeFirstLetter(activityType)}</p>
                <div className="info">
                    <div className="info__block-left">
                        <p className='info-description'>{description}</p>
                    </div>

                    <div className="info__block-right">
                        <CircularProgressbar
                            className='info-progress'
                            value={percentage}
                            strokeWidth={50}
                            styles={buildStyles({
                                strokeLinecap: "butt",
                                pathColor: "rgb(247, 149, 58)",
                                trailColor: "grey",
                            })}
                        />
                        <p className='info-time'>{formatRelative(new Date(trainingTime.seconds * 1000), new Date())}</p>
                    </div>
                </div>

                {requestStatus && participants ?
                    <>
                        <p className='info-people'>Participants: {participants.length}/{maxPeople + 1}</p>
                        <ParticipantAvatars participants={participants} setView={setView}/>
                        {content[requestStatus]}
                    </> :
                    (<div className="spinner-container"><Spinner /></div>)
                }

                <button className='btn btn-close'> &times;</button>
            </div >
    )

}

export default MarkerContent