import { getTransactions } from '../transaction/transaction.actions';

// To get appointments per branch based on staffs
export const getAppointmentsDate = (branchId, staffs) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let appointmentRef = firestore.collection('appointment')

    let branchAppointments = []
    await Promise.all(staffs && staffs.map(async (staff, index) => {
      await appointmentRef
      .where('staffId', '==', staff.id)
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
      return ''
    }))
    
    // Process to obtain unique appointment date to be shown on dashboard
    let uniqueAppointmentsDate = [...new Set(branchAppointments.map(appointment => appointment.date))]

    let emptyDashboardWithDate = []
    uniqueAppointmentsDate && uniqueAppointmentsDate.map((originalDate) => {
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
      branchAppointments && branchAppointments.map((appointment) => {
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
    // console.log('aaa', emptyDashboardWithDate)

    dispatch(getTransactions(branchId, emptyDashboardWithDate, staffs))
  }
}

// const setAppointmentsSuccess = (date) => {
//   return {
//     type: 'SET_APPOINTMENTS_DATE_SUCCESS',
//     payload: date
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

