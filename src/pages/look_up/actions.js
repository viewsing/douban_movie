import { LOOKUPSTARTED, LOOKUPSUCCESS, LOOKUPERROR } from './actionTypes.js';
import { myFetchAll } from '../../utils/myFetch.js';

export const lookupStarted = () => ({
    type: LOOKUPSTARTED
})

export const lookupSuccess = (data) => ({
    type: LOOKUPSUCCESS,
    payload: {
        data: data
    }
})

export const lookupError = (error) => ({
    type: LOOKUPERROR,
    payload: {
        error: error
    }
})

export const lookupMovies = () => {
    return function(dispatch) {
        const topUrl = 'movie/top250?count=5&apikey=0b2bdeda43b5688921839c8ecb20399b';
        const usUrl = 'movie/us_box?count=5&apikey=0b2bdeda43b5688921839c8ecb20399b';
        const weeklyUrl = 'movie/weekly?count=5&apikey=0b2bdeda43b5688921839c8ecb20399b';
        const newsUrl = 'movie/new_movies?count=5&apikey=0b2bdeda43b5688921839c8ecb20399b';
        
        dispatch(lookupStarted);

        myFetchAll(function(topMovies, usMovies, weeklyMovies, newsMovies){
            dispatch(lookupSuccess({
                topMovies: topMovies.subjects,
                usMovies: usMovies.subjects,
                weeklyMovies: weeklyMovies.subjects,
                newsMovies: newsMovies.subjects
            }))
        },function(error){
            dispatch(lookupError(error))
        }, topUrl, usUrl, weeklyUrl, newsUrl);
    }
}
