import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "macro-css";
import App from './App';


ReactDOM.render(
    <React.StrictMode>
        <Router>
        <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);


