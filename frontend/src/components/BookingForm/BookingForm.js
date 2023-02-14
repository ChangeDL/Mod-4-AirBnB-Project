import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../store/bookings';
import LoginFormModal from '../LoginFormModal';
import './BookingForm.css'
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage';

const BookingForm = ({ spot, user }) => {
    const dispatch = useDispatch()

    const [date, setDate] = useState(new Date());
    const [errors, setErrors] = useState([])
    const [login, setLogin] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [disable, setDisable] = useState(true)


    const spotId = +spot.id


    let startDate = (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date[0]));
    startDate = (startDate.split(',')[0].split('/'))
    startDate.unshift(startDate.splice(2, 1)[0])
    startDate = startDate.join('-')


    let endDate = (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date[1]));
    endDate = (endDate.split(',')[0].split('/'))
    endDate.unshift(endDate.splice(2, 1)[0])
    endDate = endDate.join('-')


    const submitBooking = async (e) => {
        e.preventDefault()
        setErrors([])

        const bookingToCreate = {
            spotId,
            startDate,
            endDate
        }
        setDate(new Date())
        return dispatch(createBooking(bookingToCreate)).catch(async (res) => {
            const data = await res.json();
            if (data && data.message) setErrors([data.message]);
        })
    }

    useEffect(() => {
        if (date.length < 2) setDisable(true)
        else setDisable(false)
    }, [date])

    return (
        <div className='app'>
            <h1 className='text-center'>Book This Spot!</h1>
            {Object.values(errors).map((error, idx) => <span key={idx}>{error}</span>)}
            <div className='calendar-container'>
                <Calendar
                    onChange={setDate}
                    value={date}
                    selectRange={true}
                    tileDisabled={({ date }) => date.getDate() === new Date()}
                />
            </div>
            {date.length > 0 ? (
                <p className='text-center'>
                    <span className='bold'>Start:</span>{' '}
                    {date[0].toDateString()}
                    &nbsp;|&nbsp;
                    <span className='bold'>End:</span> {date[1].toDateString()}
                </p>
            ) : (
                <p className='text-center'>
                    <span className='bold'>Default selected date:</span>{' '}
                    {date.toDateString()}
                </p>
            )}
            <div className='button-to-book-or-login'>

                {user.user === null ?
                    <button
                        className="book-login-button-booking-form"
                        onClick={() => {
                            setLogin(true)
                            setShowModal(true)
                        }}>Log In</button> : null}
                {user.user !== null && spot?.Owner?.id !== user.user?.id ?
                    <button onClick={e => submitBooking(e)} className='book-login-button-booking-form' disabled={disable}>Book</button>
                    : null}
                {showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                        {login ? <LoginForm setShowModal={setShowModal} /> : <SignupFormPage setShowModal={setShowModal} />}
                    </Modal>}
            </div>
        </div>

    );
}

export default BookingForm
