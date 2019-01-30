import swal from 'sweetalert';
import { getTransactions } from '../transaction/transaction.actions';

let filterEmptyError = 'To filter preferred appointments for selected provider, start and end dates must be filled.'
let maxFilterError = `The preferred appointment's date that can be chosen is up to 7 days.`
let incorrectFilterError = `The start date must be earlier than or equal to the end date.`
let notFilledError = `All section must filled.`
let incorrectHoursError = `The start hour must be earlier than the end hour.`
let doubleAppError = `Appointment for selected date and barber is already exist.`

// To get appointments date per branch based on staffs to listen real time on next action
export const getAppointmentsDate = (branchId, staffs) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment')

    let branchAppointments = []
    await Promise.all(staffs && staffs.map(async (staff, index) => {
      await appointmentRef
      .where('staffId', '==', staff.id)
      .where('disableStatus', '==', false)
      .orderBy('date', 'desc')
      .limit(7)
      .get()
      .then(function(snapshot) {
        if (snapshot.empty === false) {
          snapshot.forEach(doc => {
            let data = doc.data()
            let id = doc.id
            data['id'] = id
            branchAppointments.unshift(data)
          })
        } else {
          dispatch(setAppointmentsFailed(false))
        }
      })
      .catch(err => {
        dispatch(setAppointmentsFailed(false))
      })
      return ''
    }))

    dispatch(getAppointments(branchId, branchAppointments, staffs))
  }
}

// const setAppointmentsSuccess = (data) => {
//   return {
//     type: 'SET_APPOINTMENTS_DATE_SUCCESS',
//     payload: data
//   }
// }

const setAppointmentsFailed = (status) => {
  return {
    type: 'SET_APPOINTMENTS_DATE_FAILED',
    payload: status
  }
}

// To set appointment date index to show which date on dashboard
export const setAppointmentDateIndex = (status, index, dates) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    if (status === 'next') {
      dispatch(setAppointmentDateIndexSuccess(Number(index)+1))
      dispatch(setSelectedDateSuccess(dates[Number(index)+1].originalDate))
    } else if (status === 'previous') {
      dispatch(setAppointmentDateIndexSuccess(Number(index)-1))
      dispatch(setSelectedDateSuccess(dates[Number(index)-1].originalDate))
    }
  }
}

// To set appointment date index to 0 to show today date on dashboard
export const setTodayDateIndex = (dates) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setAppointmentDateIndexSuccess(0))
    dispatch(setSelectedDateSuccess(dates[0].originalDate))
  }
}

const setAppointmentDateIndexSuccess = (data) => {
  return {
    type: 'SET_APPOINTMENT_DATE_INDEX',
    payload: data
  }
}

export const setSelectedDateSuccess = (data) => {
  return {
    type: 'SET_SELECTED_DATE',
    payload: data
  }
}


// To get appointments data per branch based on min and max date 
export const getAppointments = (branchId, branchAppointments, staffs) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment')
    let uniqueAppointmentsDate = [...new Set(branchAppointments.map(appointment => appointment.date))]

    let uniqueNewDates = []
    uniqueAppointmentsDate && uniqueAppointmentsDate.map((date) => {
      let newDate = new Date(date)
      uniqueNewDates.push(newDate)
      return ''
    })

    let minDate = new Date(Math.min(...uniqueNewDates))
    let revisedMinDate = `${minDate.getFullYear()}-${(minDate.getMonth())+1}-${minDate.getDate()}`
    let maxDate = new Date(Math.max(...uniqueNewDates))
    let revisedMaxDate = `${maxDate.getFullYear()}-${(maxDate.getMonth())+1}-${maxDate.getDate()}`

    appointmentRef
    .where('branchId', '==', branchId)
    .where('disableStatus', '==', false)
    .where('date', '>=', revisedMinDate)
    .where('date', '<=', revisedMaxDate)
    .orderBy('date', 'desc')
    .onSnapshot(function(querySnapshot) {
      if (querySnapshot.empty === false) {
        let appointments = []
        querySnapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          appointments.unshift(data)
        })

        let uniqueAppointmentsDateRealTime = [...new Set(appointments.map(appointment => appointment.date))]
    
        // Process to obtain unique appointment date to be shown on dashboard
        let emptyDashboardWithDate = []
        uniqueAppointmentsDateRealTime && uniqueAppointmentsDateRealTime.map((originalDate) => {
          let splittedDate = originalDate.split('-')
          let revisedDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`
          let joinedDate = {
            originalDate,
            revisedDate
          }
          emptyDashboardWithDate.push(joinedDate)
          return ''
        })

        // Process to obtain unique appointment date with its maxQueue to create blank dashboard
        emptyDashboardWithDate && emptyDashboardWithDate.map((revisedDate) => {
          let temporaryMaxQueue = []
          appointments && appointments.map((appointment) => {
            if (revisedDate.originalDate === appointment.date) {
              temporaryMaxQueue.push(appointment.maxQueue)
            }
            return ''
          })
          let maxQueueRelatedDate = Math.max(...temporaryMaxQueue)
          revisedDate['maxQueue'] = maxQueueRelatedDate
          revisedDate['data'] = []
          return ''
        })

        // Process to create transaction board per queuing number
        emptyDashboardWithDate && emptyDashboardWithDate.map((revisedDate, index) => {
          for (let i = 0; i < revisedDate.maxQueue; i++) {
            let data = {
              queueNo: String(i+1),
              transactions: []
            }
            revisedDate.data.push(data)
          }
          return ''
        })

        // Process to fill up the transaction board with empty object to be filled up with transaction on next actions
        emptyDashboardWithDate && emptyDashboardWithDate.map((revisedDate) => {
          for (let j = 0; j < revisedDate.data.length; j++) {
            for (let i = 0; i < staffs.length; i++) {
              revisedDate.data[j].transactions.push({})
            }
          }
          return ''
        })
        // console.log('check dashboardReady', emptyDashboardWithDate)

        dispatch(getTransactions(branchId, emptyDashboardWithDate, staffs))
      } else {
        dispatch(setAppointmentsFailed(false))
      }
    })
  }
}

// To validate and get filtered appointments based on start and end date 
export const getFilteredAppointments = (startDate, endDate, selectedBarber) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let newStartDate = new Date(startDate)
    let newEndDate = new Date(endDate)

    let timeDifference = Math.abs(newEndDate.getTime() - newStartDate.getTime())
    let differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24))

    let errors = []
    // Validation error
    if (startDate.length <= 0 || endDate.length <= 0) {
      errors.push(filterEmptyError)
    }

    if (newStartDate > newEndDate) {
      errors.push(incorrectFilterError)
    }

    if (differenceInDays > 7) {
      errors.push(maxFilterError)
    }

    // Validation OK
    if (startDate.length > 0 && endDate.length > 0 && newStartDate <= newEndDate && differenceInDays <= 7) {
      errors = []
    }

    dispatch(setFilterError(errors))
    
    if (startDate.length > 0 && endDate.length > 0 && newStartDate <= newEndDate && differenceInDays <= 7) {
      let staffId = selectedBarber.id
      let firestore = getFirestore()

      let appointmentRef = firestore.collection('appointment')

      appointmentRef
      .where('staffId', '==', staffId)
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .onSnapshot(function(querySnapshot) {
        let appointments = []
        if (querySnapshot.empty === false) {
          querySnapshot.forEach(function(doc) {
            let id = doc.id
            let data = doc.data()
            data['id'] = id
            appointments.push(data)
          })
          dispatch(setFilteredAppointments(appointments))
        } else {
          let emptyObj = {
            message: 'empty',
            staffId
          }
          appointments.push(emptyObj)
          dispatch(setFilteredAppointments(appointments))
        }
      })
    }
  }
}

export const setFilterStartDate = (data) => {
  return {
    type: 'SET_FILTER_START_DATE',
    payload: data
  }
}

export const setFilterEndDate = (data) => {
  return {
    type: 'SET_FILTER_END_DATE',
    payload: data
  }
}

const setFilterError = (data) => {
  return {
    type: 'SET_FILTER_ERROR',
    payload: data
  }
}

const setFilteredAppointments = (data) => {
  return {
    type: 'SET_FILTERED_APPOINTMENTS',
    payload: data
  }
}


// To set selected appointment to form inputs on update appointment form 
export const setSelectedAppointmentInput = (filteredAppointment) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { date, maxQueue, startHours, startMinutes, endHours, endMinutes, disableStatus } = filteredAppointment
    dispatch(setSelectedFilteredAppointment(filteredAppointment))
    dispatch(setUpdateAppointmentDateInput(date))
    dispatch(setUpdateAppointmentMaxQueueInput(maxQueue))
    dispatch(setUpdateAppointmentStartHoursInput(startHours))
    dispatch(setUpdateAppointmentStartMinutesInput(startMinutes))
    dispatch(setUpdateAppointmentEndHoursInput(endHours))
    dispatch(setUpdateAppointmentEndMinutesInput(endMinutes))
    dispatch(setUpdateAppointmentDisableStatusInput(disableStatus))
  }
}

const setSelectedFilteredAppointment = (data) => {
  return {
    type: 'SET_SELECTED_FILTERED_APPOINTMENT',
    payload: data
  }
}

export const setUpdateAppointmentDateInput = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_DATE_INPUT',
    payload: data
  }
}

export const setUpdateAppointmentMaxQueueInput = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_MAX_QUEUE_INPUT',
    payload: data
  }
}

export const setUpdateAppointmentStartHoursInput = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_START_HOURS_INPUT',
    payload: data
  }
}

export const setUpdateAppointmentStartMinutesInput = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_START_MINUTES_INPUT',
    payload: data
  }
}

export const setUpdateAppointmentEndHoursInput = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_END_HOURS_INPUT',
    payload: data
  }
}

export const setUpdateAppointmentEndMinutesInput = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_END_MINUTES_INPUT',
    payload: data
  }
}

export const setUpdateAppointmentDisableStatusInput = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_DISABLE_STATUS_INPUT',
    payload: data
  }
}

// To validate and update appointment with input 
export const updateSelectedAppointment = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { 
      updateDateInput,
      updateMaxQueueInput,
      updateStartHours,
      updateStartMinutes,
      updateEndHours,
      updateEndMinutes,
      updateDisableStatus,
      selectedAppointment,
      branchId,
      selectedBarber,
    } = data
    let staffId = selectedBarber.id
    let updatedDate = new Date(Date.now())

    let errors = []
    // Validation if wrong
    if (updateMaxQueueInput.length <= 0 || Number(updateMaxQueueInput) <= 0) {
      errors.push(notFilledError)
      dispatch(setUpdateMaxQueueInputError('Empty'))
    }

    if (Number(updateEndHours) <= Number(updateStartHours)) {
      errors.push(incorrectHoursError)
    }

    let isExist = await dispatch(isAppointmentExists(branchId, staffId, updateDateInput))
    if (isExist) {
      errors.push(doubleAppError)
    }
    
    // Validation if OK
    if (updateMaxQueueInput.length > 0 && Number(updateMaxQueueInput) > 0) {
      dispatch(setUpdateMaxQueueInputError(false))
    }

    if (updateMaxQueueInput.length > 0 && Number(updateMaxQueueInput) > 0 && Number(updateEndHours) > Number(updateStartHours) && isExist === false) {
      errors = []
      dispatch(setUpdateMaxQueueInputError(false))
    }

    dispatch(setUpdateAppInputError(errors))

    if (updateMaxQueueInput.length > 0 && Number(updateMaxQueueInput) > 0 && Number(updateEndHours) > Number(updateStartHours) && isExist === false) {
      swal({
        title: 'Are you sure?',
        text: "Appointment's information will be updated with the new input.",
        icon: 'warning',
        buttons: ['Cancel', 'OK']
      })
      .then(result => {
        if (result) {
          dispatch(setAppointmentLoadingStatus(true))

          let firestore = getFirestore()
          let uid = selectedAppointment.id
          let appointmentRef = firestore.collection('appointment').doc(uid)
          
          let updatedAppointmentData = {
            date: updateDateInput,
            maxQueue: updateMaxQueueInput,
            startHours: updateStartHours,
            startMinutes: updateStartMinutes,
            endHours: updateEndHours,
            endMinutes: updateEndMinutes,
            disableStatus: updateDisableStatus,
            updatedDate,
          }
    
          appointmentRef
          .update(updatedAppointmentData)
          .then(() => {
            let revisedAppointment = {
              ...selectedAppointment,
              date: updateDateInput,
              maxQueue: updateMaxQueueInput,
              startHours: updateStartHours,
              startMinutes: updateStartMinutes,
              endHours: updateEndHours,
              endMinutes: updateEndMinutes,
              disableStatus: updateDisableStatus,
              updatedDate,
            }
            dispatch(setAppointmentLoadingStatus(false))
            dispatch(setSelectedFilteredAppointment(revisedAppointment))
            swal("Information Updated", "", "success")
          })
          .catch(err => {
            console.log('ERROR: update appointment data', err)
          })
        }
      })
    }
  }
}

const setUpdateMaxQueueInputError = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_MAX_QUEUE_ERROR',
    payload: data
  }
}

const setUpdateAppInputError = (data) => {
  return {
    type: 'SET_UPDATE_APPOINTMENT_ERROR',
    payload: data
  }
}

const setAppointmentLoadingStatus = (data) => {
  return {
    type: 'SET_APPOINTMENT_LOADING_STATUS',
    payload: data
  }
}

// To clear update appointment input error when click modal close
export const clearUpdateAppointment = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let errors = []
    dispatch(setUpdateAppInputError(errors))
    dispatch(setUpdateMaxQueueInputError(false))
  } 
}

export const setAddAppointmentDateInput = (data) => {
  return {
    type: 'SET_ADD_APPOINTMENT_DATE_INPUT',
    payload: data
  }
}

export const setAddAppointmentMaxQueueInput = (data) => {
  return {
    type: 'SET_ADD_APPOINTMENT_MAX_QUEUE_INPUT',
    payload: data
  }
}

export const setAddAppointmentStartHoursInput = (data) => {
  return {
    type: 'SET_ADD_APPOINTMENT_START_HOURS_INPUT',
    payload: data
  }
}

export const setAddAppointmentStartMinutesInput = (data) => {
  return {
    type: 'SET_ADD_APPOINTMENT_START_MINUTES_INPUT',
    payload: data
  }
}

export const setAddAppointmentEndHoursInput = (data) => {
  return {
    type: 'SET_ADD_APPOINTMENT_END_HOURS_INPUT',
    payload: data
  }
}

export const setAddAppointmentEndMinutesInput = (data) => {
  return {
    type: 'SET_ADD_APPOINTMENT_END_MINUTES_INPUT',
    payload: data
  }
}

// To validate and add appointment with input 
export const addAppointment = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { 
      addDateInput,
      addMaxQueueInput,
      addStartHours,
      addStartMinutes,
      addEndHours,
      addEndMinutes,
      branchId,
      selectedBarber
    } = data
    let addDisableStatus = true
    let startHours = ''
    let startMinutes = ''
    let endHours = ''
    let endMinutes = ''
    let createdDate = new Date(Date.now())
    let updatedDate = new Date(Date.now())
    let currentQueue = "0"
    let currentTransaction = "0"
    let staffId = selectedBarber.id

    // Change time "" to "00"
    if (addStartHours.length <= 0) {
      startHours = '00'
    } else {
      startHours = addStartHours
    }

    if (addStartMinutes.length <= 0) {
      startMinutes = '00'
    } else {
      startMinutes = addStartMinutes
    }

    if (addEndHours.length <= 0) {
      endHours = '00'
    } else {
      endHours = addEndHours
    }

    if (addEndMinutes.length <= 0) {
      endMinutes = '00'
    } else {
      endMinutes = addEndMinutes
    }

    let errors = []
    // Validation if wrong
    if (addMaxQueueInput.length <= 0 || Number(addMaxQueueInput) <= 0) {
      errors.push(notFilledError)
      dispatch(setAddMaxQueueInputError('Empty'))
    }

    if (Number(addEndHours) <= Number(addStartHours)) {
      errors.push(incorrectHoursError)
    }
    
    let isExist = await dispatch(isAppointmentExists(branchId, staffId, addDateInput))
    if (isExist) {
      errors.push(doubleAppError)
    }
    
    // Validation if OK
    if (addMaxQueueInput.length > 0 && Number(addMaxQueueInput) > 0) {
      dispatch(setAddMaxQueueInputError(false))
    }

    if (addMaxQueueInput.length > 0 && Number(addMaxQueueInput) > 0 && Number(addEndHours) > Number(addStartHours) && isExist === false) {
      errors = []
      dispatch(setAddMaxQueueInputError(false))
    }

    dispatch(setAddAppInputError(errors))

    if (addMaxQueueInput.length > 0 && Number(addMaxQueueInput) > 0 && Number(addEndHours) > Number(addStartHours) && isExist === false) {
      dispatch(setAppointmentLoadingStatus(true))

      let firestore = getFirestore()
      let appointmentRef = firestore.collection('appointment')
      
      let addAppointmentData = {
        branchId,
        date: addDateInput,
        currentQueue,
        currentTransaction,
        maxQueue: addMaxQueueInput,
        startHours,
        startMinutes,
        endHours,
        endMinutes,
        disableStatus: addDisableStatus,
        staffId,
        createdDate,
        updatedDate,
      }

      appointmentRef
      .add(addAppointmentData)
      .then(() => {
        dispatch(setAppointmentLoadingStatus(false))
        dispatch(setAddAppointmentDateInput(""))
        dispatch(setAddAppointmentMaxQueueInput(""))
        dispatch(setAddAppointmentStartHoursInput(""))
        dispatch(setAddAppointmentStartMinutesInput(""))
        dispatch(setAddAppointmentEndHoursInput(""))
        dispatch(setAddAppointmentEndMinutesInput(""))
        swal("New Appointment Created", "", "success")
      })
      .catch(err => {
        console.log('ERROR: add appointment data', err)
      })
    }
  }
}

const setAddMaxQueueInputError = (data) => {
  return {
    type: 'SET_ADD_APPOINTMENT_MAX_QUEUE_ERROR',
    payload: data
  }
}

const setAddAppInputError = (data) => {
  return {
    type: 'SET_ADD_APPOINTMENT_ERROR',
    payload: data
  }
}

// To clear add appointment input error when click modal close
export const clearAddAppointment = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let errors = []
    dispatch(setAddAppInputError(errors))
    dispatch(setAddMaxQueueInputError(false))
    dispatch(setAddAppointmentDateInput(""))
    dispatch(setAddAppointmentMaxQueueInput(""))
    dispatch(setAddAppointmentStartHoursInput(""))
    dispatch(setAddAppointmentStartMinutesInput(""))
    dispatch(setAddAppointmentEndHoursInput(""))
    dispatch(setAddAppointmentEndMinutesInput(""))
  } 
}


// To check whether specific date of appointment for selected barber is exists or not
export const isAppointmentExists = (branchId, staffId, date) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment')
    let status = ""

    await appointmentRef
    .where("branchId", "==", branchId)
    .where("staffId", "==", staffId)
    .where("date", "==", date)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty === false) {
        status = true
      } else {
        status = false
      }
    })
    .catch(err => {
      console.log('ERROR: is appointment exist', err)
    })

    return status
  }
}