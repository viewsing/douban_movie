import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store.js';
import App from './App';
import { view as HotShowing } from './pages/hot_showing';
import { view as LookUp } from './pages/look_up';
import { view as MovieDetail } from './pages/movie_detail';
import { view as Search } from './pages/search';

const history = syncHistoryWithStore(browserHistory, store);

function AppRouter(props) {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HotShowing} />
                <Route path="hot_showing" component={HotShowing} />
                <Route path="search_movie" component={LookUp} />
                <Route path="movie_detail/:id" component={MovieDetail} />
                <Route path="search" component={Search} />
            </Route>
        </Router>
    )
}

export default AppRouter;
