import React from 'react'
import logoBlack from '../../../ressources/img/logo_black.png';
import logoOrange from '../../../ressources/img/logo_orange.png';
import './addTrainingButton.scss'; 

const AddTrainingButton = ({plusBtn, setPlusBtn, setSelected}) => {
    const onAddTrainingClick = () => {
        setPlusBtn(!plusBtn);
        setSelected(null);
    }

    return (
        <>
            <button className={`btn btn-add ${plusBtn ? 'btn-active' : ''}`} onClick={onAddTrainingClick}>Add Training</button>
            <a className="btn-add-media" onClick={onAddTrainingClick}>
                <img src={plusBtn ? logoOrange : logoBlack} alt="Add Training Btn" />
            </a>
        </>
    )
}

export default AddTrainingButton