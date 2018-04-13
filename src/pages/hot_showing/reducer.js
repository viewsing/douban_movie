import { FETCH_THEATER_STARTED, FETCH_THEATER_SUCCESS, FETCH_THEATER_ERROR,
         FETCH_COMING_STARTED, FETCH_COMING_SUCCESS, FETCH_COMING_ERROR } from './actionTypes.js';

const initState = {
    inTheaters: {
        status: 'init',
        movieLists: []
    },
    comingSoon: {
        status: 'init',
        movieLists: []
    }
}

export default (state=initState, action) => {
    switch (action.type) {
        case FETCH_THEATER_STARTED: {
            const oldLists = state.inTheaters.movieLists;
            const newLists = [{status: 'loading', subjects: []}];
            return { 
                ...state,
                isFetchMore: action.payload.isFetchMore,
                inTheaters: {
                    status: 'loading',
                    movieLists: action.payload.isFetchMore ? oldLists.concat(newLists) : newLists 
                }
            }
        }
        case FETCH_THEATER_SUCCESS: {
            const oldLists = state.inTheaters.movieLists;
            oldLists.pop();
            const newLists = [{status: 'success', subjects: action.payload.subjects}]
            return { 
                ...state,
                inTheaters: {
                    status: 'success',
                    isFetchMore: action.payload.isFetchMore,
                    ... action.payload,
                    movieLists: action.payload.isFetchMore ? oldLists.concat(newLists) : newLists
                }
            }
        }
        case FETCH_THEATER_ERROR: {
            return {
                ...state,
                isFetchMore: action.payload.isFetchMore,
                inTheaters: {
                    status: 'error'
                }
            }
        }
        case FETCH_COMING_STARTED: {
            const oldLists = state.comingSoon.movieLists;
            const newLists = [{status: 'loading', subjects: []}];
            return { 
                ...state,
                isFetchMore: action.payload.isFetchMore,
                comingSoon: {
                    status: 'loading',
                    movieLists: action.payload.isFetchMore ? oldLists.concat(newLists) : newLists 
                }
            }
        }
        case FETCH_COMING_SUCCESS: {
            const oldLists = state.comingSoon.movieLists;
            oldLists.pop();
            const newLists = [{status: 'success', subjects: action.payload.subjects}]
            return { 
                ...state,
                isFetchMore: action.payload.isFetchMore,
                comingSoon: {
                    status: 'success',
                    ... action.payload,
                    movieLists: action.payload.isFetchMore ? oldLists.concat(newLists) : newLists
                }
            }
        }
        case FETCH_COMING_ERROR: {
            return {
                ...state,
                isFetchMore: action.payload.isFetchMore,
                comingSoon: {
                    status: 'error'
                }
            }
        }
        default:
            return state;
    }
}
