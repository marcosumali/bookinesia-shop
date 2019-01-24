import { getTransactions } from '../transaction/transaction.actions';

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