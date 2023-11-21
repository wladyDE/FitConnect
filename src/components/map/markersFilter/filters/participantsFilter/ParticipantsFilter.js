import React from 'react';
import '../filterItems.scss'; 
import { participants } from '../filterData';

const ParticipantsFilter = () => {
    return (
        <ul className="filter-items">
            {participants.map((item, index) => {
                return <li className='filter-item' key={index}>{item.value}</li>
            })}
        </ul>
    )
}

export default ParticipantsFilter