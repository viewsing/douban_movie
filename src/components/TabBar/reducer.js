import { TABHOT, TABSEARCH} from './actionTypes.js';

export default (state='hot_showing', action) => {
    switch (action.type) {
        case TABHOT:
            return action.payload.data;
        case TABSEARCH:
            return action.payload.data;
        default:
            return state;
    }
}
