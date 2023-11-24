import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { doc, onSnapshot, setDoc} from "firebase/firestore";
import './settings.scss';
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth, db } from '../../config/firebase';
import { updatePassword } from "firebase/auth";
import 'firebase/auth';
import 'firebase/storage';
import UserPhoto from "./userPhoto/UserPhoto";
import UserName from "./userName/UserName";

const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  const [Email, setEmail] = useState(currentUser?.email || '');
  const [err, setErr] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdatePassword = async () => {
    try {
      // Reauthentifiziere den Benutzer mit dem aktuellen Passwort
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Ändere das Passwort auf das neue Passwort
      await updatePassword(user, newPassword);

      // Erfolgsmeldung anzeigen und Passwort-Felder zurücksetzen
      alert('Passwort erfolgreich geändert!');
      setCurrentPassword('');
      setNewPassword('');

      // Optional: Hier kannst du den Benutzer ausloggen
    } catch (error) {
      console.error('Fehler beim Ändern des Passworts:', error);
      setPasswordChangeError('Fehler beim Ändern des Passworts. Stellen Sie sicher, dass das aktuelle Passwort korrekt ist.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const displayName = e.target[2].value;
    const email = e.target[3].value;

    try {
      const user = currentUser;

      updateProfile(user, {
        displayName,
      });


      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        firstName,
        lastName
      });



    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFirstName(data.firstName || ''); // Updating firstName
          setLastName(data.lastName || ''); // Updating lastName
          setEmail(data.email || ''); // Updating lastName
        }
      });

      return () => {
        unsubscribe();
      };
    }

  }, [currentUser]);

  return (

    <div className="settings">
      <UserName/>
      <UserPhoto/>
      <div className="profile-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">firstName</label>
            <input type="text" id="firstName" name="firstName" placeholder="Neuer Vorname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">lastName</label>
            <input type="text" id="lastName" name="lastName" placeholder="Neuer Nachname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" name="email" placeholder="Neue Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit">Änderungen speichern</button>
        </form>

        <form style={{ marginTop: "20px" }}>
          <div className="form-group">
            <label htmlFor="currentPassword">Aktuelles Passwort</label>
            <input type={showPassword ? 'text' : 'password'} id="currentPassword" name="currentPassword" placeholder="Aktuelles Passwort" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <label htmlFor="newPassword">Neues Passwort</label>
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Neues Passwort" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

            <button className="button-updatepassword" onClick={handleUpdatePassword}>Passwort ändern</button>
          </div>
        </form>

      </div>
      <button className="signout" onClick={() => { signOut(auth); navigate("/"); }}>Ausloggen</button>
    </div>
  );
}

export default Settings;