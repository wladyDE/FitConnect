import React, { useState } from 'react';
import { updatePassword } from "firebase/auth";
import { auth } from '../../../config/firebase';
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import './userPassword.scss';

const UserPassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const onChangePasswort = async (event) => {
        event.preventDefault();
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);

            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);

            alert('Passwort was successfully changed!');
            setCurrentPassword('');
            setNewPassword('');
            setNewPassword2(''); 
        } catch (error) {
            alert('Error!')
            console.log(error);
        }
    };

    return (
        <div className='user__password'>
            <form className='user__password-form'>
                <PasswordInput
                    htmlFor="currentPassword"
                    labelText="Current passwort"
                    id="currentPassword"
                    placeholder="Current passwort"
                    value={currentPassword}
                    setPassword={setCurrentPassword}
                />
                <PasswordInput
                    htmlFor="newPassword"
                    labelText="New passwort"
                    id="newPassword"
                    placeholder="New passwort"
                    value={newPassword}
                    setPassword={setNewPassword}
                />
                <PasswordInput
                    htmlFor="newPassword2"
                    labelText="Confirm password"
                    id="newPassword2"
                    placeholder="New passwort"
                    value={newPassword2}
                    setPassword={setNewPassword2}
                />

                <button className="user__password-btn-update" type="submit" onClick={(e) => onChangePasswort(e)}>
                    Change passwort
                </button>
            </form>
        </div>
    )
}

const PasswordInput = ({ htmlFor, labelText, id, placeholder, value, setPassword }) => {
    return <div className="user__password-input">
        <label htmlFor={htmlFor}>{labelText}</label>
        <input
            type='password'
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setPassword(e.target.value)}
        />
    </div>
}

export default UserPassword