import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import AppRouter from './router.js';
import store from './store.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store = {store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
