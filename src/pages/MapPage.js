import Map from "../components/map/Map";
import SideBar from "../components/sideBar/SideBar";
import Spinner from '../components/spinner/Spinner';
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from 'react';
import Feedback from '../components/feedback/Feedback';

const Search = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    (currentUser && currentUser.uid) ?
      <>
        <SideBar />
        <Map />
        <Feedback/>
      </>
      : (<div className="spinner-container">
        <Spinner />
      </div>)
  );
}

export default Search;