// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {


    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} className='ProfileButton' />

            </>
        );
    } else {
        sessionLinks = (
            <>


                <button onClick={openMenu} className="profileButton">
                    <i className="fas fa-user-circle" />
                </button>
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li><NavLink to="/login" className="loginbutton">Log In</NavLink></li>
                        <li> <NavLink to="/signup" className="signUpButton">Sign Up</NavLink></li>
                    </ul>
                )}
            </>
        );
    }

    return (
        <>
            <div className='TopHomePage'>
                <div className='left-side'>
                    <NavLink exact to="/">
                        <div className='left-side'>
                            <img src='/images/ABB.png' alt='Logo' className='logo'></img>
                            <span className="homeButton">AtmosphereBnB</span>

                        </div>
                    </NavLink>
                </div>
                <div className='right-side'>
                    {isLoaded && sessionLinks}
                </div>
            </div>

        </>



    );
}

export default Navigation;
