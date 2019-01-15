import { saveDashboardMenuStatus, getLatestDashboardMenuStatus } from '../../helpers/dashboard';

// ---------------------------------------------- DASHBOARD ACTION ----------------------------------------------
// To get DMS cookies and dispatch to store
export const getDMSCookies = (cookies) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let DMS = getLatestDashboardMenuStatus(cookies)
    let { displayToShow, manageShowStatus, reportsShowStatus, menuToShow, subMenuToShow } = DMS
    
    dispatch(setDisplayToShow(displayToShow))
    dispatch(setManageToShow(manageShowStatus))
    dispatch(setReportsToShow(reportsShowStatus))
    dispatch(setMenuToShow(menuToShow))
    dispatch(setSubMenuToShow(subMenuToShow))
  }
}

// Dispatch function to set display to show to users
export const dispatchToSetDisplayToShow = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let text = props.text
    let cookies = props.cookies

    let manageShowStatus = props.manageShowStatus
    let reportsShowStatus = props.reportsShowStatus
    let displayToShow = props.displayToShow
    let menuToShow = props.menuToShow
    let subMenuToShow = props.subMenuToShow

    menuToShow = text
    dispatch(dispatchToSetMenuToShow(menuToShow))
    subMenuToShow = ''
    dispatch(setSubMenuToShow(subMenuToShow))

    if (text === 'Manage') {
      if (manageShowStatus === true) {
        manageShowStatus = false
        dispatch(setManageToShow(manageShowStatus))
      } else {
        manageShowStatus = true
        dispatch(setManageToShow(manageShowStatus))
      }
    } else if (text === 'Reports') {
      if (reportsShowStatus === true) {
        reportsShowStatus = false
        dispatch(setReportsToShow(reportsShowStatus))
      } else {
        reportsShowStatus = true
        dispatch(setReportsToShow(reportsShowStatus))
      }
    } else if (text === 'Welcome') {
      displayToShow = text
      dispatch(setDisplayToShow(displayToShow))
    } else if (text === 'Calendar') {
      displayToShow = text
      dispatch(setDisplayToShow(displayToShow))
    }

    let dashboardMenuStatus = {
      displayToShow,
      manageShowStatus,
      reportsShowStatus,
      subMenuToShow,
      menuToShow,
    }
    // console.log('====', dashboardMenuStatus)

    saveDashboardMenuStatus(cookies, dashboardMenuStatus)
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
export const dispatchToSetSubMenuToShow = (props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let text = props.text
    let cookies = props.cookies

    let manageShowStatus = props.manageShowStatus
    let reportsShowStatus = props.reportsShowStatus
    let displayToShow = props.displayToShow
    let menuToShow = props.menuToShow
    let subMenuToShow = props.subMenuToShow
    
    subMenuToShow = text
    dispatch(setSubMenuToShow(subMenuToShow))
    displayToShow = text
    dispatch(setDisplayToShow(displayToShow))
    
    if (text === 'Barbers' || text === 'Services' || text === 'Users') {
      menuToShow = 'Manage'
      dispatch(setMenuToShow(menuToShow))
    } else if (text === 'Transactions') {
      menuToShow = 'Reports'
      dispatch(setMenuToShow(menuToShow))
    }

    let dashboardMenuStatus = {
      displayToShow,
      manageShowStatus,
      reportsShowStatus,
      subMenuToShow,
      menuToShow,
    }
    // console.log('===x', dashboardMenuStatus)

    saveDashboardMenuStatus(cookies, dashboardMenuStatus)
  }
}

const setSubMenuToShow = (data) => {
  return {
    type: 'SET_SUB_MENU',
    payload: data
  }
}

// Dispatch function to set menu to be highlighted on dashboard 
const dispatchToSetMenuToShow = (text) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setMenuToShow(text))
  }
}

const setMenuToShow = (data) => {
  return {
    type: 'SET_MENU',
    payload: data
  }
}