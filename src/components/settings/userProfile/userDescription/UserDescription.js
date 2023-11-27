import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { db } from '../../../../config/firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import Cancel from '../../../../ressources/img/cancel.png';
import Accept from '../../../../ressources/img/accept.png';
import Edit from '../../../../ressources/img/edit.png';
import './userDescription.scss';

const UserDescription = () => {
    const { currentUser } = useContext(AuthContext);
    const [description, setDescription] = useState('');
    const [view, setView] = useState(null);

    useEffect(() => {
        const fetchDescription = async () => {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const description = docSnap.data().description;
                if (description) {
                    setView('description');
                } else {
                    setView('add-description');
                }
                setDescription(description);
            }
        };
    
        fetchDescription();
    }, []);

    const onCancelClick = () => {
        if(description){
            setView('description')
        } else {
            setView('add-description')
        }
    }

    const onAcceptClick = async () => {
        const newDescription = document.getElementById('settings-description').value.trim();
        if (newDescription) {
            await updateDoc(doc(db, "users", currentUser.uid), {
                description: newDescription
            });
            setView('description');
            setDescription(newDescription); 
        }
    };

    const DescriptionView = () => {
        return <div className="user__description">
            <p className='user__description-info'>{description}</p>
            <img src={Edit} className='user__name-img' title="change description" alt="edit" onClick={() => setView('edit-description')} />
        </div>
    }

    const AddDescriptionView = () => {
        return <div className="user__description">
            <a className='user__description-btn' onClick={() => setView('edit-description')}>Add description</a>
        </div>
    }

    const EditDescriptonView = () => {
        return <div className="user__description">
            <textarea
                className="user__description-text"
                type="text"
                placeholder="Enter description"
                id="settings-description"
            />
            <img src={Accept} className='user__name-img user__name-img-accept' alt="accept" onClick={onAcceptClick} />
            <img src={Cancel} className='user__name-img' alt="cancel" onClick={onCancelClick} />
        </div>
    }

    switch (view) {
        case 'description':
            return <DescriptionView />
        case 'edit-description':
            return <EditDescriptonView />
        case 'add-description':
            return <AddDescriptionView />
    }
}

export default UserDescription
