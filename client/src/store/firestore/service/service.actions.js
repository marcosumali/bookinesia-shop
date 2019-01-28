import swal from 'sweetalert';

import { emptyError } from '../staff/staff.actions';
import { addStaffService } from '../staffService/staffService.actions';

// Get services data based on provided branchId
export const getAllServices = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let serviceRef = firestore.collection('service')
    
    serviceRef
    .where('branchId', '==', branchId)
    .onSnapshot(function (querySnapshot) {
      let services = []
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(function(doc) {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          services.push(data)
        })
        dispatch(getServices(services))
        dispatch(setAllServicesSuccess(services))
      } else {
        dispatch(setAllServicesFailed(false))
      }
    })
  }
}

const setAllServicesSuccess = (data) => {
  return {
    type: 'SET_ALL_SERVICES_SUCCESS',
    payload: data
  }
}

const setAllServicesFailed = (data) => {
  return {
    type: 'SET_ALL_SERVICES_FAILED',
    payload: data
  }
}

// Get services data based on provided branchId with disableStatus is false
export const getServices = (allServices) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    let enabledServices = []

    allServices && allServices.map((service) => {
      if (service.disableStatus === false) {
        enabledServices.push(service)
      }
      return ''
    })

    dispatch(setServicesSuccess(enabledServices))
  }
}

const setServicesSuccess = (data) => {
  return {
    type: 'SET_SERVICES_SUCCESS',
    payload: data
  }
}


// To set selected barbers to display it on content section
export const setSelectedServiceAndOtherData = (service) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Set selected service
    dispatch(selectedServiceAction(service))
    // Pre input selected service
    dispatch(setServiceNameInput(service.name))
    dispatch(setServiceDurationInput(service.duration))
    dispatch(setServicePriceInput(service.price))
    dispatch(setServiceTypeInput(service.type))
    dispatch(setServiceDisableStatus(service.disableStatus))
    // Clear error
    dispatch(setServiceNameInputError(false))
    dispatch(setServiceDurationInputError(false))
    dispatch(setServicePriceInputError(false))
  }
}

const selectedServiceAction = (data) => {
  return {
    type: 'SET_SELECTED_SERVICE',
    payload: data
  }
}

// To handle changes in input from update service
export const handleChangesUpdateService = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setServiceNameInput(value))
    } else if (inputId === 'duration') {
      dispatch(setServiceDurationInput(value))
    } else if (inputId === 'price') {
      dispatch(setServicePriceInput(value))
    }
  }
}

export const setServiceNameInput = (data) => {
  return {
    type: 'SET_SERVICE_NAME_INPUT',
    payload: data
  }
}

const setServiceNameInputError = (data) => {
  return {
    type: 'SET_SERVICE_NAME_INPUT_ERROR',
    payload: data
  }
}

export const setServiceDurationInput = (data) => {
  return {
    type: 'SET_SERVICE_DURATION_INPUT',
    payload: data
  }
}

const setServiceDurationInputError = (data) => {
  return {
    type: 'SET_SERVICE_DURATION_INPUT_ERROR',
    payload: data
  }
}

export const setServicePriceInput = (data) => {
  return {
    type: 'SET_SERVICE_PRICE_INPUT',
    payload: data
  }
}

const setServicePriceInputError = (data) => {
  return {
    type: 'SET_SERVICE_PRICE_INPUT_ERROR',
    payload: data
  }
}

export const setServiceTypeInput = (data) => {
  return {
    type: 'SET_SERVICE_TYPE_INPUT',
    payload: data
  }
}

export const setServiceDisableStatus = (data) => {
  return {
    type: 'SET_SERVICE_DISABLE_STATUS',
    payload: data
  }
}

// To validate and update service data
export const updateServiceData = (serviceInput) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { selectedService, name, duration, price, type, disableStatus } = serviceInput
    let firestore = getFirestore()

    // Validation if wrong
    if (name.length <= 0) {
      dispatch(setServiceNameInputError(emptyError))
    }

    if (duration.length <= 0 && Number(duration) <= 0) {
      dispatch(setServiceDurationInputError(emptyError))
    }

    if (price.length <= 0 && Number(price) <= 0) {
      dispatch(setServicePriceInputError(emptyError))
    }

    // Validation if OK
    if (name.length > 0) {
      dispatch(setServiceNameInputError(false))
    }

    if (duration.length > 0 && Number(duration) > 0) {
      dispatch(setServiceDurationInputError(false))
    }

    if (price.length > 0 && Number(price) > 0) {
      dispatch(setServicePriceInputError(false))
    }

    if (name.length > 0 && (duration.length > 0 && Number(duration) > 0) && (price.length > 0 && Number(price) > 0)) {
      swal({
        title: 'Are you sure?',
        text: "Service's information will be updated with the new input.",
        icon: 'warning',
        buttons: ['Cancel', 'OK']
      })
      .then(result => {        
        if (result) {
          dispatch(setServiceLoadingStatus(true))

          let acceptedName = name.toLowerCase()
          let acceptedDuration = String(Number(duration))
          let acceptedPrice = String(Number(price))

          let updatedService = {
            name: acceptedName,
            duration: acceptedDuration,
            price: acceptedPrice,
            type,
            disableStatus,
          }

          let uid = selectedService.id
          let serviceRef = firestore.collection('service').doc(uid)

          serviceRef
          .update(updatedService)
          .then(() => {
            let reduxService = {
              ...selectedService,
              name: acceptedName,
              duration: acceptedDuration,
              price: acceptedPrice,
              type,
              disableStatus,
            }
            dispatch(selectedServiceAction(reduxService))
            dispatch(setServiceLoadingStatus(false))
            swal("Information Updated", "", "success")
          })
          .catch(err => {
            console.log('ERROR: update service data', err)
          })
        }
      })
    }  
  }
}

const setServiceLoadingStatus = (data) => {
  return {
    type: 'SET_SERVICE_LOADING_STATUS',
    payload: data
  }
}

// To handle changes in input from add new service
export const handleChangesAddService = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setAddServiceNameInput(value))
    } else if (inputId === 'duration') {
      dispatch(setAddServiceDurationInput(value))
    } else if (inputId === 'price') {
      dispatch(setAddServicePriceInput(value))
    }
  }
}

const setAddServiceNameInput = (data) => {
  return {
    type: 'SET_ADD_SERVICE_NAME_INPUT',
    payload: data
  }
}

const setAddServiceNameInputError = (data) => {
  return {
    type: 'SET_ADD_SERVICE_NAME_INPUT_ERROR',
    payload: data
  }
}

const setAddServiceDurationInput = (data) => {
  return {
    type: 'SET_ADD_SERVICE_DURATION_INPUT',
    payload: data
  }
}

const setAddServiceDurationInputError = (data) => {
  return {
    type: 'SET_ADD_SERVICE_DURATION_INPUT_ERROR',
    payload: data
  }
}

const setAddServicePriceInput = (data) => {
  return {
    type: 'SET_ADD_SERVICE_PRICE_INPUT',
    payload: data
  }
}

const setAddServicePriceInputError = (data) => {
  return {
    type: 'SET_ADD_SERVICE_PRICE_INPUT_ERROR',
    payload: data
  }
}

export const setAddServiceTypeInput = (data) => {
  return {
    type: 'SET_ADD_SERVICE_TYPE_INPUT',
    payload: data
  }
}

// To validate and add new service data
export const addServiceData = (serviceInput) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { services, name, duration, price, type, branchId, staffs } = serviceInput
    let disableStatus = true
    let currency = 'Rp'
    let description = ''
    let firestore = getFirestore()

    // Validation if wrong
    if (name.length <= 0) {
      dispatch(setAddServiceNameInputError(emptyError))
    }

    if (duration.length <= 0 && Number(duration) <= 0) {
      dispatch(setAddServiceDurationInputError(emptyError))
    }

    if (price.length <= 0 && Number(price) <= 0) {
      dispatch(setAddServicePriceInputError(emptyError))
    }

    // Validation if OK
    if (name.length > 0) {
      dispatch(setAddServiceNameInputError(false))
    }

    if (duration.length > 0 && Number(duration) > 0) {
      dispatch(setAddServiceDurationInputError(false))
    }

    if (price.length > 0 && Number(price) > 0) {
      dispatch(setAddServicePriceInputError(false))
    }

    if (name.length > 0 && (duration.length > 0 && Number(duration) > 0) && (price.length > 0 && Number(price) > 0)) {
      dispatch(setServiceLoadingStatus(true))

      let acceptedName = name.toLowerCase()
      let acceptedDuration = String(Number(duration))
      let acceptedPrice = String(Number(price))

      let newService = {
        name: acceptedName,
        duration: acceptedDuration,
        price: acceptedPrice,
        type,
        disableStatus,
        branchId,
        currency,
        description,
      }

      let uid = `${branchId}-${services.length}`
      let serviceRef = firestore.collection('service').doc(uid)

      let addStatus = await serviceRef
      .set(newService)
      .then(() => {
        return true
      })
      .catch(err => {
        console.log('ERROR: add service data', err)
      })

      if (addStatus) {
        let score = 0;
        staffs && staffs.map(staff => {
          score = score + 1
          dispatch(addStaffService(branchId, staff.id, uid))
          return ''
        })
        if (score === staffs.length) {
          dispatch(setServiceLoadingStatus(false))
          dispatch(setAddServiceNameInput(""))
          dispatch(setAddServiceDurationInput(""))
          dispatch(setAddServicePriceInput(""))
          dispatch(setAddServiceTypeInput("primary"))
          swal("New Service Added", "", "success")
        }
      }
    }  
  }
}


// To clear add new service input and input error when click modal close
export const clearAddServiceData = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Clear error input
    dispatch(setAddServiceNameInputError(false))
    dispatch(setAddServiceDurationInputError(false))
    dispatch(setAddServicePriceInputError(false))
    // Clear input
    dispatch(setAddServiceNameInput(""))
    dispatch(setAddServiceDurationInput(""))
    dispatch(setAddServicePriceInput(""))
    dispatch(setAddServiceTypeInput("primary"))
  } 
}

