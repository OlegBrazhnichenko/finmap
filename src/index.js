/* eslint-disable import/default */

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore  from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'
require('./favicon.ico');

// dependency for material-ui
import 'typeface-roboto';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const configs = configureStore();

const store = configs.store;
import { Provider } from 'react-redux'
import { Router, Route, Redirect, browserHistory } from 'react-router'

import {RouteAuthorizedOnly, RouteGuestOnly} from "./services/Login/index";

import { syncHistoryWithStore } from 'react-router-redux'
import Test from './components/Test';
import Layout from './scenes/Layout';
import Auth from './scenes/Auth';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={configs.persistor}>
      <Router history={history}>
        <Route component={Layout}>
          <Route onEnter={RouteAuthorizedOnly(store)}>
            <Route path="/main-page" component={Test}/>
          </Route>
          <Route onEnter={RouteGuestOnly(store)}>
            <Route path="/login" component={Auth} />
            <Route path="/registration" component={Auth} />
            <Route path="/forgot-password" component={Auth} />
          </Route>
          <Redirect from="*" to="/login"/>
        </Route>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
