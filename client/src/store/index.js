import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

import dashboardReducer from './dashboard/dashboard.reducers';
import authReducer from './firestore/auth/auth.reducers';
import managementReducer from './firestore/management/management.reducers';
import appointmentReducer from './firestore/appointment/appointment.reducers';
import branchReducer from './firestore/branch/branch.reducers';
import shopReducer from './firestore/shop/shop.reducers';
import staffReducer from './firestore/staff/staff.reducers';
import transactionReducer from './firestore/transaction/transaction.reducers';
import serviceReducer from './firestore/service/service.reducers';
import staffServiceReducer from './firestore/staffService/staffService.reducers';
import staffScheduleReducer from './firestore/staffSchedule/staffSchedule.reducers.js';

const allReducers = combineReducers({
  nav: dashboardReducer,
  auth: authReducer,
  user: managementReducer,
  firebase: firebaseReducer,
  appointment: appointmentReducer,
  branch: branchReducer,
  shop: shopReducer,
  staff: staffReducer,
  transaction: transactionReducer,
  service: serviceReducer,
  staffService: staffServiceReducer,
  staffSchedule: staffScheduleReducer,
});

export default allReducers