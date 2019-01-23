// Get staff services data based on provided branchId
export const getStaffServices = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let staffServiceRef = firestore.collection('staffService')
    
    staffServiceRef
    .where('branchId', '==', branchId)
    .onSnapshot(function (querySnapshot) {
      let staffServices = []
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(function(doc) {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          staffServices.push(data)
        })
        dispatch(setStaffServicesSuccess(staffServices))
      } else {
        dispatch(setStaffServicesFailed(false))
      }
    })
  }
}

const setStaffServicesSuccess = (data) => {
  return {
    type: 'SET_STAFF_SERVICES_SUCCESS',
    payload: data
  }
}

const setStaffServicesFailed = (data) => {
  return {
    type: 'SET_STAFF_SERVICES_FAILED',
    payload: data
  }
}

// To set selected staff services based on selected staff
export const setSelectedStaffServices = (barber, staffServices) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let selectedStaffServices = []
    staffServices && staffServices.map((staffService) => {
      if (staffService.staffId === barber.id) {
        selectedStaffServices.push(staffService)
      }
      return ''
    })
    console.log('first time only')
    dispatch(setSelectedStaffServicesAction(selectedStaffServices))
    dispatch(setSelectedStaffServicesInputAction(selectedStaffServices))
  }
}

export const setSelectedStaffServicesAction = (data) => {
  return {
    type: 'SET_SELECTED_STAFF_SERVICES',
    payload: data
  }
}

// To set selected staff services for user input purposes
export const setSelectedStaffServicesInput = (staffServices) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setSelectedStaffServicesInputAction(staffServices))
  }
}

export const setSelectedStaffServicesInputAction = (data) => {
  console.log('terima', data)
  return {
    type: 'SET_SELECTED_STAFF_SERVICES_INPUT',
    payload: data
  }
}
