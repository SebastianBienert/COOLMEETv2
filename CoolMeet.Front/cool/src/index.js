import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './helpers/store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'popper.js/dist/umd/popper.js';
import 'jquery/dist/jquery';
import 'font-awesome/css/font-awesome.min.css';
import 'toastr/build/toastr.min.css';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker(); 
