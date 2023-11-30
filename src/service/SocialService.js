import {
    doc,
    getDoc, 
    updateDoc
} from "firebase/firestore";
import { db } from "../config/firebase";

export const followUser = async (userId, currentUserId) => {
    const { user, currentUser, docRefUser, docRefCurrentUser } = await getUsers(userId, currentUserId);

    const updatedUser = {
        ...user,
        followers: [...(user.followers || []), currentUserId]
    };

    const updatedCurrentUser = {
        ...currentUser,
        following: [...(currentUser.following || []), userId]
    };

    await Promise.all([
        updateDoc(docRefUser, updatedUser),
        updateDoc(docRefCurrentUser, updatedCurrentUser)
    ]);
}

export const unFollowUser = async (userId, currentUserId) => {
    const { user, currentUser, docRefUser, docRefCurrentUser } = await getUsers(userId, currentUserId);

    const newFollowers = user.followers.filter(followerId => followerId !== currentUserId);
    const newFollowing = currentUser.following.filter(followedId => followedId !== userId);

    const updatedUser = {
        ...user,
        followers: newFollowers
    };

    const updatedCurrentUser = {
        ...currentUser,
        following: newFollowing
    };

    await Promise.all([
        updateDoc(docRefUser, updatedUser),
        updateDoc(docRefCurrentUser, updatedCurrentUser)
    ]);
}

const getUsers = async (userId, currentUserId) => {
    const docRefUser = doc(db, "users", userId);
    const docRefCurrentUser = doc(db, "users", currentUserId);

    const [docSnapUser, docSnapCurrentUser] = await Promise.all([
        getDoc(docRefUser),
        getDoc(docRefCurrentUser)
    ]);

    return {
        user: docSnapUser.data(),
        currentUser: docSnapCurrentUser.data(),
        docRefUser, 
        docRefCurrentUser
    }
}


