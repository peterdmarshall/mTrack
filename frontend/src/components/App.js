import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from './PrivateRoute';
import { Home } from './Home';
import { Login } from './Login';
import { Board } from './Board';
import { Signup} from './Signup';

function App(props) {
  const { dispatch } = props;
  const { alert } = props;
  const history = useHistory();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);
  


  return (
    <div>
      {alert.message &&
        <div>{alert.message}</div>
      }
      <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/board" component={Board} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };