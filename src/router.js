import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store.js';
import App from './App';
import { view as HotShowing } from './pages/hot_showing';
import { view as SearchMovie } from './pages/search_movie';

const history = syncHistoryWithStore(browserHistory, store);

function AppRouter(props) {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HotShowing} />
                <Route path="hot_showing" component={HotShowing} />
                <Route path="search_movie" component={SearchMovie} />
            </Route>
        </Router>
    )
}

export default AppRouter;
