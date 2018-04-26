import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as hotShowReducer } from './pages/hot_showing';
import { reducer as tabReducer } from './components/TabBar';
import { reducer as movieDetailReducer } from './pages/movie_detail';
import { reducer as searchReducer } from './pages/search';
import { reducer as lookupReducer } from './pages/look_up';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const reducer = combineReducers({
    tabStatus: tabReducer,
    hotShowing: hotShowReducer,
    movieDetail: movieDetailReducer,
    search: searchReducer,
    lookup: lookupReducer,
    routing: routerReducer
})

const store = createStore(
    reducer,
    compose(
        applyMiddleware(ReduxThunk)
    )
)

export default store;
