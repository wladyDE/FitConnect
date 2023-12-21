import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../spinner/Spinner';
import { getMarkers } from '../../service/MarkerService';
import './myTrainings.scss'
import TrainingTable from './trainingTable/TrainingTable';

const MyTrainings = () => {
    const { currentUser } = useContext(AuthContext);
    const [finishedMarkers, setFinishedMarkers] = useState([]);
    const [activeMarkers, setActiveMarkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                setIsLoading(true);
                const { finishedMarkers, activeMarkers } = await getMarkers(currentUser.uid);
                setFinishedMarkers(finishedMarkers);
                setActiveMarkers(activeMarkers);
            } catch (error) {
                console.error("Error fetching markers:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMarkers();
    }, []);


    if (isLoading) {
        return <div className='trainings'>
            <div className="spinner-container">
                <Spinner />
            </div>
        </div>
    }

    return (
        <div className='trainings'>
            <TrainingTable markers={finishedMarkers} setMarkers={setFinishedMarkers} status='finished'/>
            <TrainingTable markers={activeMarkers} setMarkers={setActiveMarkers} status='active'/>
        </div>
    )
}

export default MyTrainings