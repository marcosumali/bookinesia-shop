import { setBarbersSuccess } from '../staff/staff.actions';
import { setSelectedDateSuccess } from '../appointment/appointment.actions';

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
        // console.log('xxx', transactions)

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
        
        dispatch(setBarbersSuccess(staffs))
        dispatch(setTransactionsSuccess(transactions))
        
        dispatch(setDashboardSuccess(dashboardReady))
        dispatch(setSelectedDateSuccess(dashboardReady[0].originalDate))

      } else {
        dispatch(setTransactionsFailed(false))
      }
    })

  }
}

const setDashboardSuccess = (data) => {
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
