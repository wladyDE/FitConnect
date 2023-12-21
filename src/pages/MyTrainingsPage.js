import { useContext } from 'react';
import SideBar from '../components/sideBar/SideBar';
import MyTrainings from '../components/myTrainings/MyTrainings';
import { AuthContext } from "../context/AuthContext";
import Spinner from '../components/spinner/Spinner';

const MyTrainingsPage = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        (currentUser && currentUser.uid) ?
          <>
            <SideBar />
            <MyTrainings/>
          </>
          : (<div className="spinner-container">
            <Spinner />
          </div>)
      );
}

export default MyTrainingsPage; 