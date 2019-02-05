import axios from 'axios';
import swal from 'sweetalert';

import { setDashboardLoadingStatus, setUpdateLoadingStatus } from '../../dashboard/dashboard.actions';
import { setSelectedDateSuccess } from '../appointment/appointment.actions';

let textQueueTwoNumberAfter = 'We would like to remind you about your appointment for related transaction and your queue number is two number after the current queuing number.'
let textQueueOneNumberAfter = `Your queuing number is almost up. Please ensure that you are nearby the shop's location when your number is up.`

// To get transactions based on branchId
export const getTransactions = (branchId, dashboardReady, staffs) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')
    let minDate = dashboardReady[0].originalDate
    let maxDate = dashboardReady[dashboardReady.length-1].originalDate

    transactionRef
    .where('branchId', '==', branchId)
    .where('appointment.date', '>=', minDate)
    .where('appointment.date', '<=', maxDate)
    .onSnapshot(function(querySnapshot) {
      if (querySnapshot.empty === false) {
        let transactions = []
        querySnapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          transactions.push(data)
        })

        // Process to fill up the dashboard with real time data
        dashboardReady && dashboardReady.map((dashboard) => {
          transactions && transactions.map((transaction) => {
            if (dashboard.originalDate === transaction.appointment.date) {
              for (let i = 0; i < dashboard.data.length; i++) {
                if (dashboard.data[i].queueNo === transaction.queueNo) {
                  let barberIndex = staffs.findIndex(staff => staff.id === transaction.staff.id);
                  dashboard.data[i].transactions[barberIndex] = transaction
                }
              }
            }
            return ''
          })
          return ''
        })
        // console.log('xxx', dashboardReady)
        
        // dispatch(setBarbersSuccess(staffs))
        // dispatch(setTransactionsSuccess(transactions))
        
        // dispatch(setDashboardSuccess(dashboardReady))
        // dispatch(setSelectedDateSuccess(dashboardReady[0].originalDate))

      } else {
        dispatch(setTransactionsFailed(false))
      }
    })

  }
}

export const setDashboardSuccess = (data) => {
  return {
    type: 'SET_DASHBOARD_SUCCESS',
    payload: data
  }
}

const setTransactionsSuccess = (data) => {
  return {
    type: 'SET_TRANSACTIONS_SUCCESS',
    payload: data
  }
}

const setTransactionsFailed = (data) => {
  return {
    type: 'SET_TRANSACTIONS_FAILED',
    payload: data
  }
}


// To get transactions based on branchId per calendar
export const getTransactionsCalendar = (branchId, dashboardReady, staffs, appointments) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let date = dashboardReady[0].date
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')
    
    transactionRef
    .where('branchId', '==', branchId)
    .where('appointment.date', '==', date)
    .onSnapshot(function(querySnapshot) {
      if (querySnapshot.empty === false) {
        let transactions = []
        querySnapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          transactions.push(data)
        })

        let dashboard = dashboardReady[0]
        // Process to fill up the dashboard with real time data of transaction
        transactions && transactions.map((transaction) => {
          if (dashboard.date === transaction.appointment.date) {
            for (let i = 0; i < dashboard.data.length; i++) {
              if (dashboard.data[i].queueNo === transaction.queueNo) {
                let barberIndex = staffs.findIndex(staff => staff.id === transaction.staff.id)
                dashboard.data[i].transactions[barberIndex] = transaction
              }
            }
          }
          return ''
        })

        dispatch(reconstructCalender(dashboardReady, staffs, appointments, transactions))

      } else {

        dispatch(reconstructCalender(dashboardReady, staffs, appointments, []))
      }
    })
  }
}

// To reconcstruct transactions in calendar with active appointments to be dispatched on next action
export const reconstructCalender = (dashboardReady, staffs, appointments, transactions) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    
    // Process to fill up the dashboard with real time data of appointments
    let dashboard = dashboardReady[0]
    appointments && appointments.map((appointment) => {
      for (let i = 0; i < dashboard.data.length; i++) {
        for (let j = 0; j < dashboard.data[i].transactions.length; j++) {
          if (Object.keys(dashboard.data[i].transactions[j]).length > 0 && (dashboard.data[i].transactions[j]).constructor === Object && dashboard.data[i].transactions[j].status !== "no-appointment") {
            if (dashboard.data[i].transactions[j].appointment.id === appointment.id) {
              dashboard.data[i].transactions[j].appointment = appointment
            }
          }
        }
      }
      return ''
    })

    // Process to create zero appointment transaction
    let staffWithNoAppointmentOnSelectedDate = []
    staffs && staffs.map(staff => {
      let staffIndex = appointments.findIndex(appointment => appointment.staffId === staff.id)
      if (staffIndex < 0) {
        staffWithNoAppointmentOnSelectedDate.push(staff)
      }  
      return ''
    })
    // console.log('zero', staffWithNoAppointmentOnSelectedDate)

    staffWithNoAppointmentOnSelectedDate && staffWithNoAppointmentOnSelectedDate.map(staff => {
      for (let i = 0; i < dashboard.data.length; i++) {
        for (let j = 0; j < dashboard.data[i].transactions.length; j++) {
          let barberIndex = staffs.findIndex(barber => barber.id === staff.id)
          if (Object.keys(dashboard.data[i].transactions[j]).length <= 0 && dashboard.data[i].transactions[j].constructor === Object) {
            let statusObj = {
              status: 'no-appointment'
            }
            dashboard.data[i].transactions[barberIndex] = statusObj 
          }
        }
      }
      return ''
    })
    // console.log('xyz', dashboardReady)

    dispatch(setDashboardLoadingStatus(false))
    dispatch(setTransactionsSuccess(transactions))
    dispatch(setDashboardSuccess(dashboardReady))
    dispatch(setSelectedDateSuccess(dashboardReady[0].date))
  }
}

// To update transaction status from shop
export const updateTransactionStatus = (shop, branch, status, appointment, transaction, user, paymentMethod, nextTransaction, afterNextTransaction) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let nowDate = new Date(Date.now())
    // console.log('cek trans', transaction, status, user, paymentMethod)
    let id = transaction.id

    let transactionRef = firestore.collection('transaction').doc(id)

    let dataToUpdate = {
      updatedDate: nowDate,
      updatedBy: user,
      status,
    }
    if (status === 'on progress') {
      dataToUpdate['startDate'] = nowDate
    } else if (status === 'finished') {
      dataToUpdate['endDate'] = nowDate
      dataToUpdate['paymentMethod'] = paymentMethod
    }

    transactionRef.update(dataToUpdate)
    .then(() => {
      // success condition: swal, or send email
      if (status === 'skipped' || status === 'on progress' || status === 'finished') {
        dispatch(sendEmailAfterSuccess(shop, branch, status, appointment, transaction, nextTransaction, afterNextTransaction))
      }
    })
    .catch(err => {
      console.log('ERROR: update transaction status', err)
    })
  }
}

// To send email result 
export const sendEmailAfterSuccess = (shop, branch, status, appointment, transaction, nextTransaction, afterNextTransaction) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    if(status === 'skipped') {

      let emailData = {
        name: transaction.name,
        email: transaction.email,
        transactionId: transaction.id,
        date: appointment.date,
        shopName: shop.name,
        shopLogo: shop.logo,
        branchName: branch.name,
        phoneNumber: branch.phoneNumber,
        queueNo: transaction.queueNo,
        staffName: transaction.staff.name,
        staffImage: transaction.staff.picture,
      }
      let sendEmailResult = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailShopSkipTransaction', emailData)
      // console.log('email', sendEmailResult)
      if (sendEmailResult.status === 200) {
        dispatch(setUpdateLoadingStatus(false))
        swal("Information Updated & Notification Sended", "", "success")
      }

    } else if (status === 'on progress') {

      let score = 0
      let currentQueue =  String(Number(appointment.currentQueue) + 1)

      if (afterNextTransaction.status === 'booking confirmed') {
        let emailDataTwo = {
          name: afterNextTransaction.name,
          email: afterNextTransaction.email,
          transactionId: afterNextTransaction.id,
          date: appointment.date,
          shopName: shop.name,
          shopLogo: shop.logo,
          branchName: branch.name,
          queueNo: afterNextTransaction.queueNo,
          staffName: afterNextTransaction.staff.name,
          staffImage: afterNextTransaction.staff.picture,
          currentQueue,
          text: textQueueTwoNumberAfter,
          category: shop.categoryId,
        }
        
        let sendEmailResultTwoNumberAfter = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailQueueReminder', emailDataTwo)
        // console.log('email2', sendEmailResultTwoNumberAfter)  
        if (sendEmailResultTwoNumberAfter.status === 200) {
          score = score + 1
        }
      }

      if (nextTransaction.status === 'booking confirmed') {
        let emailDataOne = {
          name: nextTransaction.name,
          email: nextTransaction.email,
          transactionId: nextTransaction.id,
          date: appointment.date,
          shopName: shop.name,
          shopLogo: shop.logo,
          branchName: branch.name,
          queueNo: nextTransaction.queueNo,
          staffName: nextTransaction.staff.name,
          staffImage: nextTransaction.staff.picture,
          currentQueue,
          text: textQueueOneNumberAfter,
          category: shop.categoryId,
        }
  
        let sendEmailResultOneNumberAfter = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailQueueReminder', emailDataOne)
        // console.log('email1', sendEmailResultOneNumberAfter)
        if (sendEmailResultOneNumberAfter.status === 200) {
          score = score + 1
        }
      }
      console.log('final', score)

      if (score <= 2) {
        dispatch(setUpdateLoadingStatus(false))
        swal("Information Updated & Notification Sended", "", "success")
      }

    } else if (status === 'finished') {

      let emailData = {
        name: transaction.name,
        email: transaction.email,
        transactionId: transaction.id,
        date: appointment.date,
        shopName: shop.name,
        shopLogo: shop.logo,
        branchName: branch.name,
        queueNo: transaction.queueNo,
        staffName: transaction.staff.name,
        staffImage: transaction.staff.picture,
        service: transaction.service,
      } 
      let sendEmailResult = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailTransactionReceipt', emailData)
      if (sendEmailResult.status === 200) {
        dispatch(setUpdateLoadingStatus(false))
        swal("Information Updated & Notification Sended", "", "success")
      }
    }
  }
}

export const setPaymentMethod = (data) => {
  return {
    type: 'SET_PAYMENT_METHOD',
    payload: data
  }
}

export const setShowPaymentMethodStatus = (data) => {
  return {
    type: 'SET_SHOW_PAYMENT_METHOD_STATUS',
    payload: data
  }
}