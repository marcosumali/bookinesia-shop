import axios from 'axios';
import swal from 'sweetalert';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { validateEmail, validatePhone, formatPhone } from '../../../helpers/form';
import { returnAcceptedDate } from '../../../helpers/date';
import { setDashboardLoadingStatus, setUpdateLoadingStatus } from '../../dashboard/dashboard.actions';
import { setSelectedDateSuccess, isAppointmentExist, updateAppointmentStatus, incorrectFilterError } from '../appointment/appointment.actions';

const textQueue = `Your queuing number is almost up. Please ensure that you are nearby the shop's location when your number is up.`

export const emptyError = 'This section must be filled.'
export const phoneMinError = 'Phone number is too short, min. 8 characters.'
const emailInvalidError = 'Invalid email.'
export const phoneInvalidError = 'Invalid phone number.'
const noSelectedServicesError = 'Choose one of the provided services to continue.'
const noAppointmentError = `Related provider doesn't have an active appointment for selected date.`
const fullyBookedError = `Number of transactions for selected appointment has reached its maximum queuing number.`
const transFilterEmptyError = 'To filter selected transactions to be downloaded, start and end dates must be filled.'
const max31FilterError = `The preferred transaction's date that can be chosen is up to 31 days.`

// To get transactions based on branchId
export const getTransactions = (branchId, dashboardReady, staffs) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')
    let minDate = dashboardReady[0].originalDate
    let maxDate = dashboardReady[dashboardReady.length-1].originalDate

    transactionRef
    .where('branch.id', '==', branchId)
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
    .where('branch.id', '==', branchId)
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
export const updateTransactionStatus = (shop, branch, status, appointment, transaction, user, paymentMethod, nextTransaction, afterNextTransaction, paymentInformation) => {
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
      dataToUpdate['paymentMethod'] = paymentMethod.toLowerCase()
      if (paymentMethod.toLowerCase() === 'cash') {
        paymentInformation = 'cash'
      }
      dataToUpdate['paymentInformation'] = paymentInformation.toLowerCase()
    }

    transactionRef.update(dataToUpdate)
    .then(() => {
      // success condition: swal, or send email
      if (status === 'skipped' || status === 'on progress') {
        dispatch(sendEmailAfterSuccess(shop, branch, status, appointment, transaction, nextTransaction, afterNextTransaction))
      } else if (status === 'finished') {
        dispatch(setUpdateLoadingStatus(false))
        swal("Transaction Finished", "", "success")
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

      let score = 0

      // Send email skip info
      let emailData = {
        name: transaction.name,
        email: transaction.email,
        transactionId: transaction.id,
        date: appointment.date,
        shopName: shop.name,
        shopLogo: shop.logo,
        branchName: branch.name,
        phone: branch.phone,
        queueNo: transaction.queueNo,
        staffName: transaction.staff.name,
        staffImage: transaction.staff.picture,
      }
      let sendEmailResult = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailShopSkipTransaction', emailData)
      // console.log('email', sendEmailResult)
      if (sendEmailResult.status === 200) {
        score = score + 1
      }

      // Send email queue reminder
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
          text: textQueue,
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
          text: textQueue,
          category: shop.categoryId,
        }
  
        let sendEmailResultOneNumberAfter = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailQueueReminder', emailDataOne)
        // console.log('email1', sendEmailResultOneNumberAfter)
        if (sendEmailResultOneNumberAfter.status === 200) {
          score = score + 1
        }
      }
      // console.log('final', score)

      if (score <= 3) {
        dispatch(setUpdateLoadingStatus(false))
        swal("Information Updated & Notification Sent", "", "success")
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
          text: textQueue,
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
          text: textQueue,
          category: shop.categoryId,
        }
  
        let sendEmailResultOneNumberAfter = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailQueueReminder', emailDataOne)
        // console.log('email1', sendEmailResultOneNumberAfter)
        if (sendEmailResultOneNumberAfter.status === 200) {
          score = score + 1
        }
      }
      // console.log('final', score)

      if (score <= 2) {
        dispatch(setUpdateLoadingStatus(false))
        swal("Information Updated & Notification Sent", "", "success")
      }

    } else if (status === 'booking confirmed') {

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
      }
      
      let sendEmailResult = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailBookTransaction', emailData)
      if (sendEmailResult.status === 200) {
        dispatch(setTransactionErrors([]))
        dispatch(setAddNameError(false))
        dispatch(setAddPhoneError(false))
        dispatch(setAddEmailError(false))
        dispatch(setAddName(""))
        dispatch(setAddPhone(""))
        dispatch(setAddEmail(""))
        dispatch(setSelectedPrimaryService(""))
        dispatch(setSelectedSecondaryServices([]))  
        dispatch(setTransactionLoadingStatus(false))
        swal("Transaction Added & Notification Sent", "", "success")
      } else {
        dispatch(setTransactionErrors([]))
        dispatch(setAddNameError(false))
        dispatch(setAddPhoneError(false))
        dispatch(setAddEmailError(false))
        dispatch(setAddName(""))
        dispatch(setAddPhone(""))
        dispatch(setAddEmail(""))
        dispatch(setSelectedPrimaryService(""))
        dispatch(setSelectedSecondaryServices([]))  
        dispatch(setUpdateLoadingStatus(false))
        swal("Information Updated & Notification Not Sent", "Please contact our support team", "success")
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


// To handle changes in send email receipt 
export const handleChangesSendEmailReceipt = (e) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value
    
    if (inputId === 'email') {
      dispatch(setSendEmailReceipt(value))
    }
  }
}

export const setInitialSendEmailReceipt = (email) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let input = ''
    
    if (email) {
      input = email
    }

    dispatch(setSendEmailReceipt(input))
  }
}

export const setSendEmailReceipt = (data) => {
  return {
    type: 'SET_SEND_EMAIL_RECEIPT_INPUT',
    payload: data
  }
}

// To send email receipt 
export const sendEmailReceipt = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { transaction, email } = data

    if (email.length <= 0) {
      dispatch(setSendEmailError(emptyError))
    } 

    if (email.length > 0 && validateEmail(email) === false) {
      dispatch(setSendEmailError(emailInvalidError))
    }
    
    if (email.length > 0 && validateEmail(email) === true) {
      dispatch(setSendEmailError(false))
      dispatch(setSendEmailLoadingStatus(true))

      let emailData = {
        name: transaction.name,
        email,
        transactionId: transaction.id,
        date: transaction.appointment.date,
        shopName: transaction.shop.name,
        shopLogo: transaction.shop.logo,
        branchName: transaction.branch.name,
        queueNo: transaction.queueNo,
        staffName: transaction.staff.name,
        staffImage: transaction.staff.picture,
        service: transaction.service,
      } 
      let sendEmailResult = await axios.post('https://us-central1-bookinesia-com.cloudfunctions.net/sendEmailTransactionReceipt', emailData)
      if (sendEmailResult.status === 200) {
        dispatch(setSendEmailLoadingStatus(false))
        swal("Receipt Sent", "", "success")
      } else {
        dispatch(setSendEmailLoadingStatus(false))
        swal("Receipt Not Sent", "Please contact our support team", "error")
      }
    }
  }
}

const setSendEmailError = (data) => {
  return {
    type: 'SET_SEND_EMAIL_INPUT_ERROR',
    payload: data
  }
}

const setSendEmailLoadingStatus = (data) => {
  return {
    type: 'SET_SEND_EMAIL_LOADING_STATUS',
    payload: data
  }
}


// To handle changes in adding new transaction 
export const handleChangesNewTransaction = (e) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setAddName(value))
    } else if (inputId === 'phone') {
      dispatch(setAddPhone(value))
    } else if (inputId === 'email') {
      dispatch(setAddEmail(value))
    }
  }
}

const setAddName = (data) => {
  return {
    type: 'SET_ADD_TRANSACTION_NAME_INPUT',
    payload: data
  }
}

const setAddNameError = (data) => {
  return {
    type: 'SET_ADD_TRANSACTION_NAME_INPUT_ERROR',
    payload: data
  }
}

const setAddPhone = (data) => {
  return {
    type: 'SET_ADD_TRANSACTION_PHONE_INPUT',
    payload: data
  }
}

const setAddPhoneError = (data) => {
  return {
    type: 'SET_ADD_TRANSACTION_PHONE_INPUT_ERROR',
    payload: data
  }
}

const setAddEmail = (data) => {
  return {
    type: 'SET_ADD_TRANSACTION_EMAIL_INPUT',
    payload: data
  }
}

const setAddEmailError = (data) => {
  return {
    type: 'SET_ADD_TRANSACTION_EMAIL_INPUT_ERROR',
    payload: data
  }
}

export const setSelectedPrimaryService = (data) => {
  return {
    type: 'SET_SELECTED_PRIMARY_SERVICE',
    payload: data
  }
}

export const setSelectedSecondaryServices = (data) => {
  return {
    type: 'SET_SELECTED_SECONDARY_SERVICES',
    payload: data
  }
}

// To validate input in adding new transaction 
export const validateAndAddNewTransaction = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { name, phone, email, selectedServices, branch, staff, date } = data
    let staffId = staff.id
    let branchId = branch.id

    // Input is ERROR
    if (name.length <= 0) {
      dispatch(setAddNameError(emptyError))
    } 

    if (phone.length <= 0) {
      dispatch(setAddPhoneError(emptyError))
    } 

    let phoneResult = validatePhone(phone)
    if (phone.length > 0 && phoneResult.status === false) {
      dispatch(setAddPhoneError(phoneInvalidError))
    }

    if (email.length <= 0) {
      dispatch(setAddEmailError(emptyError))
    } 

    if (email.length > 0 && validateEmail(email) === false) {
      dispatch(setAddEmailError(emailInvalidError))
    }

    let transactionErrors = []
    if (selectedServices.length <= 0) {
      transactionErrors.push(noSelectedServicesError)
    }

    let isAppExists = await dispatch(isAppointmentExist(branchId, staffId, date))
    if (isAppExists === false) {
      transactionErrors.push(noAppointmentError)
    }
    
    if (Number(isAppExists.currentTransaction) >= Number(isAppExists.maxQueue)) {
      transactionErrors.push(fullyBookedError)
    }

    // Input is OK
    if (name.length > 0) {
      dispatch(setAddNameError(false))
    } 

    if (phoneResult.status === true) {
      dispatch(setAddPhoneError(false))
    } 

    if (email.length > 0 && validateEmail(email)) {
      dispatch(setAddEmailError(false))
    }

    if (selectedServices.length > 0) {
      let errorIndex = transactionErrors.indexOf(noSelectedServicesError)
      if (errorIndex > -1) {
        transactionErrors.splice(errorIndex, 1)
      }
    }

    if (isAppExists.id) {
      let errorIndex = transactionErrors.indexOf(noAppointmentError)
      if (errorIndex > -1) {
        transactionErrors.splice(errorIndex, 1)
      }
    }
  
    if (Number(isAppExists.currentTransaction) < Number(isAppExists.maxQueue)) {
      let errorIndex = transactionErrors.indexOf(fullyBookedError)
      if (errorIndex > -1) {
        transactionErrors.splice(errorIndex, 1)
      }
    }

    dispatch(setTransactionErrors(transactionErrors))

    if (name.length > 0 && phoneResult.status === true && email.length > 0 && validateEmail(email) && selectedServices.length > 0 && isAppExists.id && Number(isAppExists.currentTransaction) < Number(isAppExists.maxQueue)) {
      data['appointment'] = isAppExists
      dispatch(setTransactionLoadingStatus(true))
      dispatch(createNewTransaction(data))
    }
  }
}

export const setTransactionErrors = (data) => {
  return {
    type: 'SET_TRANSACTION_ERRORS',
    payload: data
  }
}

export const createNewTransaction = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { name, phone, email, selectedServices, branch, staff, shop, appointment, user } = data
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')
    let lowercasedName = name.toLowerCase()

    let queueNo = String(Number(appointment.currentTransaction) + 1)
    let startDate = ''
    let endDate = ''
    let status = 'booking confirmed'
    let createdDate = new Date(Date.now())
    let updatedDate = new Date(Date.now())
    let createdBy = user
    let updatedBy = user
    let paymentMethod = ''
    let paymentInformation = ''

    let newTransaction = {
      shop,
      branch,
      service: selectedServices,
      staff,
      appointment,
      customerId: '',
      name: lowercasedName,
      phone: formatPhone(phone, 'NATIONAL'),
      email,
      queueNo,
      startDate,
      endDate,
      status,
      createdDate,
      updatedDate,
      createdBy,
      updatedBy,
      paymentMethod,
      paymentInformation,
    }

    transactionRef.add(newTransaction)
    .then(ref => {
      newTransaction['id'] = ref.id
      dispatch(updateAppointmentStatus(shop, branch, status, appointment, newTransaction, user, null, null, null))
    })
    .catch(err => {
      console.log('ERROR: add new transaction', err)
    })
  }
}

export const setTransactionLoadingStatus = (data) => {
  return {
    type: 'SET_TRANSACTION_LOADING_STATUS',
    payload: data
  }
}

// To clear add transaction input error when click modal close
export const clearAddTransaction = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let errors = []
    dispatch(setTransactionErrors(errors))
    dispatch(setAddNameError(false))
    dispatch(setAddPhoneError(false))
    dispatch(setAddEmailError(false))
    dispatch(setAddName(""))
    dispatch(setAddPhone(""))
    dispatch(setAddEmail(""))
    dispatch(setSelectedPrimaryService(""))
    dispatch(setSelectedSecondaryServices([]))
  } 
}

// To get filtered transactions based on request
export const getFilteredTransactions = (startDate, endDate, branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction')
    let newStartDate = new Date(returnAcceptedDate(startDate))
    let newEndDate = new Date(returnAcceptedDate(endDate))

    let timeDifference = Math.abs(newEndDate.getTime() - newStartDate.getTime())
    let differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24))

    let errors = []
    // Validation error
    if (startDate.length <= 0 || endDate.length <= 0) {
      errors.push(transFilterEmptyError)
    }

    if (newStartDate > newEndDate) {
      errors.push(incorrectFilterError)
    }

    if (differenceInDays > 31) {
      errors.push(max31FilterError)
    }

    // Validation OK
    if (startDate.length > 0 && endDate.length > 0 && newStartDate <= newEndDate && differenceInDays <= 31) {
      errors = []
    }

    dispatch(setFilterTransactionErrors(errors))
    
    if (startDate.length > 0 && endDate.length > 0 && newStartDate <= newEndDate && differenceInDays <= 31) {
      transactionRef
      .where('branch.id', '==', branchId)
      .where('appointment.date', '>=', startDate)
      .where('appointment.date', '<=', endDate)
      .get()
      .then(function(querySnapshot) {
        let transactions = []
        if (querySnapshot.empty === false) {
          querySnapshot.forEach(function(doc) {
            let id = doc.id
            let data = doc.data()
            data['id'] = id

            data.service && data.service.map((service) => {
              let revisedData = {
                ...data,
                service
              }
              transactions.push(revisedData)
              return ''
            })
          })
          dispatch(setFilterTransaction(transactions))

          let sales = []
          transactions && transactions.map((transaction) => {
            if (transaction.status === 'finished') {
              sales.push(transaction.service)
            }
            return ''
          })
          dispatch(setSalesTransaction(sales))

        } else {
          let emptyObj = {
            message: 'empty',
          }
          transactions.push(emptyObj)
          dispatch(setFilterTransaction(transactions))
        }
      })
      .catch(err => {
        console.log('ERROR: get filtered transactions', err)
      })
    }
  }
}

export const setFilterTransactionStartDate = (data) => {
  return {
    type: 'SET_FILTER_TRANSACTION_START_DATE',
    payload: data
  }
}

export const setFilterTransactionEndDate = (data) => {
  return {
    type: 'SET_FILTER_TRANSACTION_END_DATE',
    payload: data
  }
}

const setFilterTransaction = (data) => {
  return {
    type: 'SET_FILTER_TRANSACTIONS',
    payload: data
  }
}

const setSalesTransaction = (data) => {
  return {
    type: 'SET_SALES_TRANSACTIONS',
    payload: data
  }
}

const setFilterTransactionErrors = (data) => {
  return {
    type: 'SET_FILTER_TRANSACTION_ERRORS',
    payload: data
  }
}


// To export table html to excel file
export const exportToExcel = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { document, shop, branch, startDate, endDate } = data
    let tableToExcel = document.getElementById('Table-to-excel')

    let workbook = XLSX.utils.book_new()

    workbook.Props = {
      Title: "Transactions Report",
      Subject: "Transactions Report",
      Author: "Bookinesia",
      CreatedDate: new Date(Date.now())
    }

    let worksheet = XLSX.utils.table_to_sheet(tableToExcel)
    workbook.SheetNames.push("Transactions Report")
    workbook.Sheets["Transactions Report"] = worksheet
 
    var workbook_out = XLSX.write(workbook, { bookType:'xlsx', bookSST:true, type: 'binary' })

    function BinaryToOctet(workbook_out) {
      let buf = new ArrayBuffer(workbook_out.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i < workbook_out.length; i++) view[i] = workbook_out.charCodeAt(i) & 0xFF
      return buf
    }

    saveAs(new Blob([BinaryToOctet(workbook_out)],{ type:"application/octet-stream" }), `TR_${shop.id}_${branch.name}_${startDate}_${endDate}.xlsx`);
  }
}

// To set initial edit transaction 
export const setInitialTransaction = (name, phone, email) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setEditName(name))
    dispatch(setEditPhone(phone))
    dispatch(setEditEmail(email))
  }
}

// To handle changes in editing transaction 
export const handleChangesEditTransaction = (e) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setEditName(value))
    } else if (inputId === 'phone') {
      dispatch(setEditPhone(value))
    } else if (inputId === 'email') {
      dispatch(setEditEmail(value))
    } else if (inputId === 'paymentInfo') {
      dispatch(setPaymentInfo(value))
    }
  }
}

const setEditName = (data) => {
  return {
    type: 'SET_EDIT_TRANSACTION_NAME_INPUT',
    payload: data
  }
}

const setEditNameError = (data) => {
  return {
    type: 'SET_EDIT_TRANSACTION_NAME_INPUT_ERROR',
    payload: data
  }
}

const setEditPhone = (data) => {
  return {
    type: 'SET_EDIT_TRANSACTION_PHONE_INPUT',
    payload: data
  }
}

const setEditPhoneError = (data) => {
  return {
    type: 'SET_EDIT_TRANSACTION_PHONE_INPUT_ERROR',
    payload: data
  }
}

const setEditEmail = (data) => {
  return {
    type: 'SET_EDIT_TRANSACTION_EMAIL_INPUT',
    payload: data
  }
}

const setEditEmailError = (data) => {
  return {
    type: 'SET_EDIT_TRANSACTION_EMAIL_INPUT_ERROR',
    payload: data
  }
}

const setPaymentInfo = (data) => {
  return {
    type: 'SET_PAYMENT_INFORMATION',
    payload: data
  }
}

// To validate input in editing new transaction 
export const validateAndEditTransaction = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { name, phone, email, selectedServices } = data

    // Input is ERROR
    if (name.length <= 0) {
      dispatch(setEditNameError(emptyError))
    } 

    if (phone.length <= 0) {
      dispatch(setEditPhoneError(emptyError))
    } 

    let phoneResult = validatePhone(phone)
    if (phone.length > 0 && phoneResult.status === false) {
      dispatch(setEditPhoneError(phoneInvalidError))
    }

    if (email.length <= 0) {
      dispatch(setEditEmailError(emptyError))
    } 

    if (email.length > 0 && validateEmail(email) === false) {
      dispatch(setEditEmailError(emailInvalidError))
    }

    let transactionErrors = []
    if (selectedServices.length <= 0) {
      transactionErrors.push(noSelectedServicesError)
    }
    dispatch(setTransactionErrors(transactionErrors))

    // Input is OK
    if (name.length > 0) {
      dispatch(setEditNameError(false))
    } 

    if (phoneResult.status === true) {
      dispatch(setEditPhoneError(false))
    } 

    if (email.length > 0 && validateEmail(email)) {
      dispatch(setEditEmailError(false))
    }

    if (selectedServices.length > 0) {
      transactionErrors = []
      dispatch(setTransactionErrors(transactionErrors))
    }

    if (name.length > 0 && phoneResult.status === true && email.length > 0 && validateEmail(email) && selectedServices.length > 0) {
      dispatch(setTransactionLoadingStatus(true))
      dispatch(editNewTransaction(data))
    }
  }
}

export const editNewTransaction = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { name, phone, email, selectedServices, transaction, user } = data
    let firestore = getFirestore()
    let transactionRef = firestore.collection('transaction').doc(transaction.id)
    let lowercasedName = name.toLowerCase()

    let updatedDate = new Date(Date.now())
    let updatedBy = user

    let revisedTransaction = {
      name: lowercasedName,
      phone: formatPhone(phone, 'NATIONAL'),
      email,
      service: selectedServices,
      updatedDate,
      updatedBy,
    }

    transactionRef.update(revisedTransaction)
    .then(ref => {
      dispatch(setTransactionErrors([]))
      dispatch(setEditNameError(false))
      dispatch(setEditPhoneError(false))
      dispatch(setEditEmailError(false))
      dispatch(setSelectedPrimaryService(""))
      dispatch(setSelectedSecondaryServices([]))
      dispatch(setTransactionLoadingStatus(false))
      swal("Transaction Updated", "", "success")
    })
    .catch(err => {
      console.log('ERROR: edit transaction', err)
    })
  }
}

// To clear edit transaction input error when click modal close
export const clearEditTransaction = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let errors = []
    dispatch(setTransactionErrors(errors))
    dispatch(setEditNameError(false))
    dispatch(setEditPhoneError(false))
    dispatch(setEditEmailError(false))
    dispatch(setEditName(""))
    dispatch(setEditPhone(""))
    dispatch(setEditEmail(""))
    dispatch(setSelectedPrimaryService(""))
    dispatch(setSelectedSecondaryServices([]))
  } 
}
