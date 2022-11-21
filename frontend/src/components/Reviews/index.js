import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import * as reviewActions from '../../store/reviews'
import EditReviewForm from "../EditReviewForm";
import ReviewForm from "../ReviewForm";
import './Reviews.css'


const Reviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const reviewsForSpot = useSelector((state) => state.reviews.reviews)
    const sessionUser = useSelector(state => state.session)
    const allSpots = useSelector((state) => state.spots)



    // useEffect(() => {
    //     dispatch(reviewActions.loadReviews(spotId))

    // }, [dispatch])


    let spotToShow;
    if (allSpots) {
        spotToShow = allSpots.spots[spotId]
    }

    const addReviewButton = (e, id) => {
        e.preventDefault();
        history.push(`/spot/${id}/review/new`)
    }



    const editReviewButton = (e, spotId, reviewId) => {
        e.preventDefault();
        history.push(`/spot/${spotId}/reviews/${reviewId}`)
    }


    return (
        <>
            <div className="header-button">
                <h3>Reviews</h3>
                {Object.values(sessionUser)[0] !== null && sessionUser.user.id !== spotToShow.ownerId ?
                    <button className="add-review" onClick={event => addReviewButton(event, spotId)}>Add Review</button>
                    : ''}
            </div>
            {reviewsForSpot && Object.values(reviewsForSpot).length > 0 ?
                <>
                    <div className="reviewSection">

                        {Object.values(reviewsForSpot).map(({ id, userId, review, stars, createdAt }) => (
                            <div key={id} className='singleReview'>
                                <span className="review"> {review} </span>


                                <div className="review-created">
                                    <span>Review Added: </span>
                                    <span className="createdAt"> {createdAt.split('T')[0]} </span>
                                    <span className="reviewRating"> ★{stars} </span>
                                    {Object.values(sessionUser)[0] !== null && userId === sessionUser.user.id ?
                                        <>
                                            <div>
                                                <button className="edit-button" onClick={(event) => editReviewButton(event, spotId, id)}>Edit</button>
                                            </div>
                                        </>
                                        : ''}
                                </div>
                            </div>

                        ))
                        }
                    </div>

                </>

                :
                <span>No Reviews Have Been Made For This Spot Yet</span>}
        </>
    )

}

export default Reviews
