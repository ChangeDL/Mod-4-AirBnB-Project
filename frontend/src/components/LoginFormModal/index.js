// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(true);

    return (
        <>
            {showModal && (
                <Modal >
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
