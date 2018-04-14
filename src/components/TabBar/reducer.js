import { LOCATION_CHANGE } from 'react-router-redux';

export default (state='hot_showing', action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            const pathname = action.payload.pathname;
            if (pathname === '/hot_showing' || pathname === '/') {
                return 'hot_showing';
            } else if (pathname === '/search_movie'){
                return 'search_movie';
            } else {
                return state;
            }
        default:
            return state;
    }
}
