import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots'
import * as sessionActions from '../../store/session'



import { updateSpot } from '../../store/spots';
import AllSpots from '../Spots';


const EditSpotForm = () => {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = +spotId

    useEffect(() => {
        dispatch(spotActions.currentSpot(spotId))
        dispatch(spotActions.loadSpots())
    }, [dispatch, spotId])

    const allSpots = useSelector((state) => state.spots)
    const currentSpot = useSelector(state => state.spots.currentSpot)
    const sessionUser = useSelector((state) => state.session)
    const spotToEdit = allSpots.spots[spotId]

    const history = useHistory();

    if (currentSpot === undefined || spotToEdit === undefined) {
        window.location.reload();
        history.push(`/spot/${spotId}`)

    }

    let previewImageToDelete;

    if (currentSpot !== undefined) {
        previewImageToDelete = (currentSpot.SpotImages.find(image => image.preview === true))


    }




    const [address, setAddress] = useState(spotToEdit.address);
    const [city, setCity] = useState(spotToEdit.city);
    const [state, setState] = useState(spotToEdit.state)
    const [country, setCountry] = useState(spotToEdit.country)
    const [lat, setLat] = useState(spotToEdit.lat)
    const [lng, setLng] = useState(spotToEdit.lng)
    const [name, setName] = useState(spotToEdit.name)
    const [description, setDescription] = useState(spotToEdit.description)
    const [price, setPrice] = useState(spotToEdit.price)
    const [previewImage, setPreviewImage] = useState(spotToEdit.previewImage)
    const [errors, setErrors] = useState([])


    const spot = {
        id: spotId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage
    }

    const callBack = () => {

        setTimeout(function () { history.push(`/spot/${spotId}`); }, 10);
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])

        dispatch(spotActions.deletePreviewImageData(previewImageToDelete.id))
        return dispatch(spotActions.updateSpot(spot, callBack))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
    }


    if (spotToEdit) {
        if (sessionUser.user === null) {
            return (
                <>
                    <div>If You're The Owner Of This Spot Please Sign In To Edit</div>
                    <button><NavLink to="/login" className="loginbutton">Log In</NavLink></button>
                </>
            )
        }
        if (sessionUser.user.id === spotToEdit.ownerId) {
            return (
                <form onSubmit={handleSubmit} className='whole-sign-up'>
                    <ul>

                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div >
                        <label>
                            <div className="input-sign-up3">

                                <span className="labels">Name Of Spot:</span>
                                <input
                                    className="inputs"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div >
                        <label >
                            <div className="input-preview2">
                                <span className="labels">Country:</span>
                                <input
                                    className="input-country"
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="state">
                        <label>
                            <div className="input-sign-up3">
                                <span className="labels">State:</span>
                                <input
                                    className="inputs"
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="city">
                        <label>
                            <div className="input-sign-up3">
                                <span className="labels">City:</span>
                                <input
                                    className="inputs"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="address">
                        <label>
                            <div className="input-sign-up3">
                                <span className="labels">Address:</span>
                                <input
                                    className="inputs"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="latitude">
                        <label>
                            <div className="input-sign-up3">
                                <span className="labels">Latitude: (decimal)</span>
                                <input
                                    className="inputs"
                                    type="number"
                                    value={lat}
                                    onChange={(e) => setLat(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="longitude">
                        <label>
                            <div className="input-sign-up3">
                                <span className="labels">Longitude: (decimal)</span>
                                <input
                                    className="inputs"
                                    type="number"
                                    value={lng}
                                    onChange={(e) => setLng(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="description-of-spot">
                        <label>
                            <div className="input-sign-up3">
                                <span className="labels">Description:</span>
                                <textarea
                                    style={{ resize: "none ", height: 100 }}
                                    className="inputs"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="price-of-spot">
                        <label>
                            <div className="input-sign-up3">
                                <span className="labels">Price:</span>
                                <input
                                    className="inputs"
                                    type="number"
                                    min={1}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="preview-image">
                        <label>
                            <div className="input-preview">
                                <span className="labels">Preview Image: </span>
                                <input
                                    className="inputs"
                                    type="url"
                                    placeholder="http://www.example.com/index.html"
                                    value={previewImage}
                                    onChange={(e) => setPreviewImage(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="submit-button">
                        <button type="submit">Save Changes</button>
                    </div>
                </form>
            )
        } else return (
            <div>You're Not The Owner Of This Spot Please Return To The Home Page</div>
        )
    } else return (
        <div></div>
    )
}

export default EditSpotForm
