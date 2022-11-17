import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Spots.css'
import * as spotActions from '../../store/spots'
import { Link, useHistory } from "react-router-dom";


function AllSpots() {


    const allSpots = useSelector((state) => state.spots.spots)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();



    useEffect(() => {
        dispatch(spotActions.loadSpots())
    }, [dispatch])



    const deleteSpotButton = (e, id) => {
        e.preventDefault()
        dispatch(spotActions.deleteSpot(id))
        setTimeout(function () { window.location.reload(); }, 1);
    }

    const editSpotButton = (e, id) => {
        e.preventDefault();
        history.push(`/spot/edit/${id}`)
    }




    return (
        <>
            <div className="allSpots">
                {Object.values(allSpots).map(({ id, address, city, state, name, price, previewImage, ownerId, avgRating }) => (
                    <div key={`spot${id}`} className='all-spot-contents'>
                        {previewImage && previewImage.includes('.') ?
                            <Link to={`/spot/${id}`}> <img src={previewImage} className='singleSpotContainer' alt={name}></img> </Link> : <p>No Preview Image For This Place</p>}
                        <div className="name-location-price">
                            <div className="name-rating">
                                {avgRating ?
                                    <span className="avgRating">★{avgRating}</span>
                                    : <span className="avgRating">No Ratings</span>}
                                <Link to={`/spot/${id}`} className="spot-name">{name}</Link>
                            </div>


                            <h4 className="spot-city-state">{city},{state}</h4>
                            <h5 className="spot-price">Price Per Day ${price}</h5>
                        </div>
                        {sessionUser && sessionUser.id === ownerId ?
                            <div>
                                <>
                                    <button onClick={(event) => editSpotButton(event, id)}>Edit</button>
                                    <button onClick={(event) => deleteSpotButton(event, id)}>Delete</button>
                                </>
                            </div>
                            : ''}

                    </div>
                ))
                }
            </div>
        </>
    )
}


export default AllSpots
