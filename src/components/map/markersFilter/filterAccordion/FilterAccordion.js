import React, { useState } from 'react';
import { AccordionItem } from './accordionItem/AccordionItem';
import MapFilter from '../filters/MapFilter';
import { participants, trainings, dates } from '../filters/filterData';
import './filterAccordion.scss';


const FilterAccordion = () => {
    const [activeArr, setActiveArr] = useState(itemsActive)

    let items = [
        {
            name: "Date",
            content: <MapFilter items={dates} />
        },
        {
            name: "Training",
            content: <MapFilter items={trainings}/>
        },
        {
            name: "Participants",
            content: <MapFilter items={participants}/>
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
        <div className='accordion'>
            <h2 className="accordion-title">Filter by</h2>
            {items.map((item, index) => {
                return (
                    <AccordionItem
                        onClick={() => handleClick(index)}
                        item={item}
                        isActive={activeArr[index].active}
                        key={index}
                    />
                );
            })}
        </div>
    )
}

let itemsActive = [
    {
        active: false
    },
    {
        active: false
    },
    {
        active: false
    }
]


export default FilterAccordion