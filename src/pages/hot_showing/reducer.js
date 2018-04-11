import { FETCH_STARTED, FETCH_SUCCESS, FETCH_ERROR } from './actionTypes.js';

export default (state={}, action) => {
    switch (action.type) {
        case FETCH_STARTED:
            return { status: 'loading' }
        case FETCH_SUCCESS:
            return { ...state, status: 'success', ...action.payload }
        case FETCH_ERROR:
            return { status: 'error' }
        default:
            return state;
    }
}
