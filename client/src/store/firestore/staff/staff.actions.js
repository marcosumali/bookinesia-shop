import { setActiveTab, maxFileSizeError, setHasEditStatusFile, imageFileTypeError } from '../../dashboard/dashboard.actions';
import { getAppointmentsAndCalendar } from '../../firestore/appointment/appointment.actions';
import { setSelectedStaffServices, setHasEditStatus, addNewStaffServicesData, setStaffServiceInputError } from '../../firestore/staffService/staffService.actions';
import { setSelectedStaffSchedules, setHasEditStatusStaffSchedule, addNewStaffSchedulesData, setStaffScheduleInputError } from '../../firestore/staffSchedule/staffSchedule.actions';
import { emptyError } from '../transaction/transaction.actions';
import swal from 'sweetalert';

export const maxStaffError = 'Maximum number of barbers is 5 person per branch. Contact our care center for futher queries.'

// Get barbers data based on provided branchId with disableStatus is false
export const getStaffsAndOtherData = (allBarbers) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    let enabledBarbers = []

    allBarbers && allBarbers.map((barber) => {
      if (barber.disableStatus === false) {
        enabledBarbers.push(barber)
      }
      return ''
    })

    dispatch(setBarbersSuccess(enabledBarbers))
  }
}

export const setBarbersSuccess = (barbers) => {
  return {
    type: 'SET_BARBERS_SUCCESS',
    payload: barbers
  }
}

// Get all barbers data based on provided branchId
export const getAllStaffsAndCalendar = (branchId, date) => {
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
        dispatch(getAppointmentsAndCalendar(branchId, date, branchBarbers))

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
export const setSelectedBarberAndOtherData = (barber, staffServices, staffSchedules, user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Set selected barber
    dispatch(selectedBarberAction(barber))
    dispatch(setSelectedStaffSchedules(barber, staffSchedules))
    // Pre input selected barber information
    dispatch(setBarberInfo(barber))
    if (user.job === 'admin') {
      dispatch(setActiveTab('Appointments'))
    } else {
      dispatch(setActiveTab('Details'))
    }
    dispatch(setSelectedStaffServices(barber, staffServices))
    // Remove edit status
    dispatch(setHasEditStatusFile(false))
    dispatch(setHasEditStatus(false))
    dispatch(setHasEditStatusStaffSchedule(false))
    // Remove input error
    dispatch(setBarberNameInputError(false))
    dispatch(setFileInputError(false))
    dispatch(setStaffServiceInputError(false))
    dispatch(setStaffScheduleInputError(false))
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

export const setBarberNameInputError = (data) => {
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

export const setFileInputError = (data) => {
  return {
    type: 'SET_FILE_ERROR',
    payload: data
  }
}

// Vaildate data before update to firestore or cloud storage
export const updateBarberDataValidation = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { selectedBarber, name, disableStatus, file, branchId } = data
    let lowercasedName = name.toLowerCase()
    let maxFileSize = 1 * 1024 * 1024 

    // Input Validation: Error
    if (name.length <= 0) {
      dispatch(setBarberNameInputError(emptyError))
    }
 
    if (file.type) {
      let error = ''
      if (file.size > maxFileSize) {
        error = error + maxFileSizeError
      }
  
      if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png' && file.type !== 'image/svg+xml') {
        error = error + imageFileTypeError
      }
      dispatch(setFileInputError(error))
    }


    // Input Validation: OK
    if (name.length > 0) {
      dispatch(setBarberNameInputError(false))
    }

    if (file.type) {
      if (file.size <= maxFileSize && (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/svg+xml')) {
        dispatch(setFileInputError(false))
      }
    }

    if (name.length > 0) {
      if (file.type) {
        if (file.size <= maxFileSize && (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/svg+xml')) {
          swal({
            title: 'Are you sure?',
            text: "Provider's detail information will be updated including their availibility status in the shop's website.",
            icon: 'warning',
            buttons: ['Cancel', 'OK']
          })
          .then(result => {
            if (result) {
              dispatch(setStaffLoadingStatus(true))
              dispatch(setHasEditStatusFile(false))
              dispatch(updateBarberFileAndData(file, selectedBarber, lowercasedName, disableStatus, branchId))
            }
          })
        }
      } else {
        swal({
          title: 'Are you sure?',
          text: "Provider's detail information will be updated including their availibility status in the shop's website.",
          icon: 'warning',
          buttons: ['Cancel', 'OK']
        })
        .then(result => {
          if (result) {
            dispatch(setStaffLoadingStatus(true))
            dispatch(setHasEditStatusFile(false))
            dispatch(updateBarberData(null, selectedBarber, lowercasedName, disableStatus, null))
          }
        })
      }
    }
  }
}

export const setStaffLoadingStatus = (data) => {
  return {
    type: 'SET_STAFF_DETAILS_LOADING_STATUS',
    payload: data
  }
}

// To update barber data to firestore
export const updateBarberData = (file, selectedBarber, lowercasedName, disableStatus, downloadURL) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let staffRef = firestore.collection('staff').doc(selectedBarber.id)

    let dataToBeUpdated = {}

    if(file) {
      dataToBeUpdated['name'] = lowercasedName
      dataToBeUpdated['disableStatus'] = disableStatus
      dataToBeUpdated['picture'] = downloadURL
      dataToBeUpdated['storageFileName'] = file.name
    } else {
      dataToBeUpdated['name'] = lowercasedName
      dataToBeUpdated['disableStatus'] = disableStatus
    }

    staffRef.update(dataToBeUpdated)
    .then(() => {
      let revisedSelectedBarber = {}
      if (file) {        
        revisedSelectedBarber = {
          ...selectedBarber,
          name: lowercasedName,
          disableStatus,
          picture: downloadURL,
          storageFileName: file.name
        }
      } else {
        revisedSelectedBarber = {
          ...selectedBarber,
          name: lowercasedName,
          disableStatus,
        }
      }
      dispatch(setStaffLoadingStatus(false))
      dispatch(selectedBarberAction(revisedSelectedBarber))
      swal("Information Updated", "", "success")
    })
    .catch(err => {
      console.log('ERROR: update staff data', err)
    })
  }
}

// To update barber file to cloud storage
export const updateBarberFileAndData = (file, selectedBarber, lowercasedName, disableStatus, branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase =  getFirebase()
    let staffId = selectedBarber.id
    let storageStaffImageRefToUpdate = firebase.storage().ref(`staff/${branchId}/${staffId}/${file.name}`)

    if (selectedBarber.picture.length <= 0) {
      storageStaffImageRefToUpdate
      .put(file)
      .then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          dispatch(updateBarberData(file, selectedBarber, lowercasedName, disableStatus, downloadURL))
        })
      })
      .catch(err => {
        console.log('ERROR: update new barber file data', err)
      })      

    } else {
      let storageStaffImageRefToDelete = firebase.storage().ref(`staff/${branchId}/${staffId}/${selectedBarber.storageFileName}`)
  
      storageStaffImageRefToDelete
      .delete()
      .then(function() {
        storageStaffImageRefToUpdate
        .put(file)
        .then(function(snapshot) {
          snapshot.ref.getDownloadURL().then(function(downloadURL) {
            dispatch(updateBarberData(file, selectedBarber, lowercasedName, disableStatus, downloadURL))
          })
        })
        .catch(err => {
          console.log('ERROR: update barber file data', err)
        })
      }).catch(function(err) {
        console.log('ERROR: delete file picture', err)
      })
    }
  }
}

// To handle changes in input from add new barber
export const handleChangesAddBarber = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setAddBarberNameInput(value))
    }
  }
}

const setAddBarberNameInput = (data) => {
  return {
    type: 'SET_ADD_BARBER_NAME_INPUT',
    payload: data
  }
}

export const setAddBarberNameInputError = (data) => {
  return {
    type: 'SET_ADD_BARBER_NAME_INPUT_ERROR',
    payload: data
  }
}


// To validate and update staff data to firestore including staff schedule and staff services
export const addNewStaffAndOtherData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { barbers, newBarberName, branchId, services } = data
    let lowercasedName = newBarberName.toLowerCase()
    
    // Input Validation: Error
    if (newBarberName.length <= 0 && barbers.length < 5) {
      dispatch(setAddBarberNameInputError(emptyError))
    }
    
    if (newBarberName.length > 0 && barbers.length >= 5) {
      dispatch(setAddBarberNameInputError(maxStaffError))
    }

    if (newBarberName.length <= 0 && barbers.length >= 5) {
      dispatch(setAddBarberNameInputError(`${emptyError} ${maxStaffError}`))
    }
    
    // Input Validation: OK
    if (newBarberName.length > 0 && barbers.length < 5) {
      dispatch(setAddBarberNameInputError(false))
    }
    
    if (newBarberName.length > 0 && barbers.length < 5) {
      dispatch(setStaffLoadingStatus(true))

      let newBarber = {
        branchId,
        description: '',
        disableStatus: true,
        job: 'barber',
        name: lowercasedName,
        picture: '',
        storageFileName: '',
      }

      let firestore = getFirestore()
      let uid = `${branchId}-${barbers.length}`
      let staffRef = firestore.collection('staff').doc(uid)

      staffRef
      .set(newBarber)
      .then(async () => {
        // create staff schedule and staff service
        let staffScheduleDispatchStatus = await dispatch(addNewStaffSchedulesData(uid, branchId))
        let staffServiceDispatchStatus = await dispatch(addNewStaffServicesData(uid, branchId, services))
        // success condition
        if (staffScheduleDispatchStatus && staffServiceDispatchStatus) {
          dispatch(setStaffLoadingStatus(false))
          swal("New Provider Added", "", "success")
          dispatch(setAddBarberNameInput(""))
        }
      })
      .catch(err => {
        console.log('ERROR: add new staff', err)
      })
    }
  }
}


// To clear add new barber input and input error when click modal close
export const clearAddBarberData = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setAddBarberNameInputError(false))
    dispatch(setAddBarberNameInput(""))
  } 
}

