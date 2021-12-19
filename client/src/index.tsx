import * as serviceWorkerRegistration from './lib/service-worker/registration';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import { Router } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';

import App from './App';
import { location, routes } from './Router';
import { HelmetStateProvider } from './contexts/HelmetContext';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetStateProvider>
        <Router routes={routes} location={location}>
          <App />
          <ReactLocationDevtools />
        </Router>
      </HelmetStateProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
