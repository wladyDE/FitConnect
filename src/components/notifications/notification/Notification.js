import { formatRelative } from "date-fns";
import './notification.scss';
import notificationImg from '../../../ressources/img/notification.png'; 
import acceptNotificationImg from '../../../ressources/img/acceptNotification.png'; 
import declineNotificationImg from '../../../ressources/img/declineNotification.png'; 
import { AuthContext } from "../../../context/AuthContext";
import React, { useState, useContext } from 'react';
import { Timestamp } from "firebase/firestore";
import { updateNotifications } from "../../../service/NotificationsService";
import { update as updateRequestInDB } from '../../../service/RequestService';
import { updateParticipants as updateMarkerInDB } from "../../../service/MarkerService";
import defaultPhoto from '../../../ressources/img/user.png'; 
import { createChat } from "../../../service/ChatService";

const Notification = ({ request: { id, marker, time, user, status, isRequest } }) => {
    const [requestStatus, setRequestStatus] = useState(status);
    const [notificationTime, setNotificationTime] = useState(time);
    const { currentUser } = useContext(AuthContext);

    const onAccept = () => {
        updateRequestInDB('confirmed', marker, id);

        updateMarkerInDB(marker, user);

        setNotificationTime(new Timestamp(Math.floor(new Date().getTime() / 1000), 0));
        setRequestStatus('confirmed');
        updateNotifications(1, user.id);

        createChat(currentUser, user);
    }

    const onDecline = () => {
        updateRequestInDB('rejected', marker, id);

        setNotificationTime(new Timestamp(Math.floor(new Date().getTime() / 1000), 0));
        setRequestStatus('rejected');
        updateNotifications(1, user.id);
    }

    const userWhoSentRequestToMePhoto = user.photo ? user.photo : defaultPhoto;
    const userISentRequestToPhoto = marker.owner.photo ? marker.owner.photo : defaultPhoto;

    return (
        <div className='request'>
            <img src={getImg(requestStatus)} alt={requestStatus} className="request-img" />
            <div className="request-info">
                {requestStatus === 'active' && (
                    <>
                        <div className='request-text'>
                            <img src={userWhoSentRequestToMePhoto} alt="profile foto" className="profile-photo" />
                            <p>{` ${user.name} wants to join your ${marker.activityType} training on ${formatRelative(new Date(marker.trainingTime.seconds * 1000), new Date())}`}</p>
                        </div>
                        <button className='btn btn-accept' onClick={onAccept}>Accept</button>
                        <button className="btn btn-decline" onClick={onDecline}>Decline</button>
                    </>
                )}
                {(requestStatus === 'confirmed' && isRequest) && (
                    <div className='request-text'>{`You accepted ${user.name}´s request to join your ${marker.activityType} training`}</div>
                )}
                {(requestStatus === 'rejected' && isRequest) && (
                    <div className='request-text'>{`You declined ${user.name}´s request to join your ${marker.activityType} training`}</div>
                )}
                {(requestStatus === 'confirmed' && !isRequest) && (
                    <div className='request-text'>
                        <img src={userISentRequestToPhoto} alt="profile foto" className="profile-photo" />
                        <p>{`${marker.owner.name} accepted your request to join ${marker.activityType} training`}</p>
                    </div>
                )}
                {(requestStatus === 'rejected' && !isRequest) && (
                    <div className='request-text'>
                        <img src={userISentRequestToPhoto} alt="profile foto" className="profile-photo" />
                        <p>{`${marker.owner.name} declined your request to join ${marker.activityType} training`}</p>
                    </div>
                )}
                <p className='request-time'>{formatRelative(new Date(notificationTime.seconds * 1000), new Date())}</p>
            </div>
        </div>
    );

}

export default Notification; 

const getImg = (requestStatus) => {
    if(requestStatus === 'confirmed'){
        return acceptNotificationImg; 
    } else if(requestStatus === 'rejected'){
        return declineNotificationImg; 
    } else {
        return notificationImg; 
    }  
}