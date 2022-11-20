import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots"
import './CreateSpotPage.css'

function CreateASpot() {


    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session)
    const allSpots = useSelector((state) => state.spots)


    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [previewImage, setPreviewImage] = useState('')
    const [errors, setErrors] = useState([])


    const callback = () => {
        setTimeout(function () { history.push(`/`); }, 10);

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        let errors = []

        if (!address) errors.push("Street address is required")
        if (!city) errors.push("City is required")
        if (!state) errors.push("State is required")
        if (!lat || (+lat % 1 === 0)) errors.push("Latitude is not valid")
        if (!lng || (+lng % 1 === 0)) errors.push("Longitude is not valid")
        if (!name || name.length > 50) errors.push("Name must be more then 1 character and less than 50 characters")
        if (!description) errors.push("Description is required")
        if (!price) errors.push("Price per day is required")
        if (!previewImage.includes('http')) errors.push('Preview Image Invalid')
        setErrors(errors)
        if (!errors.length) {
            return dispatch(spotActions.createSpot({ address, city, state, country, lat, lng, name, description, price, previewImage }, callback)).catch(async (res) => {
                const data = await res.json();
                if (data && data.message) setErrors([data.message]);
            })

            // history.push('/login')
            // setTimeout(function () { window.location.reload(); }, 10);
        }
    }




    if (sessionUser.user === null) {
        return (
            <>
                <div>If You'd Like To Become A Host, Please Sign In Or Make An Account</div>
                <button><NavLink to="/login" className="loginbutton">Log In</NavLink></button>
                <button> <NavLink to="/signup" className="signUpButton">Sign Up</NavLink></button>
            </>
        )
    }
    return (
        <form onSubmit={handleSubmit} className='whole-spot-form'>
            <ul>

                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div >
                <label>
                    <div className="tag-label">

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
                    <div className="tag-label">
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
                    <div className="tag-label">
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
                    <div className="tag-label">
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
                    <div className="tag-label">
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
                    <div className="tag-label">
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
                    <div className="tag-label">
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
                    <div className="tag-label">
                        <span className="labels">Description:</span>
                        <textarea
                            style={{ resize: "none " }}
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
                    <div className="tag-label">
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
                    <div className="tag-label">
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
            <div>
                <button type="submit">Create Spot!</button>
            </div>
        </form>
    );
}



export default CreateASpot
