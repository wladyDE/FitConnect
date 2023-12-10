import React, { useState, useEffect, useContext } from 'react';
import RatingStars from './ratingStars/RatingStars';
import { Formik, Form, Field } from 'formik';
import { getFeedback } from '../../service/FeedbackService';
import { AuthContext } from '../../context/AuthContext';
import './feedback.scss'

const Feedback = () => {
  const [feedback, setFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(false); 

  useEffect(() => {
    const fetchFeedbackData = async () => {
        const feedbackData = await getFeedback(currentUser.uid);
        
        
    };

    fetchFeedbackData();
}, []);

  const initialValues = {
    description: ''
  };

  return (
    <div className='feedback'>
      <button type="button" className="close-button">&times;</button>
      <h2 className="feedback-title">Your training has been finished!</h2>
      <h3 className='feedback-subtitle'>Please rate your experience with</h3>

      <Formik initialValues={initialValues}>
          <Form className="feedback__form">
            <RatingStars rating={rating} setRating={setRating} />

            <Field as="textarea" id="description" name="description" placeholder="Feedback" className="feedback-description"/>

            <button className='feedback-btn' type="submit">Send feedback</button>
          </Form>
      </Formik >

    </div>
  )
}

export default Feedback