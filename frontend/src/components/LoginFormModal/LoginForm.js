// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom";


function LoginForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);
    useEffect(() => {
        if (sessionUser) setShowModal(false)
    }, [sessionUser]);

    if (sessionUser) return <Redirect to="/" />;

    const demoUser = {
        credential: 'Demo-lition',
        password: 'password'
    }


    const handleDemoLogin = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login(demoUser))
            .then(setShowModal(false))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    if (data && data.message) setErrors([data.message])
                },
            );
    };


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="whole-sign-up">

                <label>
                    <div className="input-sign-up2">

                        <span>Username or Email</span>
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </div>
                </label>
                <label>
                    <div className="input-sign-up2">
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </label>
                <div className="submit-button">
                    <button type="submit">Log In</button>
                    <button onClick={handleDemoLogin}>DemoUser</button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;
