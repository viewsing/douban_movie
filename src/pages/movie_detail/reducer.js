import { FETCH_MOVIE_STARTED, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR } from'./actionTypes';

const initState = {}

export default function(state=initState, action){
    switch(action.type) {
        case FETCH_MOVIE_STARTED: {
            return {
                ...state,
                ...action.payload
            }
        }
        case FETCH_MOVIE_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case FETCH_MOVIE_ERROR: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state;
        }
    }
}
