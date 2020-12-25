import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers/history';
import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from '../components/PrivateRoute';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';

function App(props) {
  const { dispatch } = props;
  const { alert } = props;

  history.listen((location, action) => {
    dispatch(alertActions.clear());
  });


  return (
    <div>
      {alert.message &&
        <div>{alert.message}</div>
      }
      <Router history={history}>
        <div>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert
  }
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };