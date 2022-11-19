import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots'
import * as sessionActions from '../../store/session'
import * as reviewActions from '../../store/reviews'
import './EditReviewForm.css'




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
        return setTimeout(function () { history.push(`/spot/${spotId}`) }, 10);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])

        return dispatch(reviewActions.updateReview(reviewId, reviewToSubmit, callBack)).catch(async (res) => {
            const data = await res.json();
            if (data && data.message) setErrors([data.message]);
        })

    }

    const deleteReviewButton = (e, id) => {
        e.preventDefault()
        dispatch(reviewActions.deleteReview(id, callBack))


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
                        className='rating'
                        value={stars}
                        min={1}
                        max={5}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='buttons'>
                <button className='save' type="submit">Save Changes</button>
                <button className='delete' onClick={(event) => deleteReviewButton(event, reviewId)}>Delete Review</button>
            </div>
        </form>
    )
}

export default EditReviewForm
