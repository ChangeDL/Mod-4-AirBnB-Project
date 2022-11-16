import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/updateSpot'
const DELETE_SPOT = 'spots/deleteSpot'


const setSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots,
    };
};

const addSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    }
}

const deleteASpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const updateASpot = (update) => {
    return {
        type: UPDATE_SPOT,
        payload: update
    }
}

export const loadSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const data = await response.json();
    dispatch(setSpots(data))
    return response
}

export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    dispatch(deleteASpot(spotId))
    return response
}

export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }),
    });
    const data = await response.json();
    dispatch(addSpot(data))
    return response;
};

export const updateSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }),
    });
    const data = await response.json();
    dispatch(updateASpot(data))
    return response;
};

const initialState = { spots: {} }


const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = Object.assign({}, state);
            newState.spots = {}
            const spots = normalizeArray(action.payload.Spots)
            newState.spots = spots
            return newState;
        case CREATE_SPOT:
            return {
                ...state,
                spots: { ...state.spots, [action.payload.id]: action.payload }
            }
        case DELETE_SPOT:
            newState = { ...state }
            delete newState.spots[action.spotId]
            return newState
        case UPDATE_SPOT:
            return {
                ...state,
                [action.payload.id]: action.payload
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

export default spotsReducer