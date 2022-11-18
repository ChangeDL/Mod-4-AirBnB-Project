import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import Reviews from '../Reviews';
import * as reviewActions from "../../store/reviews"
import * as spotActions from "../../store/spots"

const SpotShow = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    const history = useHistory();
    spotId = +spotId
    const allSpots = useSelector((state) => state.spots)
    const spotToShow = allSpots.spots[spotId]
    const sessionUser = useSelector(state => state.session)


    const deleteSpotButton = (e, id) => {
        e.preventDefault()
        dispatch(spotActions.deleteSpot(id))
        return setTimeout(function () { history.push('/'); }, 10);

    }

    const editSpotButton = (e, id) => {
        e.preventDefault();
        history.push(`/spot/edit/${id}`)
    }




    useEffect(() => {
        dispatch(spotActions.loadSpots())
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
                            {Object.values(sessionUser)[0] !== null && sessionUser.user.id === spotToShow.ownerId ?
                                <div>
                                    <>
                                        <button onClick={(event) => editSpotButton(event, spotToShow.id)}>Edit</button>
                                        <button onClick={(event) => deleteSpotButton(event, spotToShow.id)}>Delete</button>
                                    </>
                                </div>
                                : ''}
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
