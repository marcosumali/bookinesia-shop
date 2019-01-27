import swal from 'sweetalert';

let emptyInputError = 'Barber has to provide atleast one active service.'

// ---------------------------------------------- STAFF SERVICE ACTION ----------------------------------------------
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
    dispatch(setSelectedStaffServicesAction(selectedStaffServices))
    dispatch(setSelectedServicesInput({ uniqueStatus: true, staffServices: selectedStaffServices }))
  }
}

export const setSelectedStaffServicesAction = (data) => {
  return {
    type: 'SET_SELECTED_STAFF_SERVICES',
    payload: data
  }
}

// To set selected service based on staff services for user input purposes
export const setSelectedServicesInput = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { uniqueStatus, staffServices } = data
    let result = []
    let uniqueStaffServices = []
    if (uniqueStatus) {
      let enabledStaffServices = []
      staffServices && staffServices.map(staffService => {
        if (staffService.disableStatus === false) {
          enabledStaffServices.push(staffService)
        }
        return ''
      })
      uniqueStaffServices = [...new Set(enabledStaffServices.map(enabledStaffService => enabledStaffService.serviceId))]
    } else {
      uniqueStaffServices = staffServices
    }

    uniqueStaffServices && uniqueStaffServices.map((uniqueStaffService) => {
      result.push(uniqueStaffService)
      return ''
    })

    dispatch(setSelectedServicesInputAction(result))
  }
}

const setSelectedServicesInputAction = (data) => {
  return {
    type: 'SET_SELECTED_SERVICES_INPUT',
    payload: data
  }
}

// To detect has edit status
export const setHasEditStatus = (clickStatus) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let status = ''

    if (clickStatus) {
      status = true
    } else {
      status = false
    }
    dispatch(setHasEditStatusAction(status))
  }
}

const setHasEditStatusAction = (data) => {
  return {
    type: 'SET_HAS_EDIT_STATUS',
    payload: data
  }
}

// To update barber data about staff services to firestore
export const updateStaffServicesData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let { staffServices, servicesInput } = data
    
    // Input Validation: Error
    if (servicesInput.length <= 0) {
      dispatch(setStaffServiceInputError(emptyInputError))
    }

    // Input Validation: OK
    if (servicesInput.length > 0) {
      dispatch(setStaffServiceInputError(false))
    }
    
    // STEP 1
    // Obtain staff services to be disabled by:
    // 1. Obtain staff services that is not inputted by user
    // 2. If related staff services has disableStatus = false, 
    // then change it to true since it means user deselect the item in the previous interface
    let staffServicesToBeUpdated = []
    let staffServicesToBeDisabled = []
    let staffServicesToBeEnabled = []
    
    staffServices.map(staffService => {
      let checkedIndex = servicesInput.findIndex(serviceId => serviceId === staffService.serviceId)
      if (checkedIndex < 0) {
        staffServicesToBeDisabled.push(staffService)
      } else {
        staffServicesToBeEnabled.push(staffService)
      }
      return ''
    })

    staffServicesToBeDisabled && staffServicesToBeDisabled.map(staffServiceToBeDisabled => {
      if (staffServiceToBeDisabled.disableStatus === false) {
        let editedStaffService = {
          ...staffServiceToBeDisabled,
          disableStatus: true,
        }
        staffServicesToBeUpdated.push(editedStaffService)
      }
      return ''
    })

    // STEP 2
    // Obtain staff services to be enable by:
    // 1. Obtain staff services that is inputted by user
    // 2. If related staff services has disableStatus = true, 
    // then change it to false since it means user select the item in the previous interface
    staffServicesToBeEnabled && staffServicesToBeEnabled.map(staffServiceToBeEnabled => {
      if (staffServiceToBeEnabled.disableStatus === true) {
        let editedStaffService = {
          ...staffServiceToBeEnabled,
          disableStatus: false,
        }
        staffServicesToBeUpdated.push(editedStaffService)
      }
      return ''
    })
    // console.log('check', staffServicesToBeUpdated)

    if (servicesInput.length > 0 && staffServicesToBeUpdated.length > 0) {
      swal({
        title: 'Are you sure?',
        text: "Barber's services information will be updated with the new input.",
        icon: 'warning',
        buttons: ['Cancel', 'OK']
      })
      .then(result => {        
        if (result) {
          dispatch(setStaffServiceLoadingStatus(true))

          // Process to update the data to selected staff services to be dispatch on next action
          staffServicesToBeUpdated && staffServicesToBeUpdated.map((staffServiceToBeUpdated) => {
            let checkedIndex = staffServices.findIndex(staffService => staffService.id === staffServiceToBeUpdated.id)
            let revisedStaffServices = {
              ...staffServices[checkedIndex],
              disableStatus: staffServiceToBeUpdated.disableStatus
            }
            staffServices.splice(checkedIndex, 1, revisedStaffServices)
            return ''
          })

          let score = 0
          // Process to update the data to firestore and redux
          staffServicesToBeUpdated && staffServicesToBeUpdated.map((staffServiceToBeUpdated, index) => {
            let staffServiceRef = firestore.collection('staffService').doc(staffServiceToBeUpdated.id)
            score = score + 1
              
            staffServiceRef.update({
              disableStatus: staffServiceToBeUpdated.disableStatus
            })
            .then(() => {
            })
            .catch(err => {
              console.log('ERROR: update staff service data', err)
            })

            return ''
          })

          if (score >= staffServicesToBeUpdated.length) {
            dispatch(setHasEditStatus(false))
            dispatch(setSelectedStaffServicesAction(staffServices))
            dispatch(setStaffServiceLoadingStatus(false))
            swal("Information Updated", "", "success")
          }

        }
      })
    }
  }
}

export const setStaffServiceInputError = (data) => {
  return {
    type: 'SET_STAFF_SERVICE_INPUT_ERROR',
    payload: data
  }
}

export const setStaffServiceLoadingStatus = (data) => {
  return {
    type: 'SET_STAFF_SERVICE_LOADING_STATUS',
    payload: data
  }
}

// To create new staff service data for new staff
export const addNewStaffServicesData = (staffId, branchId, services) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let disableStatus = true

    services && services.map((service, index) => {
      let newStaffService = {
        branchId,
        disableStatus,
        staffId,
        serviceId: service.id
      }

      let uid = `${staffId}-${index}`
      let staffServiceRef = firestore.collection('staffService').doc(uid)

      staffServiceRef
      .set(newStaffService)
      .then(() => {
      })
      .catch(err => {
        console.log('ERROR: add new staff service', err)
      })
  
      return ''
    })
    
    return true
  }
}