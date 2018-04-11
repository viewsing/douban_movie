import { FETCH_THEATER_STARTED, FETCH_THEATER_SUCCESS, FETCH_THEATER_ERROR,
         FETCH_COMING_STARTED, FETCH_COMING_SUCCESS, FETCH_COMING_ERROR } from './actionTypes.js';
import myFetch from '../../utils/myFetch.js';

export const fetchTheaterStarted = () => ({
    type: FETCH_THEATER_STARTED
})

export const fetchTheaterSuccess = (result) => ({
    type: FETCH_THEATER_SUCCESS,
    payload: result
})

export const fetchTheaterError = (error) => ({
    type: FETCH_THEATER_ERROR,
    payload: error
})

export const fetchTheaterMovies = () => {
    return (dispatch) => {
        const apiUrl = 'movie/in_theaters';

        dispatch(fetchTheaterStarted);

        myFetch(apiUrl).then(data=>{
            dispatch(fetchTheaterSuccess(data));
        }).catch(response=>{
            dispatch(fetchTheaterError(response.error));
        })
    }
}

export const fetchComingStarted = () => ({
    type: FETCH_COMING_STARTED
})

export const fetchComingSuccess = (result) => ({
    type: FETCH_COMING_SUCCESS,
    payload: result
})

export const fetchComingError = (error) => ({
    type: FETCH_COMING_ERROR,
    payload: error
})

export const fetchComingMovies = () => {
    return (dispatch) => {
        const apiUrl = 'movie/coming_soon';

        dispatch(fetchComingStarted);

        myFetch(apiUrl).then(data=>{
            dispatch(fetchComingSuccess(data));
        }).catch(response=>{
            dispatch(fetchComingError(response.error));
        })
    }
}
