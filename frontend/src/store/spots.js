import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/updateSpot'
const DELETE_SPOT = 'spots/deleteSpot'

const ADD_PREVIEW_IMAGE = 'previewImage/addPreviewImage'
const DELETE_PREVIEW_IMAGE = 'previewImage/deletePreviewImage'



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

const addPreviewImage = (image) => {
    return {
        type: ADD_PREVIEW_IMAGE,
        payload: image,

    }
}
const deleteASpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const deletePreviewImage = (image, spotId) => {
    return {
        type: DELETE_PREVIEW_IMAGE,
        payload: image
    }
}


export const readPreviewImageData = (spotId, previewImage) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: previewImage,
            preview: true

        }),
    });
    const data = await response.json();
    dispatch(addPreviewImage(data))
    return response
}

export const deletePreviewImageData = (imageId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spot-images/${imageId}`, {
        method: 'DELETE'
    });
    dispatch(deletePreviewImage(imageId, spotId))
    return response
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

export const createSpot = (spot, cb) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = spot;
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
            price,
        }),
    });
    const data = await response.json();
    dispatch(addSpot(data))
    dispatch(readPreviewImageData(data.id, previewImage))
    dispatch(cb);
    return response;
};


export const updateSpot = (spot, cb) => async (dispatch) => {
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
    dispatch(cb)
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
        case ADD_PREVIEW_IMAGE:
            state.spots[action.payload.spotId].previewImage = action.payload.url
            return state
        case DELETE_PREVIEW_IMAGE:
            newState = { ...state }
            delete newState.spots[action.spotId]
            return newState
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
