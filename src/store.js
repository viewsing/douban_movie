import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as hotShowReducer } from './pages/hot_showing';
import { reducer as tabReducer } from './components/TabBar';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const reducer = combineReducers({
    tabStatus: tabReducer,
    hotShowing: hotShowReducer,
    routing: routerReducer
})

const store = createStore(
    reducer,
    compose(
        applyMiddleware(ReduxThunk)
    )
)

export default store;
