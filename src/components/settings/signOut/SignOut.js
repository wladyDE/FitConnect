import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth} from '../.././../config/firebase';
import './signOut.scss'; 

const SignOut = () => {
    const navigate = useNavigate();

    return (
        <button className="signout" onClick={() => { signOut(auth); navigate("/"); }}>Sign Out</button>
    )
}

export default SignOut