import React from 'react';
import '../filterItems.scss';
import { dateItems } from '../filterData'

const DateFilter = () => {
    return (
        <ul className="filter-items">
            {dateItems.map((item, index) => {
                return <li className='filter-item' key={index}>{item.value}</li>
            })}
        </ul>
    )
}

export default DateFilter