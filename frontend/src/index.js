import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'fontsource-roboto';

import { store, persistor } from './helpers/store';
import { PersistGate } from 'redux-persist/integration/react'
import { App } from './components/App';
import reportWebVitals from './reportWebVitals';
import HttpsRedirect from 'react-https-redirect';

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router><App /></Router>
      </PersistGate>
    </Provider>
  </HttpsRedirect>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
