import React, { useState } from 'react';

const RatingStars = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = value => {
    setRating(value);
  };

  const handleMouseEnter = value => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= (hoverRating || rating)}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <span
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer', color: filled ? 'gold' : 'grey', fontSize : '25px' }}
    >
      ★
    </span>
  );
};

export default RatingStars;


