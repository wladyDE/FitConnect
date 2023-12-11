import { formatRelative } from "date-fns";
import notificationImg from '../../../ressources/img/notification.png';
import acceptNotificationImg from '../../../ressources/img/acceptNotification.png';
import declineNotificationImg from '../../../ressources/img/declineNotification.png';
import { AuthContext } from "../../../context/AuthContext";
import React, { useState, useContext, useEffect } from 'react';
import { Timestamp } from "firebase/firestore";
import { updateNotifications } from "../../../service/NotificationsService";
import { update as updateRequestInDB } from '../../../service/RequestService';
import { updateParticipants as updateMarkerInDB } from "../../../service/MarkerService";
import defaultPhoto from '../../../ressources/img/user.png';
import { createChat } from "../../../service/ChatService";
import { getUser } from "../../../service/UserService";
import './notification.scss';

const Notification = ({ request: { id, marker, time, user: propUser, status, isRequest, userId } }) => {
    const [requestStatus, setRequestStatus] = useState(status);
    const [notificationTime, setNotificationTime] = useState(time);
    const [user, setUser] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUser(userId ?? propUser.id);
            setUser(userData);
        };

        fetchUserData();
    }, []);

    const onAccept = () => {
        updateRequestInDB('confirmed', marker, id);

        updateMarkerInDB(marker, user);

        setNotificationTime(new Timestamp(Math.floor(new Date().getTime() / 1000), 0));
        setRequestStatus('confirmed');
        updateNotifications(1, user.uid);

     //   createChat(currentUser, user);
    }

    const onDecline = () => {
        updateRequestInDB('rejected', marker, id);

        setNotificationTime(new Timestamp(Math.floor(new Date().getTime() / 1000), 0));
        setRequestStatus('rejected');
        updateNotifications(1, user.id);
    }

    const userWhoSentRequestToMePhoto = user?.photoURL ? user?.photoURL : defaultPhoto;
    const userSentRequestToPhoto = marker?.owner?.photoURL ? marker?.owner?.photoURL : defaultPhoto;

    if (user) {
        return (
            <div className='request'>
                <img src={getImg(requestStatus)} alt={requestStatus} className="request-img" />
                <div className="request-info">
                    {requestStatus === 'active' && (
                        <>
                            <div className='request-text'>
                                <img src={userWhoSentRequestToMePhoto} alt="profile foto" className="profile-photo" />
                                <p>{` ${user.displayName} wants to join your ${marker.activityType} training on ${formatRelative(new Date(marker.trainingTime.seconds * 1000), new Date())}`}</p>
                            </div>
                            <button className='btn btn-accept' onClick={onAccept}>Accept</button>
                            <button className="btn btn-decline" onClick={onDecline}>Decline</button>
                        </>
                    )}
                    {(requestStatus === 'confirmed' && isRequest) && (
                        <div className='request-text'>{`You accepted ${user.displayName}´s request to join your ${marker.activityType} training`}</div>
                    )}
                    {(requestStatus === 'rejected' && isRequest) && (
                        <div className='request-text'>{`You declined ${user.displayName}´s request to join your ${marker.activityType} training`}</div>
                    )}
                    {(requestStatus === 'confirmed' && !isRequest) && (
                        <div className='request-text'>
                            <img src={userSentRequestToPhoto} alt="profile foto" className="profile-photo" />
                            <p>{`${marker.owner.displayName} accepted your request to join ${marker.activityType} training`}</p>
                        </div>
                    )}
                    {(requestStatus === 'rejected' && !isRequest) && (
                        <div className='request-text'>
                            <img src={userSentRequestToPhoto} alt="profile foto" className="profile-photo" />
                            <p>{`${marker.owner.displayName} declined your request to join ${marker.activityType} training`}</p>
                        </div>
                    )}
                    {(requestStatus === 'follow') && (
                        <div className='request-text'>
                            <img src={user.photoURL ?? defaultPhoto} alt="profile foto" className="profile-photo" />
                            <p>{`${user.displayName} follows you now`}</p>
                        </div>
                    )}
                    <p className='request-time'>{formatRelative(new Date(notificationTime.seconds * 1000), new Date())}</p>
                </div>
            </div>
        );
    }
}

export default Notification;

const getImg = (requestStatus) => {
    if (requestStatus === 'confirmed') {
        return acceptNotificationImg;
    } else if (requestStatus === 'rejected') {
        return declineNotificationImg;
    } else {
        return notificationImg;
    }
}