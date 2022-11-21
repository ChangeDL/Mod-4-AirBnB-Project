// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [login, setLogin] = useState(true)

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
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
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
                    {isLoaded && (
                        <ProfileButton
                            user={sessionUser}
                            setLogin={setLogin}
                            setShowModal={setShowModal}
                        />
                    )}
                    {showModal && <Modal onClose={() => setShowModal(false)}>
                        {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
                    </Modal>}
                </div>

            </div>

        </>



    );
}

export default Navigation;
