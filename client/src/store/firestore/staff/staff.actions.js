import { getAppointmentsDate } from '../appointment/appointment.actions';
import { setActiveTab } from '../../dashboard/dashboard.actions';
import { setSelectedStaffServices, setHasEditStatus } from '../../firestore/staffService/staffService.actions';
import swal from 'sweetalert';

export const emptyError = 'This section must be filled.'

// Get barbers data based on provided branchId with disableStatus is false
export const getStaffsAndOtherData = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let staffRef = firestore.collection('staff')
    
    staffRef
    .where('branchId', '==', branchId)
    .where('job', '==', 'barber')
    .where('disableStatus', '==', false)
    .onSnapshot(function (querySnapshot) {
      let branchBarbers = []
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

// Get all barbers data based on provided branchId
export const getAllStaffs = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let staffRef = firestore.collection('staff')
    
    staffRef
    .where('branchId', '==', branchId)
    .where('job', '==', 'barber')
    .onSnapshot(function (querySnapshot) {
      let branchBarbers = []
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(function(doc) {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          branchBarbers.push(data)
        })
        dispatch(setAllBarbersSuccess(branchBarbers))
      } else {
        dispatch(setAllBarbersFailed(false))
      }
    })
  }
}

export const setAllBarbersSuccess = (barbers) => {
  return {
    type: 'SET_ALL_BARBERS_SUCCESS',
    payload: barbers
  }
}

const setAllBarbersFailed = (status) => {
  return {
    type: 'SET_ALL_BARBERS_FAILED',
    payload: status
  }
}

// To set selected barbers to display it on content section
export const setSelectedBarber = (barber, staffServices) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(selectedBarberAction(barber))
    dispatch(setBarberInfo(barber))
    dispatch(setActiveTab('Details'))
    dispatch(setSelectedStaffServices(barber, staffServices))
    dispatch(setHasEditStatus(false))
  }
}

export const selectedBarberAction = (data) => {
  return {
    type: 'SET_SELECTED_BARBER',
    payload: data
  }
}

// To set barber name and description when first load
export const setBarberInfo = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { name, disableStatus } = data
    dispatch(setBarberNameInput(name))
    dispatch(setBarberDisableStatusInput(disableStatus))
  }
}

// To handle changes in input from manage barbers
export const handleChangesManageBarbers = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setBarberNameInput(value))
    }
  }
}

const setBarberNameInput = (data) => {
  return {
    type: 'SET_BARBER_NAME_INPUT',
    payload: data
  }
}

const setBarberNameInputError = (data) => {
  return {
    type: 'SET_BARBER_NAME_INPUT_ERROR',
    payload: data
  }
}

export const setBarberDisableStatusInput = (data) => {
  return {
    type: 'SET_BARBER_DISABLE_STATUS_INPUT',
    payload: data
  }
}

// To update barber data to firestore
export const updateBarberData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let { id, name, disableStatus, selectedBarber } = data
    let lowercasedName = name.toLowerCase()
    
    let staffRef = firestore.collection('staff').doc(id)

    // Input Validation: Error
    if (name.length <= 0) {
      dispatch(setBarberNameInputError(emptyError))
    }

    // Input Validation: OK
    if (name.length > 0) {
      dispatch(setBarberNameInputError(false))
    }

    if (name.length > 0) {
      swal({
        title: 'Are you sure?',
        text: "Barber's detail information will be updated including their availibility status in the shop's website.",
        icon: 'warning',
        buttons: ['Cancel', 'OK']
      })
      .then(result => {
        if (result) {
          staffRef.update({
            name: lowercasedName,
            disableStatus
          })
          .then(() => {
            selectedBarber.name = lowercasedName
            selectedBarber.disableStatus = disableStatus
            dispatch(selectedBarberAction(selectedBarber))
            swal("Information Updated", "", "success")
          })
          .catch(err => {
            console.log('ERROR: update staff data', err)
          })
        }
      })
    }
  }
}



