import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import dashboardReducer from './dashboard/dashboard.reducers';
import managementReducer from './firestore/management/management.reducers';

const allReducers = combineReducers({
  nav: dashboardReducer,
  user: managementReducer,
  firebase: firebaseReducer,
});

export default allReducers