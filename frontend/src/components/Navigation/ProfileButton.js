// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

import './Navigation.css'

function ProfileButton({ user, setLogin, setShowModal }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };

    return (
        <>
            <button onClick={openMenu} className="profileButton">
                <i className="fa-solid fa-bars"></i>
            </button>
            {showMenu && (user ?
                (< ul className="profile-dropdown">
                    <span className="username">Username: {user.username}</span>
                    <span className="email">Email: {user.email}</span>
                    <span>
                        <NavLink to='/spot/new' className='createASpot'>Become A Host</NavLink>
                    </span>
                    <span>
                        <button onClick={logout} className='logout'>Log Out</button>
                    </span>
                </ul>) :
                (<ul className="profile-dropdown">
                    <button
                        className="logout"
                        onClick={() => {
                            setLogin(true)
                            setShowModal(true)
                        }}>Log In</button>

                    <button
                        className="logout"
                        onClick={() => {

                            setLogin(false)
                            setShowModal(true)
                        }}>
                        Sign Up
                    </button>
                </ul>)
            )
            }
        </>
    );
}

export default ProfileButton;
