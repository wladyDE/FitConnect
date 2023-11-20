import React from 'react';
import { trainings } from '../../../../utils/trainings'
import './trainingFilter.scss'; 

const TrainingFilter = () => {
    return (
        <ul className="filter-trainings">
            {trainings.map((training, index) => {
                return <li className='filter-training' key={index}>{training.activityType}</li>
            })}
        </ul>
    )
}

export default TrainingFilter