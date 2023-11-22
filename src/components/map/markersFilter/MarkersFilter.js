import React, { useEffect, useState} from 'react';
import filterImgBlack from '../../../ressources/img/filter_black.png';
import filterImgOrange from '../../../ressources/img/filter_orange.png';
import FilterAccordion from './filterAccordion/FilterAccordion';
import './markersFilter.scss';

const MarkersFilter = ({filter, setFilter}) => {
    const [showFilter, setShowFilter] = useState(false);
    const [activeArr, setActiveArr] = useState(itemsActive);

    useEffect(() => {
        activeArr.forEach(element => {
            if(element.arrowIconActive){
                setShowFilter(true); 
            }
        })
    }, [activeArr]);

    return (
        <>
            <a className="filter-btn" onClick={() => setShowFilter(!showFilter)}>
                <img src={showFilter ? filterImgOrange : filterImgBlack} title="Filter" alt="Filter for Trainingsmarkers" />
            </a>
            <FilterAccordion filter={filter} setFilter={setFilter} showFilter={showFilter} activeArr={activeArr} setActiveArr={setActiveArr}/>
        </>
    )
}

let itemsActive = [
    {
        active: false,
        arrowIconActive : false
    },
    {
        active: false,
        arrowIconActive : false
    },
    {
        active: false,
        arrowIconActive : false
    }
]

export default MarkersFilter