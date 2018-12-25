import {
  CHANGE_COMPONENT, SHOW_CHILD, CHANGE_CHILD
} from '../../constant/action-types';

export const changeComponent = (data, raw) => {
  return dispatch => {
    let newStatus = [];
    raw.forEach(stt => {
      let status = { ...stt }; 
      if (stt.name === data) {
        status.status = true;
      } else {
        status.status = false;
      }
      newStatus.push(status);
    });
    dispatch(changeComponentAct(newStatus));
  }
}

export const showChild = (data, raw) => {
  return dispatch => {
    let newStatus = [];
    raw.forEach(stt => {
      let status = { ...stt }; 
      if (stt.name === data) {
        if (!stt.childStatus) {
          status.childStatus = true;
        } else {
          status.childStatus = false;
        }
        status.status = true;
      } else {
        status.childStatus = false;
        status.status = false;
      }
      newStatus.push(status);
    });
    dispatch(showChildAct(newStatus));
  }
}

export const changeChild = (data, parentData, raw) => {
  return dispatch => {
    let newStatus = [];
    raw.forEach(stt => {
      let status = { ...stt }; 
      if (stt.name === parentData) {
        status.child.forEach(chl => {
          if (chl.name === data) {
            chl.status = true;
          } else {
            chl.status = false;
          }
        })
        status.childStatus = true;
      }
      newStatus.push(status);
    });
    dispatch(changeChildAct(newStatus));
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

const changeChildAct = (data) => ({
  type: CHANGE_CHILD,
  payload: data
})
