// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


function LoginFormModal() {
    const [showModal, setShowModal] = useState(true);

    if (showModal === false) return <Redirect to="/" />;

    return (
        <div className='loginPage'>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </div>
    );
}

export default LoginFormModal;
