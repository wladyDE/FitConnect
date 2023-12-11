import React, { useState, useEffect, useContext } from 'react';
import RatingStars from './ratingStars/RatingStars';
import { Formik, Form, Field } from 'formik';
import { getFeedback, updateRating} from '../../service/FeedbackService';
import { AuthContext } from '../../context/AuthContext';
import { getUser} from '../../service/UserService'
import defaultUserPhoto from '../../ressources/img/user.png'
import './feedback.scss'

const Feedback = () => {
  const [feedback, setFeedback] = useState(null);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('loading');
  const [validationError, setValidationError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const feedback = await getFeedback(currentUser.uid);
      if (feedback) {
        const user = await getUser(feedback.creator);
        const updatedFeedback = {
          ...feedback,
          userPhoto: user.photoURL,
          userName: user.displayName
        };
        setFeedback(updatedFeedback);
        setStatus('show')
      } else {
        setFeedback(null)
        setStatus('nothing')
      }
    };

    fetchFeedbackData();
  }, []);

  const onClose = () => {
    setStatus('nothing')
  }

  const handleSubmit = (values) => {
    if (rating === 0) {
      setValidationError('Please rate the user')
      setTimeout(() => setValidationError(null), 3000)
    } else {
      const myFeedBack = {
        rating,
        comment : values.description
      }
      updateRating(currentUser.uid, feedback.id, feedback.creator, myFeedBack); 
      setStatus('nothing'); 
    }
  };

  const initialValues = {
    description: ''
  };

  if (status === 'show') {
    return (
      <div className='feedback'>
        <button type="button" className="close-button" onClick={onClose}>&times;</button>
        <h2 className="feedback-title">Your {feedback.training} training has been finished!</h2>
        <div className="feedback-row">
          <h3 className='feedback-subtitle'>Please rate your experience with {feedback.userName}</h3>
          <img src={feedback.userPhoto || defaultUserPhoto} alt={feedback.userName} className='feedback__user-photo' />
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="feedback__form">
            <RatingStars rating={rating} setRating={setRating} />
            {validationError && <div className="error-message">{validationError}</div>}

            <Field as="textarea" id="description" name="description" placeholder="Leave Feedback" className="feedback-description" />

            <button className='feedback-btn' type="submit">Send feedback</button>
          </Form>
        </Formik >

      </div>
    )
  }
}

export default Feedback