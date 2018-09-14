import 'typeface-roboto';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FullWidthTabs from './TestApp';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';
require('babel-polyfill');

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL} >
        <FullWidthTabs />
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
