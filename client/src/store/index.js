import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import dashboardReducer from './dashboard/dashboard.reducers';

const allReducers = combineReducers({
  nav: dashboardReducer,
  firebase: firebaseReducer,
});

export default allReducers