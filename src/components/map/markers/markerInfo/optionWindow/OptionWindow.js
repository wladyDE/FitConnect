import React from 'react';
import './optionWindow.scss';

const OptionWindow = ({ onViewBtnClick, setSelected, setView }) => {
    const onDeleteBtn = (e) => {
        e.stopPropagation();
        setView('delete confirmation');
    }

    const onEditBtn = (e) => {
        e.stopPropagation();
        setView('edit-form');
    }

    return (
        <>
            <div className='edit-marker'>
                {/*<button type="button" className="close-button" onClick={() => {setSelected(null)}}>&times;</button> */}
                <button className='btn btn-view' onClick={onViewBtnClick}>View</button>
                <button className='btn btn-edit' onClick={onEditBtn}>Edit</button>
                <button className='btn btn-delete' onClick={onDeleteBtn}>Delete</button>
            </div>
        </>
    )
}

export default OptionWindow