import { SEARCHSTARTED, SEARCHSUCCESS, SEARCHERROR, LEAVESEARCH } from './actionTypes.js';

const initState = {
    status: 'init',
    movies: []
}

export default function(state=initState, action){
    switch(action.type) {
        case SEARCHSTARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case SEARCHSUCCESS: {
            const oldList = state.movies;
            const newList = oldList.concat(action.payload.data.subjects);
            return {
                ...action.payload.data,
                status: 'success',
                movies: action.payload.isFetchMore ? newList : action.payload.data.subjects
            }
        }
        case SEARCHERROR: {
            return {
                ...state,
                status: 'error'
            }
        }
        case LEAVESEARCH: {
            return initState;
        }
        default: {
            return state;
        }
    }
}
