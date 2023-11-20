import React, { useState } from 'react';
import { AccordionItem } from './accordionItem/AccordionItem';
import TrainingFilter from '../trainingFilter/TrainingFilter';
import './filterAccordion.scss';


const FilterAccordion = () => {
    const [activeArr, setActiveArr] = useState(itemsActive)

    let items = [
        {
            name: "Date",
            content: <div>lit.mpedit. Consequatur tenetur esse architecto beatae dicta illo error ut maiores sed alias. Vel.</div>
        },
        {
            name: "Training",
            content: <TrainingFilter/>
        },
        {
            name: "Participants",
            content: <div>lit.mpedit. Consequatur tenetur es   </div>,
            active : false
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
        active : false
    },
    {
        active : false
    },
    {
        active : false
    }
]


export default FilterAccordion