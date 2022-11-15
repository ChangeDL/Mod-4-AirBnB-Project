import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots"
import * as sessionActions from "../../store/session"
import './Spots.css'


function AllSpots() {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => state.spots.spots)
    const sessionUser = useSelector(state => state.session.user);






    return (
        <>
            <div className="allSpots">
                {Object.values(allSpots).map(({ id, address, city, state, name, price, previewImage, ownerId }) => (
                    <div key={id} className='singleSpotContainer'>
                        {previewImage && previewImage.includes('.') ?
                            <img src={previewImage} className='spotImages'></img> : <p>No Preview Image For This Place</p>}
                        <h3>{name}</h3>
                        <h4>{city},{state}</h4>
                        <h5>Price Per Day ${price}</h5>
                        {sessionUser && sessionUser.id === ownerId ?
                            <div>
                                <>
                                    <button>Edit</button>
                                    <button>Delete</button>
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
