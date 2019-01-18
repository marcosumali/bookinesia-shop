import { getAppointmentsDate } from '../appointment/appointment.actions';

// Get barbers data based on provided branchId
export const getStaffs = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let staffRef = firestore.collection('staff')
    
    let branchBarbers = []
    staffRef
    .where('branchId', '==', branchId)
    .where('job', '==', 'barber')
    .where('disableStatus', '==', false)
    .onSnapshot(function (querySnapshot) {
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(function(doc) {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          branchBarbers.push(data)
        })
        dispatch(getAppointmentsDate(branchId, branchBarbers))
      } else {
        dispatch(setBarbersFailed(false))
      }
    })
  }
}

export const setBarbersSuccess = (barbers) => {
  return {
    type: 'SET_BARBERS_SUCCESS',
    payload: barbers
  }
}

const setBarbersFailed = (status) => {
  return {
    type: 'SET_BARBERS_FAILED',
    payload: status
  }
}