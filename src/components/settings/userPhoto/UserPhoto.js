import React, { useState, useEffect, useContext } from 'react';
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, updateDoc} from "firebase/firestore"
import { auth, storage, db } from '../../../config/firebase';
import { updateProfile } from "firebase/auth";
import { AuthContext } from '../../../context/AuthContext';
import userPhoto from '../../../ressources/img/user.png'
import './userPhoto.scss';

const UserPhoto = () => {
    const [imageUrl, setImageUrl] = useState(userPhoto);
    const [isUpdated, setIsUpdated] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            if (currentUser.photoURL) {
                setImageUrl(currentUser.photoURL);
            }
        }

    }, [currentUser]);

    useEffect(() => {
        if(isUpdated){
            setTimeout(() => {setIsUpdated(false)}, 3000); 
        }
    }, [isUpdated]);

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {

            const storageRef = ref(storage, `avatars/${currentUser.uid}`);
            const uploadTask = await uploadBytesResumable(storageRef, e.target.files[0]);
            const downloadURL = await getDownloadURL(uploadTask.ref);

            const userDocRef = doc(db, "users", currentUser.uid);
            await updateDoc(userDocRef, {
                photoURL: downloadURL
            });

            await updateProfile(auth.currentUser, { photoURL: downloadURL });

            setIsUpdated(true); 

            setImageUrl(downloadURL);
        }
    };

    return (
        <div className="user__photo">
            <input className="user__photo-input" type="file" id="cs" onChange={(e) => handleImageChange(e)} />
            <label id="cs" htmlFor="cs" className='user__photo-label'>
                <img src={imageUrl} alt="userPhoto" type="file" className="user__photo-img" title="change image" />
            </label>
            {isUpdated && <p className="user__photo-message">Sucessfully updated!</p>}
        </div>
    )
}

export default UserPhoto