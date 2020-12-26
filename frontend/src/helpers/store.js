import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { alert } from '../reducers/alert.reducer';
import { authentication } from '../reducers/authentication.reducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({ alert: alert, authentication: authentication });

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);