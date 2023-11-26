import { useNavigate } from "react-router-dom";
import './settings.scss';

import { signOut } from "firebase/auth";
import { auth} from '../../config/firebase';
import 'firebase/auth';
import 'firebase/storage';
import UserPhoto from "./userPhoto/UserPhoto";
import UserInfo from "./userInfo/UserInfo";
import UserPassword from "./userPassword/UserPassword";

const Settings = () => {
  const navigate = useNavigate();

  return (

    <div className="settings">
      <div className="settings-profile">
        <UserPhoto />
        <UserInfo />
      </div>

      <UserPassword />
      <button className="signout" onClick={() => { signOut(auth); navigate("/"); }}>Ausloggen</button>
    </div>
  );
}

export default Settings;