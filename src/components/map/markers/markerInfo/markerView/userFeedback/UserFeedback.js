import backImg from '../../../../../../ressources/img/back.png';
import React, { useEffect, useState } from 'react';
import CustomBarChart from './CustomBarChart';
import { getUser } from '../../../../../../service/UserService';
import { getFeedback } from '../../../../../../service/FeedbackService';
import Stars from '../../../../../feedback/stars/Stars'
import './userFeedback.scss';
import UserReview from './UserReview';

const UserFeedback = ({ userView, setView }) => {
  const [feedback, setFeedback] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const feedbackData = await getFeedback(userView)
      setFeedback(feedbackData);

      const userPromises = feedbackData.rating.map((item) => getUser(item.userId));
      const usersArray = await Promise.all(userPromises);
      setUsers(usersArray)
    };

    fetchUserData();
  }, []);

  const backToTheMarker = (e) => {
    e.stopPropagation();
    setView(userView);
  };

  if (feedback && users) {
    const { stars, rating, ranking } = feedback;
    const reviews = rating.length === 1 ? '1 review' : `${rating.length} reviews`;


    return (
      <div>
        <img src={backImg} className="marker__user-back-btn" onClick={backToTheMarker} alt='back' />
        <div className="rating">
          <div className="rating__block-left">
            <CustomBarChart ranking={ranking} className="rating__block-left" />
          </div>

          <div className='rating__block-right'>
            <div className='rating-stars-number'>{stars}</div>
            <Stars stars={stars} fontSize={25}/>
            <div>{reviews}</div>
          </div>
        </div>

        <div className="grey-line"></div>

        <div className="reviews">
          {users.map((user, index) => (
            <UserReview key={index} user={user} rating={rating[index]} />
          ))}
        </div>
      </div>
    );
  }
};

export default UserFeedback;
