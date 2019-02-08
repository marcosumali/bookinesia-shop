import swal from 'sweetalert';

import { 
  saveDashboardMenuStatus, 
  getLatestDashboardMenuStatus 
} from '../../helpers/dashboard';
import { 
  setBarberDisableStatusInput, 
  setBarberInfo, 
  setBarberNameInputError,
  setFileInputError,
} from '../firestore/staff/staff.actions';
import { 
  setSelectedServicesInput, 
  setHasEditStatus, 
  setStaffServiceInputError 
} from '../firestore/staffService/staffService.actions';
import { 
  setSelectedStaffSchedulesInput, 
  setHasEditStatusStaffSchedule, 
  setStaffScheduleInputError 
} from '../firestore/staffSchedule/staffSchedule.actions';
import { 
  setServiceNameInput, 
  setServiceDurationInput, 
  setServicePriceInput, 
  setServiceTypeInput, 
  setServiceDisableStatus, 
  setAddServiceTypeInput 
} from '../firestore/service/service.actions';
import { 
  setFilterEndDate, 
  setFilterStartDate, 
  setUpdateAppointmentDateInput, 
  setUpdateAppointmentDisableStatusInput, 
  setUpdateAppointmentMaxQueueInput,
  setUpdateAppointmentStartHoursInput,
  setUpdateAppointmentStartMinutesInput,
  setUpdateAppointmentEndHoursInput,
  setUpdateAppointmentEndMinutesInput,
  setAddAppointmentDateInput,
  setAddAppointmentMaxQueueInput,
  setAddAppointmentStartHoursInput,
  setAddAppointmentStartMinutesInput,
  setAddAppointmentEndHoursInput,
  setAddAppointmentEndMinutesInput,
  getAppointmentsAndCalendar,
  updateAppointmentStatus,
} from '../firestore/appointment/appointment.actions';
import { 
  updateTransactionStatus,
  setPaymentMethod,
  setSelectedSecondaryServices,
  setSelectedPrimaryService,
  setFilterTransactionStartDate,
  setFilterTransactionEndDate,
} from '../firestore/transaction/transaction.actions';
import {
  setShopNameInput,
  setShopNameInputError,
} from '../firestore/shop/shop.actions';
import {
  setBranchTimezoneInput,
  setBranchInfo,
  setBranchNameInputError,
  setBranchAddressInputError,
  setBranchPhoneInputError,
  setSingleFileInputBranchError,
  setHasEditStatusFileBranch,
  setSingleFileInputBranch,
} from '../firestore/branch/branch.actions';

export const maxFileSizeError = 'Maximum file size is 1 MB. '
export const imageFileTypeError = 'Accepted image file are JPG/JPEG, PNG, or GIF. '

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
    let user = props.user

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
    if (user.job === 'admin') {
      dispatch(setActiveTab('Appointments'))
    } else {
      dispatch(setActiveTab('Details'))
    }
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
    let user = props.user

    let manageShowStatus = props.manageShowStatus
    let reportsShowStatus = props.reportsShowStatus
    let displayToShow = props.displayToShow
    let menuToShow = props.menuToShow
    let subMenuToShow = props.subMenuToShow
    
    subMenuToShow = text
    dispatch(setSubMenuToShow(subMenuToShow))
    displayToShow = text
    dispatch(setDisplayToShow(displayToShow))
    
    if (text === 'Providers' || text === 'Services' || text === 'Shop & Branch') {
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

    if (user.job === 'admin') {
      dispatch(setActiveTab('Appointments'))
    } else {
      dispatch(setActiveTab('Details'))
    }
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
    } else if (index === 3) {
      activeTab = 'Appointments'
    }
    dispatch(setActiveTab(activeTab))
  }
}

// To handle active tab on materialize css if Admin
export const handleActiveTabAdmin = (tabIndex) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let index = Number(tabIndex) % 10
    let activeTab = ''
    if (index === 0) {
      activeTab = 'Appointments'
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
    } else if (id === 'serviceStatus' && type === 'checkbox') {
      if (status) {
        status = false
      } else {
        status = true
      }
      dispatch(setServiceDisableStatus(status))
    } else if (id === 'updateAppointmentStatus' && type === 'checkbox') {
      if (status) {
        status = false
      } else {
        status = true
      }
      dispatch(setUpdateAppointmentDisableStatusInput(status))
    }
  }
}

// To handle each multiple checkbox
export const handleRadio = (inputData, purpose) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    if (purpose === 'addNewTransaction') {
      dispatch(setSelectedPrimaryService(inputData.id))
    }
  }
}


// To handle each multiple checkbox
export const handleMultipleCheckbox = (e, selectedData, purpose) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let id = target.id            // id represent key of product in firestore
    let type = target.type        // type of input e.g. radio or checkbox
    let status = target.checked   // true or false
    
    if (purpose === 'manageBarberServices') {
      // SelectedData represent selectedServicesInput for staff services
      let checkedIndex = selectedData.findIndex(staffService => staffService === id)
  
      if (type === 'checkbox' && status) {
        if (checkedIndex <= -1) {
          selectedData.push(id)
        } 
      } else if (type === 'checkbox' && status === false) {
        if (checkedIndex >= 0) {
          selectedData.splice(checkedIndex, 1)
        }
      }
      dispatch(setHasEditStatus(true))
      dispatch(setSelectedServicesInput({ uniqueStatus: false, staffServices: selectedData }))

    } else if (purpose === 'addNewTransaction') {
      // SelectedData represent selected services
      let checkedIndex = selectedData.findIndex(serviceId => serviceId === id)
  
      if (type === 'checkbox' && status) {
        if (checkedIndex <= -1) {
          selectedData.push(id)
        } 
      } else if (type === 'checkbox' && status === false) {
        if (checkedIndex >= 0) {
          selectedData.splice(checkedIndex, 1)
        }
      }

      let result = []
      selectedData && selectedData.map(data => {
        result.push(data)
        return ''
      })

      dispatch(setSelectedSecondaryServices(result))
    }
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
export const handleMultipleCheckboxStatus = (data, selectedData, purpose) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let status = false
    let breakStatus = false

    if (purpose === 'manageBarberServices') {
      // SelectedData represent selectedServicesInput for staff services

      selectedData && selectedData.map(selectedStaffService => {
        if (data.id === selectedStaffService && breakStatus === false) {
          status = true
          breakStatus = true
        }
        return ''
      })
      return status
    } else if (purpose === 'addNewTransaction') {
      // SelectedData represent services id inputted

      selectedData && selectedData.map(serviceId => {
        if (data.id === serviceId && breakStatus === false) {
          status = true
          breakStatus = true
        }
        return ''
      })
      return status
    }
  }
}

// To handle cancelation through modal action
export const handleCancelation = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { functionToBeExecuted, requiredData, section } = data
    let swalText = ''

    if (functionToBeExecuted === 'setSelectedServicesInput' || functionToBeExecuted === 'setBarberInfo' || functionToBeExecuted === 'setSelectedStaffSchedulesInput') {
      swalText = `Provider's ${section} information will be restored to previous settings.` 
    } else if (functionToBeExecuted === 'reverseServiceInput') {
      swalText = `Service's information will be restored to previous settings.` 
    } else if (functionToBeExecuted === 'setShopInput') {
      swalText = `Shop's information will be restored to previous settings.` 
    } else if (functionToBeExecuted === 'setBranchInput') {
      swalText = `Branch's information will be restored to previous settings.` 
    }

    swal({
      title: 'Are you sure?',
      text: swalText,
      icon: 'warning',
      buttons: ['Cancel', 'OK']
    })
    .then(result => {
      if (result) {
        if (functionToBeExecuted === 'setSelectedServicesInput') {
          dispatch(setHasEditStatus(false))
          dispatch(setSelectedServicesInput(requiredData))
          dispatch(setStaffServiceInputError(false))

        } else if (functionToBeExecuted === 'setBarberInfo') {
          dispatch(setBarberInfo(requiredData))
          dispatch(setSingleFileInput({}))
          dispatch(setBarberNameInputError(false))
          dispatch(setFileInputError(false))
          dispatch(setHasEditStatusFile(false))

        } else if (functionToBeExecuted === 'setSelectedStaffSchedulesInput') {
          dispatch(setHasEditStatusStaffSchedule(false))
          dispatch(setSelectedStaffSchedulesInput(requiredData))
          dispatch(setStaffScheduleInputError(false))
        
        } else if (functionToBeExecuted === 'reverseServiceInput') {
          dispatch(setServiceNameInput(requiredData.name))
          dispatch(setServiceDurationInput(requiredData.duration))
          dispatch(setServicePriceInput(requiredData.price))
          dispatch(setServiceTypeInput(requiredData.type))
          dispatch(setServiceDisableStatus(requiredData.disableStatus))

        } else if (functionToBeExecuted === 'setShopInput') {
          dispatch(setShopNameInput(requiredData.name))
          dispatch(setSingleFileInput({}))
          dispatch(setShopNameInputError(false))
          dispatch(setSingleFileInputError(false))
          dispatch(setHasEditStatusFile(false))

        } else if (functionToBeExecuted === 'setBranchInput') {
          dispatch(setBranchInfo(requiredData))
          dispatch(setSingleFileInputBranch({}))
          dispatch(setBranchNameInputError(false))
          dispatch(setBranchPhoneInputError(false))
          dispatch(setBranchAddressInputError(false))
          dispatch(setSingleFileInputBranchError(false))
          dispatch(setHasEditStatusFileBranch(false))
        }
      }
    })  
  }
}

// To handle multiple switches
export const handleMultipleSwitches = (purpose, e, data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let id = target.id            // represent id of input
    let type = target.type        // type of input e.g. radio or checkbox
    let status = target.checked   // true or false

    if (purpose === 'manageBarberHours' && type === 'checkbox') {
      // Here data represent selected staff services
      let checkedIndex = data.findIndex(staffService => staffService.id === id)
      let selectedData = data[checkedIndex]
      let revisedStatus = ''

      if (status) {
        revisedStatus = false
      } else {
        revisedStatus = true
      }

      let revisedData = {
        ...selectedData,
        disableStatus: revisedStatus
      }

      let result = []
      data && data.map((singleData, index) => {
        if (index === checkedIndex) {
          result.push(revisedData)
        } else (
          result.push(singleData)
        )
        return ''
      })

      // data.splice(checkedIndex, 1, revisedData)
      dispatch(setHasEditStatusStaffSchedule(true))
      dispatch(setSelectedStaffSchedulesInput(result))
    }
  }
}

// To handle multiple select option
export const handleMultipleSelectOption = (e, value, purpose, time, data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let id = target.id            // represent id of input
    let type = target.type        // type of input e.g. radio or checkbox
    let value = target.value

    if (purpose === 'manageBarberHours' && type === 'select-one') {
      // Here data represent selected staff services
      let checkedIndex = data.findIndex(staffService => staffService.id === id)
      let selectedData = data[checkedIndex]

      if (time === 'startHours') {
        let revisedData = {
          ...selectedData,
          startHours: value
        }
        data.splice(checkedIndex, 1, revisedData)
      } else if (time === 'startMinutes') {
        let revisedData = {
          ...selectedData,
          startMinutes: value
        }
        data.splice(checkedIndex, 1, revisedData)
      } else if (time === 'endHours') {
        let revisedData = {
          ...selectedData,
          endHours: value
        }
        data.splice(checkedIndex, 1, revisedData)
      } else if (time === 'endMinutes') {
        let revisedData = {
          ...selectedData,
          endMinutes: value
        }
        data.splice(checkedIndex, 1, revisedData)
      }
      dispatch(setHasEditStatusStaffSchedule(true))
      dispatch(setSelectedStaffSchedulesInput(data))

    } else if (purpose === 'manageService' && type === 'select-one') {
      dispatch(setServiceTypeInput(value))
    } else if (purpose === 'addService' && type === 'select-one') {
      dispatch(setAddServiceTypeInput(value))
    } else if (purpose === 'updateAppointment' && type === 'select-one') {
      if (id === 'startHours') {
        dispatch(setUpdateAppointmentStartHoursInput(value))
      } else if (id === 'startMinutes') {
        dispatch(setUpdateAppointmentStartMinutesInput(value))
      } else if (id === 'endHours') {
        dispatch(setUpdateAppointmentEndHoursInput(value))
      } else if (id === 'endMinutes') {
        dispatch(setUpdateAppointmentEndMinutesInput(value))
      }
    } else if (purpose === 'addAppointment' && type === 'select-one') {
      if (id === 'startHours') {
        dispatch(setAddAppointmentStartHoursInput(value))
      } else if (id === 'startMinutes') {
        dispatch(setAddAppointmentStartMinutesInput(value))
      } else if (id === 'endHours') {
        dispatch(setAddAppointmentEndHoursInput(value))
      } else if (id === 'endMinutes') {
        dispatch(setAddAppointmentEndMinutesInput(value))
      }
    } else if (purpose === 'selectPaymentMethod' && type === 'select-one') {
      dispatch(setPaymentMethod(value))
    } else if (purpose === 'manageShop' && type === 'select-one') {
      dispatch(setBranchTimezoneInput(value))
    }
  }
}

// To handle single file input to redux
export const handleSingleFileInput = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let file = target.files[0]

    dispatch(setHasEditStatusFile(true))
    dispatch(setSingleFileInput(file))
  }
}

export const setSingleFileInput = (data) => {
  return {
    type: 'SET_SINGLE_FILE_INPUT',
    payload: data
  }
}

export const setSingleFileInputError = (data) => {
  return {
    type: 'SET_SINGLE_FILE_INPUT_ERROR',
    payload: data
  }
}

// To set has click input file button status
export const setHasEditStatusFile = (clickStatus) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let status = ''

    if (clickStatus) {
      status = true
    } else {
      status = false
    }
    dispatch(setHasEditStatusFileAction(status))
  }
}

const setHasEditStatusFileAction = (data) => {
  return {
    type: 'SET_HAS_EDIT_STATUS_FILE',
    payload: data
  }
}

// To handle date input
export const handleDateInput = (e, value) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let inputDate = new Date(value)
    let year = inputDate.getFullYear()
    let month = inputDate.getMonth() + 1
    let date = inputDate.getDate()
    let acceptedDate = `${year}-${month}-${date}`

    if (inputId === 'startDate') {
      dispatch(setFilterStartDate(acceptedDate))
    } else if (inputId === 'endDate') {
      dispatch(setFilterEndDate(acceptedDate))
    }
  }
}

// To handle date input
export const handleBasicDateInput = (e, branchId, staffs) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value
    let inputDate = new Date(value)
    let year = inputDate.getFullYear()
    let month = inputDate.getMonth() + 1
    let date = inputDate.getDate()
    let acceptedDate = `${year}-${month}-${date}`

    if (inputId === 'startDate') {
      dispatch(setFilterStartDate(acceptedDate))
    } else if (inputId === 'endDate') {
      dispatch(setFilterEndDate(acceptedDate))
    } else if (inputId === 'updateDate') {
      dispatch(setUpdateAppointmentDateInput(acceptedDate))
    } else if (inputId === 'addDate') {
      dispatch(setAddAppointmentDateInput(acceptedDate))
    } else if (inputId === 'calendarDate') {
      dispatch(getAppointmentsAndCalendar(branchId, acceptedDate, staffs))
    } else if (inputId === 'transStartDate') {
      dispatch(setFilterTransactionStartDate(acceptedDate))
    } else if (inputId === 'transEndDate') {
      dispatch(setFilterTransactionEndDate(acceptedDate))
    }
  }
}

// To handle number input
export const handleNumberInput = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'updateMaxQueue') {
      dispatch(setUpdateAppointmentMaxQueueInput(value))
    } else if (inputId === 'addMaxQueue') {
      dispatch(setAddAppointmentMaxQueueInput(value))
    }
  }
}

export const setDashboardLoadingStatus = (data) => {
  return {
    type: 'SET_DASHBOARD_LOADING_STATUS',
    payload: data
  }
}


// To handle update transaction and appointment
export const handleUpdateStatus = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { shop, branch, status, appointment, transaction, user, paymentMethod, dashboardData, barbers } = data
    
    let swalText = ''
    if (status === 'skipped') {
      swalText = 'Related transaction will be updated and customer will be notified if the transaction is not canceled by them.'
    } else if (status === 'on progress') {
      swalText = 'Related transaction will be started.'
    } else if (status === 'finished') {
      let upperCasedPaymentMethod = paymentMethod.toUpperCase()
      swalText = `Related transaction will be marked as finised with payment made by ${upperCasedPaymentMethod}`
    }

    swal({
      title: 'Are you sure?',
      text: swalText,
      icon: 'warning',
      buttons: ['Cancel', 'OK']
    })
    .then(async result => {
      if (result) {

        dispatch(setUpdateLoadingStatus(true))

        if (status === 'skipped') {
          
          dispatch(updateAppointmentStatus(shop, branch, status, appointment, transaction, user, paymentMethod, null, null))

        } else if (status === 'on progress') {

          let queueNo = transaction.queueNo
          let nextQueueNo = String(Number(queueNo) + 1)
          let afterNextQueueNo = String(Number(queueNo) + 2)
          let staff = transaction.staff

          let nextIndex = dashboardData.findIndex(data => data.queueNo === nextQueueNo)
          let afterNextIndex = dashboardData.findIndex(data => data.queueNo === afterNextQueueNo)
          let staffIndex = barbers.findIndex(barber => barber.id === staff.id)

          let nextTransactionsData = dashboardData[nextIndex].transactions
          let nextTransaction = nextTransactionsData[staffIndex]

          let afterNextTransactionData = dashboardData[afterNextIndex].transactions
          let afterNextTransaction = afterNextTransactionData[staffIndex]

          dispatch(updateAppointmentStatus(shop, branch, status, appointment, transaction, user, paymentMethod, nextTransaction, afterNextTransaction))
        
        } else if (status === 'finished') {

          dispatch(updateTransactionStatus(shop, branch, status, appointment, transaction, user, paymentMethod, null, null))

        }
      }
    })  
  }
}

export const setUpdateLoadingStatus = (data) => {
  return {
    type: 'SET_UPDATE_LOADING_STATUS',
    payload: data
  }
}