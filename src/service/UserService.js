import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../config/firebase";

export const getUser = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}