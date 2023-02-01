import { csrfFetch } from './csrf';

const LOAD_BOOKINGS = 'bookings/loadBookings'
const CREATE_BOOKING = 'bookings/createBooking'

const setBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        payload: bookings
    }
}

const addBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        payload: booking
    }
}

export const currentBookings = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    const data = await res.json()
    dispatch(setBookings(data))
    return res
}


export const createBooking = (bookingInfo) => async dispatch => {
    const { startDate, endDate, spotId } = bookingInfo
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            startDate,
            endDate
        })
    });
    const data = await res.json();
    dispatch(addBooking(data))
    return res
}


const initialState = { bookingsForSpot: {} }

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKINGS:
            const newState = Object.assign({}, state);
            newState.bookingsForSpot = {}
            const bookings = (action.payload.Bookings)
            newState.bookingsForSpot = bookings
            return newState;

        case CREATE_BOOKING:
            return {
                ...state,
                bookingsForSpot: { ...state.bookingsForSpot, [action.payload.id]: action.payload }
            }
        default:
            return state
    }
}
function normalizeArray(array) {
    const obj = {}
    array.forEach(i => {
        obj[i.id] = i
    })
    return obj
}

export default bookingsReducer
