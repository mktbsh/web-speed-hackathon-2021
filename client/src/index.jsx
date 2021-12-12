import React from 'react';
import ReactDOM from 'react-dom';

import { AppProvider } from './providers/AppProvider';
import { AppContainer } from './containers/AppContainer';

window.addEventListener('load', () => {
  ReactDOM.render(
    <AppProvider>
      <AppContainer />
    </AppProvider>,
    document.getElementById('app'),
  );
});
