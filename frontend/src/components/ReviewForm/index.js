import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots'
import * as sessionActions from '../../store/session'
import * as reviewActions from '../../store/reviews'
import './ReviewForm.css'



import { updateSpot } from '../../store/spots';
import AllSpots from '../Spots';

const ReviewForm = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)
    const [errors, setErrors] = useState([])


    const reviewToSubmit = {
        review,
        stars
    }

    const callback = () => {
        setTimeout(function () { history.push(`/spot/${spotId}`); }, 10);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])

        return dispatch(reviewActions.createReview(spotId, reviewToSubmit, callback)).catch(async (res) => {
            const data = await res.json();
            if (data && data.message) setErrors([data.message]);

        })


    }


    return (
        <form onSubmit={handleSubmit}>
            <ul>

                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='whole-form'>

                <div className='review-text'>
                    <label>
                        <span>Thought's On This Spot?</span>
                    </label>
                    <textarea
                        className='textarea'
                        style={{ resize: "none " }}
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <div className='review-text'>

                    <label>
                        <div className='rating'>

                            <span>Rating: </span>
                            <input
                                className='stars'
                                type="number"
                                value={stars}
                                min={1}
                                max={5}
                                onChange={(e) => setStars(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                </div>
                <div className='review-text'>

                    <button type="submit">Create Review!</button>
                </div>
            </div>
        </form>
    )
}

export default ReviewForm
