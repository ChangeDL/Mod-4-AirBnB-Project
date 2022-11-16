import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Reviews from '../Reviews';
import * as reviewActions from "../../store/reviews"

const SpotShow = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = +spotId
    const allSpots = useSelector((state) => state.spots)
    const spotToShow = allSpots.spots[spotId]

    useEffect(() => {
        dispatch(reviewActions.loadReviews(spotId))
    }, [dispatch])


    //Need to add in Image Reducer to have spot images
    //Need to add Review Reducer to have reviews for spots

    return (
        <>
            {spotToShow ?
                <>
                    <div className='allContents'>

                        <img src={spotToShow.previewImage} alt='fillerForNow'></img> {/*Replace with image reducer */}
                        <div className='info-on-spot'>

                            <h1>{spotToShow.name} ★{spotToShow.avgRating} </h1>
                            <h2>${spotToShow.price} Per Day</h2>
                            <h3>Description</h3>
                            <p>{spotToShow.description}</p>
                            <Reviews />
                        </div>
                    </div>

                </>
                : ''}
        </>
    )
}

export default SpotShow
