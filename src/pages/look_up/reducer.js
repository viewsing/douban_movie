import { LOOKUPSTARTED, LOOKUPSUCCESS, LOOKUPERROR } from './actionTypes.js';

const initState = {
    status: 'init',
    topMovies: [],
    usMovies: [],
    weeklyMovies: [],
    newsMovies: []
}

export default (state=initState, action) => {
    switch(action.type) {
        case LOOKUPSTARTED: {
            return {
                ...state,
                status: 'loading'
            }
        }
        case LOOKUPSUCCESS: {
            return {
                ...action.payload.data,
                status: 'success'
            }
        }
        case LOOKUPERROR: {
            return {
                ...action.payload.error,
                status: 'error'
            }
        }
        default: {
            return state
        }
    }
}
