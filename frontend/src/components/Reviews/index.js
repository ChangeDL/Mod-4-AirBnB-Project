import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import * as reviewActions from '../../store/reviews'
import ReviewForm from "../ReviewForm";
import './Reviews.css'


const Reviews = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviewsForSpot = useSelector((state) => state.reviews.reviews)
    const sessionUser = useSelector(state => state.session)
    const allSpots = useSelector((state) => state.spots)



    let spotToShow;
    if (allSpots) {
        spotToShow = allSpots.spots[spotId]
    }




    return (
        <>
            <div className="header-button">
                <h3>Reviews</h3>
                {sessionUser.user.id !== spotToShow.ownerId ?
                    <button className="add-review">Add Review</button>
                    : ''}
            </div>
            <ReviewForm />
            {reviewsForSpot && Object.values(reviewsForSpot).length > 0 ?
                <>
                    <div className="reviewSection">

                        {Object.values(reviewsForSpot).map(({ id, userId, review, stars }) => (
                            <div key={id} className='singleReview'>
                                <span className="review">{review} </span>
                                <span className="reviewRating">★ {stars}</span>
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
