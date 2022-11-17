import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots'
import * as sessionActions from '../../store/session'
import * as reviewActions from '../../store/reviews'




import { updateSpot } from '../../store/spots';
import AllSpots from '../Spots';

const EditReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reviewId } = useParams();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(reviewActions.loadReviews(spotId))
    }, [dispatch]);


    const reviewBeingEdited = useSelector(state => state.reviews)


    let editReview = {}



    if (Object.values(reviewBeingEdited.reviews).length > 0) {
        editReview = reviewBeingEdited.reviews[reviewId]
    } else {
        history.push(`/spot/${spotId}`)


    }

    const [review, setReview] = useState(editReview.review)
    const [stars, setStars] = useState(editReview.stars)
    const [errors, setErrors] = useState([])



    const reviewToSubmit = {
        review,
        stars
    }

    const callBack = () => {
        return setTimeout(function () { window.location.reload(); }, 10);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])

        return dispatch(reviewActions.updateReview(reviewId, reviewToSubmit, callBack)).catch(async (res) => {
            const data = await res.json();
            if (data && data.message) setErrors([data.message]);
        })

    }


    return (
        <form onSubmit={handleSubmit}>
            <ul>

                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='review-text'>
                <label>
                    Thought's On This Spot?
                </label>
                <textarea
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </div>
            <div>

                <label>
                    Rating?
                    <input
                        type="number"
                        value={stars}
                        min={1}
                        max={5}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </label>
            </div>

            <button type="submit">Create Review!</button>
        </form>
    )
}

export default EditReviewForm
