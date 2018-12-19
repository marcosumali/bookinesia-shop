import { createStore, applyMiddleware, compose } from 'redux';
import Bookinesia from './reducers/bookinesia-reducers';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	Bookinesia,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
