import MarkerContent from './markerContent/MarkerContent';
import React, { useState } from 'react';
import UserContent from './userContent/UserContent';
import UserFeedback from './userFeedback/UserFeedback';

const MarkerView = ({ selected }) => {
    const [view, setView] = useState('content');
    const [userView, setUserView] = useState(null);

    if (view === 'content') {
        return <MarkerContent selected={selected} setView={setView} />;
    } else if (view === 'feedback') {
        return <UserFeedback setView={setView} userView={userView} />;
    } else {
        return <UserContent view={view} setView={setView} setUserView={setUserView}/>;
    }
};

export default MarkerView;