import React, { useRef } from "react";
import { ReactComponent as ArrowIcon } from "../../../../../ressources/img/arrow-icon.svg";
import './accordionItem.scss'

export const AccordionItem = ({ item, onClick, isActive, isArrowIconActive }) => {
  const itemRef = useRef(null);

  return (
    <li className="accordion-item">
      <button className="accordion-header" onClick={() => onClick()}>
        {item.name}
        <ArrowIcon className={`accordion-arrow ${isActive ? "active" : ""} ${isArrowIconActive ? "orange" : ""}`}/>
      </button>
      <div
        className="accordion-collapse"
        style={
          isActive ? { height: itemRef.current.scrollHeight } : { height: "0px" }
        }
      >
        <div className="accordion-body" ref={itemRef}>
          {item.content}
        </div>
      </div>
    </li>
  );
};