import React, { useState } from 'react';
import { AccordionItem } from './accordionItem/AccordionItem';
import MapFilter from '../filters/MapFilter';
import { participants, trainings, dates } from '../filters/filterData';
import './filterAccordion.scss';

const FilterAccordion = ({filter , setFilter, showFilter, activeArr, setActiveArr}) => {

    let items = [
        {
            name: "Date",
            content: <MapFilter items={dates} filter={filter} setFilter={setFilter} activeArr={activeArr} setActiveArr={setActiveArr}/>
        },
        {
            name: "Training",
            content: <MapFilter items={trainings} filter={filter} setFilter={setFilter} activeArr={activeArr} setActiveArr={setActiveArr}/>
        },
        {
            name: "Participants",
            content: <MapFilter items={participants} filter={filter} setFilter={setFilter} activeArr={activeArr} setActiveArr={setActiveArr}/>
        }
    ]

    const handleClick = (index) => {
        const newActiveArr = activeArr.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    active: !item.active,
                };
            }
            return item;
        });

        setActiveArr(newActiveArr);
    };

    return (
        <div className={`accordion ${showFilter ? 'show' : ''}`}>
            <h2 className="accordion-title">Filter by</h2>
            {items.map((item, index) => {
                return (
                    <AccordionItem
                        onClick={() => handleClick(index)}
                        item={item}
                        isActive={activeArr[index].active}
                        key={index}
                        filter={filter}
                        isArrowIconActive={activeArr[index].arrowIconActive}
                    />
                );
            })}
        </div>
    )
}


export default FilterAccordion