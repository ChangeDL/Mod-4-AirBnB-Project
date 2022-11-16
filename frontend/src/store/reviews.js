import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews'
const ADD_REVIEW = 'reviews/addReview'
const UPDATE_REVIEW = 'reviews/updateReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const setReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews,
    };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
    }
}

const deleteAReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}



export const loadReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    dispatch(setReviews(data))
    return response
}

export const createReview = (spotId, reviewToAdd) => async dispatch => {
    const { review, stars } = reviewToAdd
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            review,
            stars
        }),
    });
    const data = await response.json();
    dispatch(addReview(data))
    return response;
}


export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    dispatch(deleteAReview(reviewId))
    return response
}

const initialState = { reviews: {} }


const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = Object.assign({}, state);
            newState.reviews = {}
            const reviews = normalizeArray(action.payload.Reviews)
            newState.reviews = reviews
            return newState;
        case ADD_REVIEW:
            return {
                ...state,
                reviews: { ...state.reviews, [action.payload.id]: action.payload }
            }
        case DELETE_REVIEW:
            newState = { ...state }
            delete newState.reviews[action.spotId]
            return newState
        case UPDATE_REVIEW:
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

export default reviewReducer
