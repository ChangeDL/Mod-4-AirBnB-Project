import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots"


function CreateASpot() {


    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session)
    console.log(sessionUser)

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [errors, setErrors] = useState([])




    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        const spot = dispatch(spotActions.createSpot({ address, city, state, country, lat, lng, name, description, price }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        if (spot) history.push('/login')

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
            <button type="submit">Create Spot!</button>
        </form>
    );
}



export default CreateASpot
