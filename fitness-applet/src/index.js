import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FullWidthTabs from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';
require('babel-polyfill');

ReactDOM.render(
    // <BrowserRouter basename={process.env.PUBLIC_URL} >
        <FullWidthTabs />
    // </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
