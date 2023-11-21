import React, { useState } from 'react';
import { AccordionItem } from './accordionItem/AccordionItem';
import TrainingFilter from '../filters/trainingFilter/TrainingFilter';
import ParticipantsFilter from '../filters/participantsFilter/ParticipantsFilter';
import './filterAccordion.scss';
import DateFilter from '../filters/dateFilter/DateFilter';


const FilterAccordion = () => {
    const [activeArr, setActiveArr] = useState(itemsActive)

    let items = [
        {
            name: "Date",
            content: <DateFilter />
        },
        {
            name: "Training",
            content: <TrainingFilter />
        },
        {
            name: "Participants",
            content: <ParticipantsFilter />
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