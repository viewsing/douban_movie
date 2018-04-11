import { TABHOT, TABSEARCH } from './actionTypes.js';

export const tabToHot = (data) => ({
    type: TABHOT,
    payload: {
        data: data
    }
})

export const tabToSearch = (data) => ({
    type: TABSEARCH,
    payload: {
        data: data
    }
})
