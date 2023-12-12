import {
    arrayUnion,
    doc,
    updateDoc,
    getDoc,
    getDocs,
    setDoc,
    collection
} from "firebase/firestore";
import { db } from '../config/firebase';
import { v4 as uuid } from 'uuid';
import { updateNotifications } from './NotificationsService';

export const getRequests = async (currentUser) => {
    const notifications = [];
    const querySnapshot = await getDocs(collection(db, "userRequests"));
    querySnapshot.forEach((doc) => {
        doc.data().requests.forEach((request) => {
            if(doc.id === currentUser.uid && request.status === 'feedback'){
                notifications.push(request);
            } else if (request.id === currentUser.uid && request.status === 'follow') {
                notifications.push(request);
            } else if (request?.marker?.owner?.id === currentUser.uid) {
                notifications.push({ ...request, isRequest: true }); 
            } else if (request?.user?.id === currentUser.uid && request.status !== 'active') {
                notifications.push({ ...request, isRequest: false });
            }
        });
    });
    return notifications;
}

export const getRequest = async (selected, currentUser) => {
    const docRef = doc(db, "userRequests", selected.id);
    const docSnap = await getDoc(docRef);

    const requests = docSnap.data().requests;
    const matchingRequest = requests.find(request => request.user.id === currentUser.uid);

    return matchingRequest || null;
}

/*
export const save = async(userId, currentUserId, status, selected = null) => {
    const notification = {
        id: uuid(),
        user: currentUserId,
        status,
        time: new Date()
    }

    if(selected){
        notification[marker] = selected; 
    }

    await updateDoc(doc(db, "userRequests", userId), {
        requests: arrayUnion(notification),
    }, { merge: true });

    await updateNotifications(1, userId);
}  */


export const save = async (selected, currentUser) => {
    updateDoc(doc(db, "userRequests", selected.id), {
        requests: arrayUnion({
            id: uuid(),
            user: {
                id: currentUser.uid,
                name: currentUser.displayName,
                photo: currentUser.photoURL
            },
            marker: selected,
            status: 'active',
            time: new Date()
        }),
    });

    updateNotifications(1, selected.owner.id);
}

export const saveFollowRequest = async (userId, currentUserId) => {
    setDoc(doc(db, "userRequests", userId), {
        requests: arrayUnion({
            id: userId,
            userId: currentUserId,
            status: 'follow',
            time: new Date()
        }),
    }, { merge: true });

    updateNotifications(1, userId);
}

export const saveFeedbackNotification = async (userId, currentUserId) => {
    setDoc(doc(db, "userRequests", userId), {
        requests: arrayUnion({
            id: uuid(),
            userId: currentUserId,
            status: 'feedback',
            time: new Date()
        }),
    }, { merge: true });

    updateNotifications(1, userId);  
}

export const removeFollowRequest = async (userId, currentUserId) => {
    const docRef = doc(db, "userRequests", userId);
    const docSnap = await getDoc(docRef);

    let requests = docSnap.data().requests;
    requests = requests.filter(request => request.userId !== currentUserId);

    await setDoc(docRef, { requests }, { merge: true });
};


export const update = async (status, marker, id) => {
    const userRequestRef = doc(db, "userRequests", marker.id);
    const userRequestSnap = await getDoc(userRequestRef);

    const requests = userRequestSnap.data().requests;

    const updatedRequests = requests.map(request => {
        if (request.id === id) {
            return {
                ...request,
                status,
                time: new Date()
            };
        }
        return request;
    });

    await updateDoc(userRequestRef, { requests: updatedRequests });
}

