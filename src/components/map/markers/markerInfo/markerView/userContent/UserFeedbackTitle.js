import React from 'react';
import './userContent.scss';

const UserFeedbackTitle = ({ userFeedback, setView }) => {
    const stars = [];
    for (let i = 0; i < userFeedback.stars; i++) {
        stars.push(<Star key={i} />);
    }

    const reviews = userFeedback.rating.length === 1 ? '1 review' : `${userFeedback.rating.length} reviews`;

    const onShowFeedback = (e) => {
        e.stopPropagation();
        setView('feedback');
    }

    return (
        <div className="marker__feedback-title">
            <div className="marker__feedback-stars-value">{userFeedback.stars}</div>
            <div className="marker__feedback-stars">{stars}</div>
            <div className="marker__feedback-link" onClick={(e) => onShowFeedback(e)}>{reviews}</div>
        </div>
    );
};

const Star = () => {
    return <span className="star">&#9733;</span>;
};

export default UserFeedbackTitle;
