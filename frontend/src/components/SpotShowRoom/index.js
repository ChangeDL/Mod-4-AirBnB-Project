import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const SpotShow = () => {
    let { spotId } = useParams();
    spotId = +spotId
    const allSpots = useSelector((state) => state.spots)
    const spotToShow = allSpots.spots[spotId]

    //Need to add in Image Reducer to have spot images
    //Need to add Review Reducer to have reviews for spots

    return (
        <>
            {spotToShow ?
                <>
                    <img src={spotToShow.previewImage} alt='fillerForNow'></img>
                    <div></div>
                    <h1>{spotToShow.name}</h1>
                    <h2>${spotToShow.price} Per Day</h2>
                </>
                : ''}
        </>
    )
}

export default SpotShow
