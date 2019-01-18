import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import dashboardReducer from './dashboard/dashboard.reducers';
import managementReducer from './firestore/management/management.reducers';
import appointmentReducer from './firestore/appointment/appointment.reducers';
import branchReducer from './firestore/branch/branch.reducers';
import shopReducer from './firestore/shop/shop.reducers';
import staffReducer from './firestore/staff/staff.reducers';
import transactionReducer from './firestore/transaction/transaction.reducers';

const allReducers = combineReducers({
  nav: dashboardReducer,
  user: managementReducer,
  firebase: firebaseReducer,
  appointment: appointmentReducer,
  branch: branchReducer,
  shop: shopReducer,
  staff: staffReducer,
  transaction: transactionReducer
});

export default allReducers