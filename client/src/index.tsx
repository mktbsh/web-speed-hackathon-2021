import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import { Router } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';

import App from './App';
import { location, routes } from './Router';

import { AppProvider } from './providers/AppProvider';

window.__BUILD_INFO__ = {
  BUILD_DATE: new Date().toISOString(),
  COMMIT_HASH: process.env.REACT_APP_COMMIT_HASH,
};

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router routes={routes} location={location}>
        <App />
        <ReactLocationDevtools />
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
