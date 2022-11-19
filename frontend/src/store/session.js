// frontend/src/store/session.js
import { csrfFetch } from './csrf';


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const CURRENT_USER_SPOTS = 'session/currentUserSpots'
const CURRENT_USER_REVIEWS = 'session/currentUserReviews'

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

const currentSpots = (userSpots) => {
    return {
        type: CURRENT_USER_SPOTS,
        payload: userSpots
    }
}

const currentReviews = (userReviews) => {
    return {
        type: CURRENT_USER_REVIEWS,
        payload: userReviews
    }
}

export const userSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')
    const data = await response.json();
    dispatch(currentSpots(data))
}

export const userReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current')
    const data = await response.json();
    dispatch(currentReviews(data))
    return response
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;

    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));

    return response;
};

export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    if (Object.values(data).length > 0) {
        dispatch(setUser(data));
        dispatch(userSpots());
        dispatch(userReviews());
    }
    return response;
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        case CURRENT_USER_SPOTS:
            newState = Object.assign({}, state);
            newState.userSpots = {}
            const userSpots = normalizeArray(action.payload.Spots)
            newState.userSpots = userSpots
            return newState
        case CURRENT_USER_REVIEWS:
            newState = Object.assign({}, state);
            newState.userReviews = action.payload
            return newState
        default:
            return state;
    }
};

function normalizeArray(array) {
    const obj = {}
    array.forEach(i => {
        obj[i.id] = i
    })
    return obj
}

export default sessionReducer;
