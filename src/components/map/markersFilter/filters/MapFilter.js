import React, { useState, useEffect } from 'react';
import { capitalizeFirstLetter } from '../../../../utils/utils'; 
import Stars from '../../../feedback/stars/Stars';
import './filterItems.scss';

const MapFilter = ({ items, filter, setFilter, activeArr, setActiveArr, isReset, setIsReset }) => {
    const [activeFilters, setActiveFilters] = useState(items);

    useEffect(() => {
        if (isReset) {
            setActiveFilters(activeFilters.map(item => ({ ...item, isActive: false })));
            setIsReset(prev => !prev)
        }
    }, [isReset]);

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
        const ratingFilter = newFilters.filter(filter => filter.filter === 'rating');

        const updateActiveArr = () => {

            setActiveArr(prevArr => prevArr.map((item, index) => {
                if (index === 0) return { ...item, arrowIconActive: dateFilter.length > 0 };
                if (index === 1) return { ...item, arrowIconActive: trainingFilter.length > 0 };
                if (index === 2) return { ...item, arrowIconActive: participantsFilter.length > 0 };
                if (index === 3) return { ...item, arrowIconActive: ratingFilter.length > 0 };
                return item;
            }));
        };

        updateActiveArr();
    }

    return (
        <ul className="filter-items">
            {activeFilters.map((item, index) => {
                const content = getContent(item, activeFilters); 
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

const getContent = (item, activeFilters) => {
    if(item.filter === 'training'){
        return capitalizeFirstLetter(item.value)
    } 

    if(item.filter === 'rating' && item.value === 0){
        return 'Without rating'
    }

    if(item.filter === 'rating'){ 
        const styles = item.isActive ? {color : 'black'} : { color : 'gray' }; 
        return <Stars stars={item.value} fontSize={16} styles={styles} />
    }

    return item.value;
}