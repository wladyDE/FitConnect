import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Edit from '../../../ressources/img/edit.png';
import Cancel from '../../../ressources/img/cancel.png';
import Accept from '../../../ressources/img/accept.png';
import './userName.scss';

const UserName = () => {
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState(currentUser.displayName);
    const [edit, setEdit] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (edit) {
            inputRef.current.focus();
        }
    }, [edit]);

    const handleInputChange = useCallback((e) => {
        setUserName(e.target.value);
    }, []);

    const NameView = () => {
        return <div className="user__name">
            <h2 className='user__name-title'>{userName}</h2>
            <img src={Edit} className='user__name-img' alt="edit" onClick={() => setEdit(true)} />
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
                value={userName}
                onChange={(e) => handleInputChange(e)}
                ref={inputRef} 
            />
            <img src={Accept} className='user__name-img user__name-img-accept' alt="accept" />
            <img src={Cancel} className='user__name-img' alt="cancel" onClick={() => setEdit(false)} />
        </div>
    }

    return (
        edit ? <EditView /> : <NameView />
    )
}

export default UserName