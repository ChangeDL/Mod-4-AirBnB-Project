import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Spots.css'
import * as spotActions from '../../store/spots'
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session"


function UserSpots() {


    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(spotActions.loadSpots())
    }, [dispatch])

    let allSpots;
    const sessionUser = useSelector(state => state.session.user);
    const session = useSelector(state => state.session)

    let allUserSpots;

    if (session.userSpots) {
        allSpots = (session.userSpots)
    }

    console.log(allUserSpots)


    return (
        <>
            {allSpots !== undefined ?
                <div className="allSpots">

                    {
                        Object.values(allSpots).map(({ id, address, city, state, name, price, previewImage, ownerId, avgRating, createdAt }) => (
                            <div key={`spot${id}`} className='all-spot-contents'>
                                <Link to={`/spot/${id}`}>

                                    {previewImage && previewImage.includes('.') ?
                                        <img src={previewImage} className='singleSpotContainer' alt={name}></img> : <p>No Preview Image For This Place</p>}
                                    <div className="name-location-price">
                                        <div className="name-rating">
                                            {avgRating ?
                                                <span className="avgRating">★{(Math.round(avgRating * 100) / 100).toFixed(1)}</span>
                                                : <span className="avgRating">No Ratings</span>}

                                            <span className="spot-city-state">{city},{state}</span>
                                            {/* <Link to={`/spot/${id}`} className="spot-name">{name}</Link> */}
                                        </div>
                                        <div className="spot-created">
                                            <span>Added: </span>

                                            <span className="month">{Date(createdAt).split(' ')[1]}</span>
                                            <span className="dash">-</span>
                                            <span className="day-in-month">{Date(createdAt).split(' ')[2]}</span>
                                            <span className="dash">-</span>
                                            <span className="year">{Date(createdAt).split(' ')[3]}</span>
                                        </div>
                                        <div className="spot-price">
                                            <span className="price">${price}</span>
                                            <span className="spot-price-text"> night </span>
                                        </div>

                                    </div>


                                </Link>
                            </div>
                        ))
                    }
                </div>
                : ''}
        </>
    )
}


export default UserSpots
