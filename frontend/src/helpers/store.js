import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { alert } from '../reducers/alert.reducer';
import { authentication } from '../reducers/authentication.reducer';
import { board } from '../reducers/board.reducer';
import { column } from '../reducers/column.reducer';
import { card } from '../reducers/card.reducer';
import { user } from '../reducers/user.reducer';

const persistConfig = {
    key: 'root',
    storage,
}

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({ alert: alert, authentication: authentication, board: board, column: column, card: card, user: user });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    )),
);

const persistor = persistStore(store);

export { store, persistor }