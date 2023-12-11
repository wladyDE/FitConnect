import {
    arrayUnion,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

export const getFeedback = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const newFeedback = docSnap.data().myFeedBack.filter(feedback => feedback.status === 'active');
    return newFeedback.length > 0 ? newFeedback[0] : null;
}

export const updateRating = async (myId, feedBackId, userId, rating) => {
    await updateDoc(doc(db, "users", userId), {
        rating: arrayUnion({
            ...rating,
            id: uuid(),
            time: Timestamp.fromDate(new Date()),
            userId : myId
        })
    });

    const feedbackArray = (await getDoc(doc(db, "users", myId))).data().myFeedBack;
    const newFeedback = feedbackArray.map(feedback => {
        if (feedback.id === feedBackId) {
            return {
                ...feedback,
                status: 'finished'
            }
        }
        return feedback;
    })

    await updateDoc(doc(db, "users", myId), { myFeedBack: newFeedback });
}