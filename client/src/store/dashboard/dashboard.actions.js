import swal from 'sweetalert';

import { saveDashboardMenuStatus, getLatestDashboardMenuStatus } from '../../helpers/dashboard';
import { setBarberDisableStatusInput, setBarberInfo } from '../firestore/staff/staff.actions';
import { setSelectedServicesInput, setHasEditStatus } from '../firestore/staffService/staffService.actions';

// ---------------------------------------------- DASHBOARD ACTION ----------------------------------------------
// To get DMS cookies and dispatch to store
export const getDMSCookies = (cookies) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let DMS = getLatestDashboardMenuStatus(cookies)

    if (DMS) {
      let { displayToShow, manageShowStatus, reportsShowStatus, menuToShow, subMenuToShow } = DMS
      
      dispatch(setDisplayToShow(displayToShow))
      dispatch(setManageToShow(manageShowStatus))
      dispatch(setReportsToShow(reportsShowStatus))
      dispatch(setMenuToShow(menuToShow))
      dispatch(setSubMenuToShow(subMenuToShow))
    }
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


// ---------------------------------------------- INPUT ACTION ----------------------------------------------

// To Handle Input Changes During Filtering
export const handleFilterInputChanges = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setFilterInput(value))
    }
  }
}

const setFilterInput = (data) => {
  return {
    type: 'SET_FILTER_INPUT',
    payload: data
  }
}

// To handle active tab on materialize css
export const handleActiveTab = (tabIndex) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let index = Number(tabIndex) % 10
    let activeTab = ''
    if (index === 0) {
      activeTab = 'Details'
    } else if (index === 1) {
      activeTab = 'Services'
    } else if (index === 2) {
      activeTab = 'Working Hours'
    }
    dispatch(setActiveTab(activeTab))
  }
}

export const setActiveTab = (data) => {
  return {
    type: 'SET_ACTIVE_TAB',
    payload: data
  }
}

// To handle each single checkbox
export const handleSingleCheckbox = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let id = target.id            // represent id of input
    let type = target.type        // type of input e.g. radio or checkbox
    let status = target.checked   // true or false

    if (id === 'barberStatus' && type === 'checkbox') {
      if (status) {
        status = false
      } else {
        status = true
      }
      dispatch(setBarberDisableStatusInput(status))
    }
  }
}

// To handle each multiple checkbox
export const handleMultipleCheckbox = (e, selectedServicesInput) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let id = target.id            // id represent key of product in firestore
    let type = target.type        // type of input e.g. radio or checkbox
    let status = target.checked   // true or false
    
    let checkedIndex = selectedServicesInput.findIndex(staffService => staffService === id);

    if (type === 'checkbox' && status) {
      if (checkedIndex <= -1) {
        selectedServicesInput.push(id)
      } 
    } else if (type === 'checkbox' && status === false) {
      if (checkedIndex >= 0) {
        selectedServicesInput.splice(checkedIndex, 1)
      }
    }
    dispatch(setHasEditStatus(true))
    dispatch(setSelectedServicesInput({ uniqueStatus: false, staffServices: selectedServicesInput }))
  }
}

// To handle each single checkbox checked status
export const handleCheckedStatus = (status) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let checkedStatus = false
    if (status === false) {
      checkedStatus = true
    }
    return checkedStatus  
  }
}

// To handle multiple checkbox checked status
export const handleMultipleCheckboxStatus = (service, selectedServicesInput) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let status = false
    let breakStatus = false
    selectedServicesInput && selectedServicesInput.map(selectedStaffService => {
      if (service.id === selectedStaffService && breakStatus === false) {
        status = true
        breakStatus = true
      }
      return ''
    })
    return status  
  }
}

// To handle cancelation through modal action
export const handleCancelation = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { functionToBeExecuted, requiredData, section } = data
    swal({
      title: 'Are you sure?',
      text: `Barber's ${section} information will be restored to previous settings.`,
      icon: 'warning',
      buttons: ['Cancel', 'OK']
    })
    .then(result => {
      if (result) {
        if (functionToBeExecuted === 'setSelectedServicesInput') {
          dispatch(setHasEditStatus(false))
          dispatch(setSelectedServicesInput(requiredData))
        } else if (functionToBeExecuted === 'setBarberInfo') {
          dispatch(setBarberInfo(requiredData))
        }
      }
    })  
  }
}