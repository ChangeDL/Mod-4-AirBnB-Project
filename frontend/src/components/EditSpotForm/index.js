import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import * as spotActions from '../../store/spots'
import * as sessionActions from '../../store/session'


import { updateSpot } from '../../store/spots';
import AllSpots from '../Spots';


const EditSpotForm = () => {
    let { spotId } = useParams();
    const spotIdForRoute = spotId
    spotId = +spotId
    const allSpots = useSelector((state) => state.spots)
    const spotToEdit = allSpots.spots[spotId]
    // console.log(spotToEdit)

    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState(spotToEdit.address);
    const [city, setCity] = useState(spotToEdit.city);
    const [state, setState] = useState(spotToEdit.state)
    const [country, setCountry] = useState(spotToEdit.country)
    const [lat, setLat] = useState(spotToEdit.lat)
    const [lng, setLng] = useState(spotToEdit.lng)
    const [name, setName] = useState(spotToEdit.name)
    const [description, setDescription] = useState(spotToEdit.description)
    const [price, setPrice] = useState(spotToEdit.price)
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
        price
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        const sentSpot = dispatch(spotActions.updateSpot(spot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        if (sentSpot) history.push('/login')
    }

    if (spotToEdit) {
        return (
            <form onSubmit={handleSubmit}>
                <ul>

                    {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div></div>
                <label>
                    Name Of Spot
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <div></div>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <div></div>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <div></div>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <div></div>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <div></div>
                <label>
                    Latitude (decimal)
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>
                <div></div>
                <label>
                    Longitude (decimal)
                    <input
                        type="number"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label>
                <div></div>
                <label>
                    Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <div></div>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <div></div>

                <button type="submit">Update Spot!</button>
            </form>
        )
    } else return (
        <div></div>
    )
}

export default EditSpotForm
