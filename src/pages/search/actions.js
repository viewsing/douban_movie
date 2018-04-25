import { SEARCHSTARTED, SEARCHSUCCESS, SEARCHERROR, LEAVESEARCH } from './actionTypes.js';
import myFetch from '../../utils/myFetch.js';

export const searchMovieStarted = () => ({
    type: SEARCHSTARTED
})

export const searchMovieSuccess = (data) => ({
    type: SEARCHSUCCESS,
    payload: {
        data: data
    }
})

export const searchMovieError = (error) => ({
    type: SEARCHERROR,
    payload: {
        error: error
    }
})

export const searchMovie = (inputStr, start) => {
    return (dispatch)=>{
        //分页参数
        let queryStr = '?apikey=0b2bdeda43b5688921839c8ecb20399b&q=' + inputStr;
        if (start) {
            queryStr += '&start=' + start;
        }
        const apiUrl = 'movie/search' + queryStr;

        dispatch(searchMovieStarted());
        myFetch(apiUrl).then(function(data){
            dispatch( searchMovieSuccess({...data, isFetchMore: start!==undefined}) );
        }).catch(response => {
            dispatch( searchMovieError(response.error) );
        })
    }
}

export const leaveSearch = () => ({
    type: LEAVESEARCH
})
