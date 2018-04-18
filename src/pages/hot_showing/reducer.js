import { FETCH_THEATER_STARTED, FETCH_THEATER_SUCCESS, FETCH_THEATER_ERROR, LEAVE_THEATER,
         FETCH_COMING_STARTED, FETCH_COMING_SUCCESS, FETCH_COMING_ERROR, LEAVE_COMING,
         CHANGE_TAB_TO } from './actionTypes.js';

const initState = {
    inTheaters: {
        status: 'init',
        movieLists: [],
        scrollTop: 0
    },
    comingSoon: {
        status: 'init',
        movieLists: []
    },
    activeIndex: 0
}

export default (state=initState, action) => {
    switch (action.type) {
        case FETCH_THEATER_STARTED: {
            const oldLists = state.inTheaters.movieLists;
            const newLists = [{status: 'loading', subjects: []}];
            return { 
                ...state,
                fetchDone: false,
                inTheaters: {
                    ...state.inTheaters,
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
                fetchDone: true,
                inTheaters: {
                    ...state.inTheaters,
                    status: 'success',
                    ... action.payload,
                    movieLists: action.payload.isFetchMore ? oldLists.concat(newLists) : newLists
                }
            }
        }
        case FETCH_THEATER_ERROR: {
            return {
                ...state,
                fetchDone: true,
                inTheaters: {
                    ...state.inTheaters,
                    status: 'error'
                }
            }
        }
        case FETCH_COMING_STARTED: {
            const oldLists = state.comingSoon.movieLists;
            const newLists = [{status: 'loading', subjects: []}];
            return { 
                ...state,
                fetchDone: false,
                comingSoon: {
                    ...state.comingSoon,
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
                fetchDone: true,
                comingSoon: {
                    ...state.comingSoon,
                    status: 'success',
                    ... action.payload,
                    movieLists: action.payload.isFetchMore ? oldLists.concat(newLists) : newLists
                }
            }
        }
        case FETCH_COMING_ERROR: {
            return {
                ...state,
                fetchDone: true,
                comingSoon: {
                    ...state.comingSoon,
                    status: 'error'
                }
            }
        }
        case LEAVE_THEATER: {
            return {
                ...state,
                inTheaters: {
                    ...state.inTheaters,
                    scrollTop: action.payload.scrollTop
                }
            }
        }
        case LEAVE_COMING: {
            return {
                ...state,
                comingSoon: {
                    ...state.comingSoon,
                    scrollTop: action.payload.scrollTop
                }
            }
        }
        case CHANGE_TAB_TO: {
            return {
                ...state,
                activeIndex: action.payload.activeIndex
            }
        }
        default:
            return state;
    }
}
