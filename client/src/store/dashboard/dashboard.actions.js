// ---------------------------------------------- DASHBOARD ACTION ----------------------------------------------
// Dispatch function to set display to show to users
export const dispatchToSetDisplayToShow = (text, manageStatus, reportsStatus) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(dispatchToSetMenuToShow(text))
    dispatch(setSubMenuDisplayToShow(''))

    if (text === 'Manage') {
      if (manageStatus === true) {
        dispatch(setManageToShow(false))
      } else {
        dispatch(setManageToShow(true))
      }
    } else if (text === 'Reports') {
      if (reportsStatus === true) {
        dispatch(setReportsToShow(false))
      } else {
        dispatch(setReportsToShow(true))
      }
    } else if (text === 'Welcome') {
      dispatch(setDisplayToShow(text))
    } else if (text === 'Calendar') {
      dispatch(setDisplayToShow(text))
    }
  }
}

const setDisplayToShow = (data) => {
  return {
    type: 'SET_DISPLAY',
    payload: data
  }
}

const setManageToShow = (data) => {
  return {
    type: 'SET_MANAGE_STATUS',
    payload: data
  }
}

const setReportsToShow = (data) => {
  return {
    type: 'SET_REPORTS_STATUS',
    payload: data
  }
}

// Dispatch function to set sub menu to be highlighted on dashboard
export const dispatchToSetSubMenuToShow = (text) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setSubMenuDisplayToShow(text))
    dispatch(setDisplayToShow(text))
    
    if (text === 'Barbers' || text === 'Services' || text === 'Users') {
      dispatch(setMenuDisplayToShow('Manage'))
    } else if (text === 'Transactions') {
      dispatch(setMenuDisplayToShow('Reports'))
    }
  }
}

const setSubMenuDisplayToShow = (data) => {
  return {
    type: 'SET_SUB_MENU',
    payload: data
  }
}

// Dispatch function to set menu to be highlighted on dashboard 
export const dispatchToSetMenuToShow = (text) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setMenuDisplayToShow(text))
  }
}

const setMenuDisplayToShow = (data) => {
  return {
    type: 'SET_MENU',
    payload: data
  }
}