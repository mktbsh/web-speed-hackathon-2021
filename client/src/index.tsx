import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import { Router } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';

import App from './App';
import { location, routes } from './Router';
import { HelmetStateProvider } from './contexts/HelmetContext';

ReactDOM.render(
  <React.StrictMode>
    <HelmetStateProvider>
      <Router routes={routes} location={location}>
        <App />
        <ReactLocationDevtools />
      </Router>
    </HelmetStateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
