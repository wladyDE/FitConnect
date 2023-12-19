import React from 'react'; 
import Stars from '../../../../../feedback/stars/Stars'
import './userFeedback.scss'

const UserReview = ({user, rating}) => {

  return (
    <div className='reviews__item'>
        <img src={user.photoURL} alt={user.displayName} className='reviews__user-foto'/>
        <div className="reviews__item-info">
            <div className="reviews__user-name">{user.displayName}</div>
            <Stars stars={rating.rating} fontSize={15} />
            <div className="reviews__comment">{rating.comment}</div>
        </div>
    </div>
  )
}

export default UserReview