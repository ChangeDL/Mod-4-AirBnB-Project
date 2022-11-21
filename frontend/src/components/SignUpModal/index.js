// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';


function SignUpFormModal() {
    const [showModal, setShowModal] = useState(true);

    if (showModal === false) return <Redirect to="/" />;

    return (
        <div className='loginPage'>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </div>
    );
}

export default SignUpFormModal;
