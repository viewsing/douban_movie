import { FETCH_THEATER_STARTED, FETCH_THEATER_SUCCESS, FETCH_THEATER_ERROR,
         FETCH_COMING_STARTED, FETCH_COMING_SUCCESS, FETCH_COMING_ERROR } from './actionTypes.js';

const initState = {
    inTheaters: {},
    comingSoon: {}
}

export default (state=initState, action) => {
    switch (action.type) {
        case FETCH_THEATER_STARTED:
            return { 
                ...state,
                inTheaters: {
                    status: 'loading' 
                }
            }
        case FETCH_THEATER_SUCCESS:
            return { 
                ...state,
                inTheaters: {
                    status: 'success',
                    ...action.payload
                }
            }
        case FETCH_THEATER_ERROR:
            return {
                ...state,
                inTheaters: {
                    status: 'error'
                }
            }
        case FETCH_COMING_STARTED:
            return { 
                ...state,
                comingSoon: {
                    status: 'loading' 
                }
            }
        case FETCH_COMING_SUCCESS:
            return { 
                ...state,
                comingSoon: {
                    status: 'success',
                    ...action.payload
                }
            }
        case FETCH_COMING_ERROR:
            return {
                ...state,
                comingSoon: {
                    status: 'error'
                }
            }
        default:
            return state;
    }
}
