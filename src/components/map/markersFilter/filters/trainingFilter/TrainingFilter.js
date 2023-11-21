import React from 'react';
import { trainings } from '../../../../../utils/trainings'
import { capitalizeFirstLetter } from '../../../../../utils/utils'
import '../filterItems.scss'; 

const TrainingFilter = () => {
    return (
        <ul className="filter-items">
            {trainings.map((training, index) => {
                return <li className='filter-item' key={index}>{capitalizeFirstLetter(training.activityType)}</li>
            })}
        </ul>
    )
}

export default TrainingFilter