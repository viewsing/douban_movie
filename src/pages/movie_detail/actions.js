import { FETCH_MOVIE_DETAIL, FETCH_MOVIE_STARTED, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR } from './actionTypes.js';
import myFetch from '../../utils/myFetch.js';

export const fetchMovieDetail = (id) => {
    return function(dispatch){
        const apiUrl = '/movie/subject/' + id;
        dispatch(fetchMovieStarted());
        myFetch(apiUrl).then(function(data) {
            dispatch(fetchMovieSuccess(data));
        }).catch(function(error){
            dispatch(fetchMovieError(error));
        })
    }
}

export const fetchMovieStarted = () => ({
    type: FETCH_MOVIE_STARTED,
    payload: {
        status: 'loading'
    }
})

export const fetchMovieSuccess = (data) => ({
    type: FETCH_MOVIE_SUCCESS,
    payload: {
        status: 'success',
        data: data
    }
})

export const fetchMovieError = (error) => ({
    type: FETCH_MOVIE_ERROR,
    payload: {
        status: 'error',
        error: error
    }
})
