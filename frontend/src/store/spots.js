import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'

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


export const loadSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const data = await response.json();
    dispatch(setSpots(data))
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

const initialState = { spots: {} }


const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = Object.assign({}, state);
            newState.spots = action.payload.Spots;
            return newState;
        case CREATE_SPOT:
            return {
                ...state,
                spots: { ...state.spots, [action.payload.id]: action.payload }
            }
        default:
            return state
    }

}

export default spotsReducer
