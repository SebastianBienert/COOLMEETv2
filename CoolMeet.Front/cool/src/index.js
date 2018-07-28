import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'popper.js/dist/umd/popper.js';
import 'jquery/dist/jquery';
import 'font-awesome/css/font-awesome.min.css';


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
