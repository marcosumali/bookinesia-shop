import { CHANGE_COMPONENT, SHOW_CHILD } from '../../constant/action-types';
import store from '../index';

export const changeComponent = (data) => {
  return dispatch => {
    const raw = store.getState();
    let stateStatus = raw.stateStatus;
    console.log(stateStatus);
    stateStatus.forEach(stt => {
      if (stt.name === data) {
        stt.status = true;
      } else {
        stt.status = false;
      }
    });
    dispatch(changeComponentAct(stateStatus));
  }
}

export const showChild = (data, currentData) => {
  return dispatch => {
    const stateStatus = currentData;
    stateStatus.forEach(stt => {
      if (stt.name === data) {
        stt.childStatus = true;
      } else {
        stt.childStatus = false;
      }
    });
    dispatch(showChildAct(stateStatus));
  }
}

const changeComponentAct = (data) => ({
  type: CHANGE_COMPONENT,
  payload: data
})

const showChildAct = (data) => ({
  type: SHOW_CHILD,
  payload: data
})