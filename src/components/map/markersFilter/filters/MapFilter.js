import React, { useState } from 'react';
import './filterItems.scss';
import { capitalizeFirstLetter } from '../../../../utils/utils'

const MapFilter = ({items}) => {
    const [activeArr, setActiveArr] = useState(items);

    const handleClick = (index) => {
        const newActiveArr = activeArr.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    isActive: !activeArr[index].isActive
                }
            }
            return item;
        })

        setActiveArr(newActiveArr);
    }

    return (
        <ul className="filter-items">
            {items.map((item, index) => {
                const content = item.filter === 'training' ? capitalizeFirstLetter(item.value) : item.value; 
                return <li
                    className={`filter-item ${activeArr[index].isActive ? "filter-active" : ""}`}
                    key={index}
                    onClick={() => handleClick(index)}>
                    {content}
                </li>
            })}
        </ul>
    )
}

export default MapFilter