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
        history.push('/login')
    }

    const editSpotButton = (e, id) => {
        e.preventDefault();
        history.push(`/spot/edit/${id}`)
    }




    return (
        <>
            <div className="allSpots">
                {Object.values(allSpots).map(({ id, address, city, state, name, price, previewImage, ownerId }) => (
                    <div key={`spot${id}`} >
                        {previewImage && previewImage.includes('.') ?
                            <img src={previewImage} className='singleSpotContainer' alt={name}></img> : <p>No Preview Image For This Place</p>}
                        <div>
                            <Link to={`/spot/${id}`} className="spot-name">{name}</Link>

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
