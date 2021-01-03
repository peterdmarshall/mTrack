import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { NavBar } from './NavBar';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd';
import {isMobile} from 'react-device-detect';


import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from './PrivateRoute';
import { Home } from './Home';
import { Login } from './Login';
import { Board } from './Board';
import { Signup} from './Signup';


function App(props) {
  const { dispatch } = props;
  const { alert, user } = props;
  const history = useHistory();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);


  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        {user && <NavBar></NavBar> }
        {user && alert.message &&
          <div>{alert.message}</div>
        }
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/board" component={Board} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
        </Switch>
      </Box>
    </DndProvider>
  );
}

const mapStateToProps = (state) => {
  const { alert } = state;
  const { authentication } = state;
  const { user } = authentication;
  return {
    alert,
    user
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };