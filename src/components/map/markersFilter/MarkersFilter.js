import React, { useState } from 'react';
import filterImgBlack from '../../../ressources/img/filter_black.png';
import filterImgOrange from '../../../ressources/img/filter_orange.png';
import FilterAccordion from './filterAccordion/FilterAccordion';
import './markersFilter.scss';

const MarkersFilter = () => {
    const [filter, setFilter] = useState(false);

    return (
        <>
            <a className="filter-btn" onClick={() => setFilter(!filter)}>
                <img src={filter ? filterImgOrange : filterImgBlack} title="Filter" alt="Filter for Trainingsmarkers" />
            </a>
            <FilterAccordion/>
        </>
    )
}

export default MarkersFilter