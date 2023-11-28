import MarkerContent from './markerContent/MarkerContent';
import React, { useState } from 'react';
import UserContent from './userContent/UserContent';

const MarkerView = ({ selected }) => {
    const [view, setView] = useState('content');

    return (
        view === 'content' ?
            <MarkerContent selected={selected} setView={setView} />
            :
            <UserContent view={view} setView={setView} />
    )

}

export default MarkerView