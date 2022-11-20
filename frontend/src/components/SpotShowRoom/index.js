import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import Reviews from '../Reviews';
import * as reviewActions from "../../store/reviews"
import * as spotActions from "../../store/spots"
import './SpotShowRoom.css'

const SpotShow = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    const history = useHistory();
    spotId = +spotId
    const allSpots = useSelector((state) => state.spots)
    const spotToShow = allSpots.spots[spotId]
    const sessionUser = useSelector(state => state.session)
    const reviewsForSpot = useSelector(state => state.reviews)



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
        dispatch(spotActions.currentSpot(spotId))
        dispatch(reviewActions.loadReviews(spotId))
    }, [dispatch])



    //Need to add in Image Reducer to have spot images


    return (
        <>
            {spotToShow !== undefined ?
                <div className='whole-page'>
                    <div className='allContents'>

                        <h1 className='spot-name'>{spotToShow.name} - 3 Bedroom - 2 Bath</h1>
                        <div className='stars-reviews-location'>
                            <span>★{(Math.round(spotToShow.avgRating * 100) / 100).toFixed(1)} • </span>
                            <span>{Object.keys(reviewsForSpot.reviews).length} Reviews •</span>
                            <span> ❖ Superhost •</span>
                            <span> {spotToShow.city},{spotToShow.state},{spotToShow.country}</span>
                        </div>
                        <div className='middle-of-page'>
                            <div className='middle-left'>
                                <img src={spotToShow.previewImage} alt='fillerForNow' className='main-image'></img>
                            </div>
                            <div className='middle-middle'>
                                <img className='top-left' src='https://media.istockphoto.com/photos/freshly-painted-craftsman-bungalow-house-picture-id1415886888?b=1&k=20&m=1415886888&s=170667a&w=0&h=w8r9WQ56sXyAI8bmFGaqeK8R1sju-hdLIVupHP80GhY='></img>
                                <img className='top-right' src='https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'></img>
                                <img className='bottom-left' src='https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg'></img>
                                <img className='bottom-right' src='https://cdn.vox-cdn.com/thumbor/FrnLQTpuAoAmp0GZRZctSSdkC04=/0x0:3000x2000/1200x0/filters:focal(0x0:3000x2000):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/21905363/iStock_185930591.jpg'></img>
                            </div>
                            <div className='middle-right'></div>
                        </div>
                        <div className='info-on-spot'>
                            {Object.values(sessionUser)[0] !== null && sessionUser.user.id === spotToShow.ownerId ?
                                <div>
                                    <>
                                        <button onClick={(event) => editSpotButton(event, spotToShow.id)}>Edit</button>
                                        <button onClick={(event) => deleteSpotButton(event, spotToShow.id)}>Delete</button>
                                    </>
                                </div>
                                : ''}
                            <div className='price-night'>
                                <span className='price'>${spotToShow.price} </span>
                                <span className='night'> night</span>
                            </div>
                            <h3 className='description'>Description</h3>
                            <div className='description-text'>
                                <span>{spotToShow.description}</span>
                            </div>
                            <Reviews />
                        </div>
                    </div>

                </div>
                :
                <>
                    <h1>404 Spot Not Found</h1>
                </>

            }
        </>
    )
}

export default SpotShow
