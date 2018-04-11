import { FETCH_STARTED, FETCH_SUCCESS, FETCH_ERROR } from './actionTypes.js';
import axios from 'axios';

export const fetchMoviesStarted = () => ({
    type: FETCH_STARTED
})

export const fetchMoviesSuccess = (result) => ({
    type: FETCH_SUCCESS,
    payload: result
})

export const fetchMoviesError = (error) => ({
    type:FETCH_ERROR,
    payload: error
})

export const fetchMovies = () => {
    return (dispatch) => {
        const apiUrl = 'movie/in_theaters';

        dispatch(fetchMoviesStarted);

        axios(apiUrl).then(response=>{
            dispatch(fetchMoviesSuccess(response.data));
        }).catch(response=>{
            dispatch(fetchMoviesError(response.error));
        })
    }
}
