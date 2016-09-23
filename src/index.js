import './style/main';

// Uncomment the following line to enable the polyfill
// require("babel/polyfill");

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="*" component={Root}/>
    </Router>
  </Provider>
), document.getElementById('app'));
