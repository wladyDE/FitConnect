import React, { useState } from 'react';
import './filterItems.scss';
import { capitalizeFirstLetter } from '../../../../utils/utils'

const MapFilter = ({ items, filter, setFilter, activeArr, setActiveArr }) => {
    const [activeFilters, setActiveFilters] = useState(items);

    const handleClick = (index) => {
        // update Filters in Accordion
        const newActiveFilters = activeFilters.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    isActive: !activeFilters[index].isActive
                }
            }
            return item;
        })
        setActiveFilters(newActiveFilters);

        // update Main Filter
        let newFilters;
        if (activeFilters[index].isActive) {
            newFilters = filter.filter(item => item.value !== activeFilters[index].value);
            setFilter(newFilters);
        } else {
            newFilters = [...filter, activeFilters[index]];
            setFilter(newFilters)
        }

        // update colors 
        const dateFilter = newFilters.filter(filter => filter.filter === 'date');
        const trainingFilter = newFilters.filter(filter => filter.filter === 'training');
        const participantsFilter = newFilters.filter(filter => filter.filter === 'participants');

        const updateActiveArr = () => {

            setActiveArr(prevArr => prevArr.map((item, index) => {
                if (index === 0) return { ...item, arrowIconActive: dateFilter.length > 0 };
                if (index === 1) return { ...item, arrowIconActive: trainingFilter.length > 0 };
                if (index === 2) return { ...item, arrowIconActive: participantsFilter.length > 0 };
                return item;
            }));
        };

        updateActiveArr();
    }

    return (
        <ul className="filter-items">
            {items.map((item, index) => {
                const content = item.filter === 'training' ? capitalizeFirstLetter(item.value) : item.value;
                return <li
                    className={`filter-item ${activeFilters[index].isActive ? "filter-active" : ""}`}
                    key={index}
                    onClick={() => handleClick(index)}>
                    {content}
                </li>
            })}
        </ul>
    )
}

export default MapFilter