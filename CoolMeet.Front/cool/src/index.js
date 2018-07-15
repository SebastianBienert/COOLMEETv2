import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'popper.js/dist/umd/popper.js';
import 'jquery/dist/jquery';
import 'font-awesome/css/font-awesome.min.css';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
