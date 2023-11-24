import React from 'react'
import Settings from '../components/settings/Settings';
import SideBar from "../components/sideBar/SideBar";
import Spinner from '../components/spinner/Spinner';
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';


const SettingsPage = () => {
  const { currentUser } = useContext(AuthContext);

  return ((currentUser && currentUser.uid) ?
    <>
      <SideBar />
      <Settings />
    </>
    : (<div className="spinner-container">
      <Spinner />
    </div>)
  );
}

export default SettingsPage;

