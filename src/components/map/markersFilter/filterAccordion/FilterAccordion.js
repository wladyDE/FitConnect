import React, { useState } from 'react';
import { AccordionItem } from '../../../accordionItem/AccordionItem';
import MapFilter from '../filters/MapFilter';
import { participants, trainings, dates } from '../filters/filterData';
import './filterAccordion.scss';

const FilterAccordion = ({ filter, setFilter, showFilter, activeArr, setActiveArr, setShowFilter }) => {
    const [isReset, setIsReset] = useState(false);

    let items = [
        {
            name: "Date",
            content:
                <MapFilter
                    items={dates} filter={filter}
                    setFilter={setFilter}
                    activeArr={activeArr}
                    setActiveArr={setActiveArr}
                    isReset={isReset}
                    setIsReset={setIsReset}
                />
        },
        {
            name: "Training",
            content:
                <MapFilter
                    items={trainings}
                    filter={filter}
                    setFilter={setFilter}
                    activeArr={activeArr}
                    setActiveArr={setActiveArr}
                    isReset={isReset}
                    setIsReset={setIsReset}
                />
        },
        {
            name: "Participants",
            content:
                <MapFilter
                    items={participants}
                    filter={filter}
                    setFilter={setFilter}
                    activeArr={activeArr}
                    setActiveArr={setActiveArr}
                    isReset={isReset}
                    setIsReset={setIsReset}
                />
        }
    ]

    const onAccordionItemClick = (index) => {
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

    const onResetBtnClick = () => {
        setFilter([]);
        setActiveArr(prevArr => {
            return prevArr.map(item => {
                return { ...item, arrowIconActive: false }
            })
        })
        setIsReset(prev => !prev);
    }

    return (
        <div className={`accordion ${showFilter ? 'show' : ''}`}>
            <button type="button" className="filter-close-button" onClick={() => setShowFilter(false)}>&times;</button>
            <h2 className="accordion-title">Filter by</h2>
            {items.map((item, index) => {
                return (
                    <AccordionItem
                        onClick={() => onAccordionItemClick(index)}
                        item={item}
                        isActive={activeArr[index].active}
                        key={index}
                        filter={filter}
                        isArrowIconActive={activeArr[index].arrowIconActive}
                    />
                );
            })}
            {filter.length > 0 &&
                <button type="button" className="filter-reset-btn" onClick={() => onResetBtnClick()}>Reset Filters</button>}
        </div>
    )
}


export default FilterAccordion