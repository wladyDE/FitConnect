import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { updateProfile } from "firebase/auth";
import { db } from '../../../../config/firebase';
import { doc, updateDoc } from "firebase/firestore";
import Edit from '../../../../ressources/img/edit.png';
import Cancel from '../../../../ressources/img/cancel.png';
import Accept from '../../../../ressources/img/accept.png';
import './userName.scss';

const UserName = () => {
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState(currentUser.displayName);
    const [edit, setEdit] = useState(false);

    const onAcceptClick = async () => {
        const newUserName = document.getElementById('username').value.trim();
        if (newUserName) {
            await updateDoc(doc(db, "users", currentUser.uid), {
                displayName: newUserName
            });
            await updateProfile(currentUser, {
                displayName: newUserName,
            });
            setUserName(newUserName);
            setEdit(false);
        }
    };


    const NameView = () => {
        return <div className="user__name">
            <h2 className='user__name-title'>{userName}</h2>
            <img src={Edit} className='user__name-img' title='change username' alt="edit" onClick={() => setEdit(true)} />
        </div>
    }

    const EditView = () => {
        return <div className="user__name">
            <input
                className="user__name-input"
                type="text"
                placeholder="new username"
                id="username"
                name="username"
            />
            <img src={Accept} className='user__name-img user__name-img-accept' alt="accept" onClick={onAcceptClick} />
            <img src={Cancel} className='user__name-img' alt="cancel" onClick={() => setEdit(false)} />
        </div>
    }

    return (
        edit ? <EditView /> : <NameView />
    )
}

export default UserName