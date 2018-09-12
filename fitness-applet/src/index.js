import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';
require('babel-polyfill');

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL} >
        <App />
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
