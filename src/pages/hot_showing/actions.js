import { FETCH_THEATER_STARTED, FETCH_THEATER_SUCCESS, FETCH_THEATER_ERROR, LEAVE_THEATER,
         FETCH_COMING_STARTED, FETCH_COMING_SUCCESS, FETCH_COMING_ERROR, LEAVE_COMING,
         CHANGE_TAB_TO } from './actionTypes.js';
import myFetch from '../../utils/myFetch.js';

export const fetchTheaterStarted = (result) => ({
    type: FETCH_THEATER_STARTED,
    payload: result
})

export const fetchTheaterSuccess = (result) => ({
    type: FETCH_THEATER_SUCCESS,
    payload: result
})

export const fetchTheaterError = (error) => ({
    type: FETCH_THEATER_ERROR,
    payload: error
})

export const fetchTheaterMovies = (start, isFetchMore) => {
    return (dispatch) => {
        //分页参数
        let queryStr = '';
        if (start) {
            queryStr = '?start=' + start;
        }
        const apiUrl = 'movie/in_theaters' + queryStr;

        dispatch(fetchTheaterStarted({isFetchMore}));

        myFetch(apiUrl).then(data=>{
            dispatch(fetchTheaterSuccess({...data, isFetchMore: isFetchMore}));
        }).catch(response=>{
            dispatch(fetchTheaterError(response.error));
        })
    }
}

export const leaveTheater = (scrollTop) => ({
    type: LEAVE_THEATER,
    payload: {
        scrollTop: scrollTop
    }
})

export const fetchComingStarted = (result) => ({
    type: FETCH_COMING_STARTED,
    payload: result
})

export const fetchComingSuccess = (result) => ({
    type: FETCH_COMING_SUCCESS,
    payload: result
})

export const fetchComingError = (error) => ({
    type: FETCH_COMING_ERROR,
    payload: error
})

export const fetchComingMovies = (start, isFetchMore) => {
    return (dispatch) => {
        //分页参数
        let queryStr = '';
        if (start) {
            queryStr = '?start=' + start;
        }
        const apiUrl = 'movie/coming_soon' + queryStr;

        dispatch(fetchComingStarted({isFetchMore}));

        myFetch(apiUrl).then(data=>{
            dispatch(fetchComingSuccess({...data, isFetchMore: isFetchMore}));
        }).catch(response=>{
            dispatch(fetchComingError(response.error));
        })
    }
}

export const leaveComing = (scrollTop) => ({
    type: LEAVE_COMING,
    payload: {
        scrollTop: scrollTop
    }
})

export const changeTabTo = (index) => ({
    type: CHANGE_TAB_TO,
    payload: {
        activeIndex: index
    }
})
