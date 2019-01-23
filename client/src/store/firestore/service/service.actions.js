// Get services data based on provided branchId
export const getServices = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let serviceRef = firestore.collection('service')
    
    serviceRef
    .where('branchId', '==', branchId)
    .where('disableStatus', '==', false)
    .onSnapshot(function (querySnapshot) {
      let services = []
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(function(doc) {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          services.push(data)
        })
        dispatch(setServicesSuccess(services))
      } else {
        dispatch(setServicesFailed(false))
      }
    })
  }
}

export const setServicesSuccess = (data) => {
  return {
    type: 'SET_SERVICES_SUCCESS',
    payload: data
  }
}

export const setServicesFailed = (data) => {
  return {
    type: 'SET_SERVICES_FAILED',
    payload: data
  }
}
