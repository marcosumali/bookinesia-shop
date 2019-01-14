import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

const allReducers = combineReducers({
  firebase: firebaseReducer,
});

export default allReducers