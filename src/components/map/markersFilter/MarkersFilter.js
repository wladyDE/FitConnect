import React, { useEffect, useState } from 'react';
import filterImgBlack from '../../../ressources/img/filter_black.png';
import filterImgOrange from '../../../ressources/img/filter_orange.png';
import FilterAccordion from './filterAccordion/FilterAccordion';
import './markersFilter.scss';

const MarkersFilter = ({ filter, setFilter, setSelected }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [activeArr, setActiveArr] = useState(itemsActive);

    useEffect(() => {
        activeArr.forEach(element => {
            if (element.arrowIconActive) {
                setShowFilter(true);
            }
        })
    }, [activeArr]);

    const onFilterBtnClick = () => {
        setSelected(null); 
        setShowFilter(!showFilter);
    }

    return (
        <>
            <a className="filter-btn" onClick={() => onFilterBtnClick()}>
                <img src={getImage(activeArr)} title="Filter" alt="Filter for Trainingsmarkers" />
            </a>
            <FilterAccordion
                filter={filter}
                setFilter={setFilter}
                showFilter={showFilter}
                activeArr={activeArr}
                setActiveArr={setActiveArr}
                setShowFilter={setShowFilter}
            />
        </>
    )
}

const getImage = (activeArr) => {
    const isFilterOn = activeArr.some(filter => filter.arrowIconActive === true); 
    return isFilterOn ? filterImgOrange : filterImgBlack; 
}

let itemsActive = [
    {
        active: false,
        arrowIconActive: false
    },
    {
        active: false,
        arrowIconActive: false
    },
    {
        active: false,
        arrowIconActive: false
    },
    {
        active: false,
        arrowIconActive: false
    }
]

export default MarkersFilter