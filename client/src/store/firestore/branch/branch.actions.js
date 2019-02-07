import swal from 'sweetalert';

import { maxFileSizeError, imageFileTypeError } from '../../dashboard/dashboard.actions';
import { emptyError, phoneMinError } from '../transaction/transaction.actions';

// Get branch data
export const getBranch = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let branchRef = firestore.collection('branch').doc(branchId)

    branchRef
    .onSnapshot(function (doc) {
      if (doc.exists) {
        let data = doc.data()
        let id = doc.id
        data['id'] = id
        dispatch(getBranchAction(data))
        dispatch(setBranchInfo(data))
      }
    })
  }
}

const getBranchAction = (data) => {
  return {
    type: 'SET_BRANCH_SUCCESS',
    payload: data
  }
}

export const setBranchInfo = (branch) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setBranchNameInput(branch.name))
    dispatch(setBranchAddressInput(branch.address))
    dispatch(setBranchPhoneInput(branch.phone))
    dispatch(setBranchTimezoneInput(branch.timezone))
  }
}

const setBranchNameInput = (data) => {
  return {
    type: 'SET_BRANCH_NAME_INPUT',
    payload: data
  }
}

export const setBranchNameInputError = (data) => {
  return {
    type: 'SET_BRANCH_NAME_INPUT_ERROR',
    payload: data
  }
}

const setBranchPhoneInput = (data) => {
  return {
    type: 'SET_BRANCH_PHONE_INPUT',
    payload: data
  }
}

export const setBranchPhoneInputError = (data) => {
  return {
    type: 'SET_BRANCH_PHONE_INPUT_ERROR',
    payload: data
  }
}

const setBranchAddressInput = (data) => {
  return {
    type: 'SET_BRANCH_ADDRESS_INPUT',
    payload: data
  }
}

export const setBranchAddressInputError = (data) => {
  return {
    type: 'SET_BRANCH_ADDRESS_INPUT_ERROR',
    payload: data
  }
}

export const setBranchTimezoneInput = (data) => {
  return {
    type: 'SET_BRANCH_TIMEZONE_INPUT',
    payload: data
  }
}

// To handle changes in input from shop manage
export const handleChangesManageBranch = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setBranchNameInput(value))
    } else if (inputId === 'address') {
      dispatch(setBranchAddressInput(value))
    } else if (inputId === 'phone') {
      dispatch(setBranchPhoneInput(value))
    }
  }
}

// To validate and update branch data
export const validateAndUpdateBranch = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { branch, branchNameInput, branchAddressInput, branchPhoneInput, branchTimezoneInput, file } = data
    let lowercasedName = branchNameInput.toLowerCase()
    let maxFileSize = 1 * 1024 * 1024 
    let firestore = getFirestore()
    let firebase = getFirebase()
    let branchRef = firestore.collection('branch').doc(branch.id)
    
    // Validation wrong
    if (branchNameInput.length <= 0) {
      dispatch(setBranchNameInputError(emptyError))
    }

    if (branchAddressInput.length <= 0) {
      dispatch(setBranchAddressInputError(emptyError))
    }

    if (branchPhoneInput.length <= 0) {
      dispatch(setBranchPhoneInputError(emptyError))
    } 

    if (branchPhoneInput.length > 0 && branchPhoneInput.length < 8) {
      dispatch(setBranchPhoneInputError(phoneMinError))
    }

    if (file.type) {
      let error = ''
      if (file.size > maxFileSize) {
        error = error + maxFileSizeError
      }
  
      if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png') {
        error = error + imageFileTypeError
      }
      dispatch(setSingleFileInputBranchError(error))
    }

    // Validation OK
    if (branchNameInput.length > 0) {
      dispatch(setBranchNameInputError(false))
    }

    if (branchAddressInput.length > 0) {
      dispatch(setBranchAddressInputError(false))
    }

    if (branchPhoneInput.length >= 8) {
      dispatch(setBranchPhoneInputError(false))
    }

    if (file.type) {
      if (file.size <= maxFileSize && (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png')) {
        dispatch(setSingleFileInputBranchError(false))
      }
    }

    if (file.type) { 
      if (branchNameInput.length > 0 && branchAddressInput.length > 0 && branchPhoneInput.length >= 8 && file.size <= maxFileSize && (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png')) {
        swal({
          title: 'Are you sure?',
          text: `Branch's information will be updated with the new input.`,
          icon: 'warning',
          buttons: ['Cancel', 'OK']
        })
        .then(result => {
          if (result) {
            dispatch(setBranchLoadingStatus(true))
            let storageBranchPictureRefToUpdate = firebase.storage().ref(`branch/${branch.id}/${file.name}`)
            let storageBranchPictureRefToDelete = firebase.storage().ref(`branch/${branch.id}/${branch.storageFileName}`)
  
            storageBranchPictureRefToDelete
            .delete()
            .then(function() {
              storageBranchPictureRefToUpdate
              .put(file)
              .then(function(snapshot) {
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  branchRef.update({
                    name: lowercasedName,
                    address: branchAddressInput,
                    phone: branchPhoneInput,
                    timezone: branchTimezoneInput,
                    storageFileName: file.name,
                    picture: downloadURL
                  })
                  .then(() => {
                    dispatch(setHasEditStatusFileBranch(false))
                    dispatch(setBranchLoadingStatus(false))
                    swal("Information Updated", "", "success")
                  })
                  .catch(err => {
                    console.log('ERROR: update branch data with file', err)
                  })    
                })
              })
              .catch(err => {
                console.log('ERROR: update branch picture file', err)
              })
            }).catch(function(err) {
              console.log('ERROR: delete file branch picture', err)
            })
          }
        })
      }
    } else {
      if (branchNameInput.length > 0 && branchAddressInput.length > 0 && branchPhoneInput.length >= 8) {
        swal({
          title: 'Are you sure?',
          text: `Branch's information will be updated with the new input.`,
          icon: 'warning',
          buttons: ['Cancel', 'OK']
        })
        .then(result => {
          if (result) {
            dispatch(setBranchLoadingStatus(true))
            branchRef.update({
              name: lowercasedName,
              address: branchAddressInput,
              phone: branchPhoneInput,
              timezone: branchTimezoneInput,
            })
            .then(() => {
              dispatch(setBranchLoadingStatus(false))
              swal("Information Updated", "", "success")
            })
            .catch(err => {
              console.log('ERROR: update branch data no file', err)
            })    
          }
        })
      }
    }
  }
}

export const setBranchLoadingStatus = (data) => {
  return {
    type: 'SET_BRANCH_LOADING_STATUS',
    payload: data
  }
}

// To handle single file input to redux
export const handleSingleFileInputBranch = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let file = target.files[0]

    dispatch(setHasEditStatusFileBranch(true))
    dispatch(setSingleFileInputBranch(file))
  }
}

export const setSingleFileInputBranch = (data) => {
  return {
    type: 'SET_SINGLE_FILE_BRANCH_INPUT',
    payload: data
  }
}

export const setSingleFileInputBranchError = (data) => {
  return {
    type: 'SET_SINGLE_FILE_BRANCH_INPUT_ERROR',
    payload: data
  }
}


// To set has click input file button status
export const setHasEditStatusFileBranch = (clickStatus) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let status = ''

    if (clickStatus) {
      status = true
    } else {
      status = false
    }
    dispatch(setHasEditStatusFileBranchAction(status))
  }
}


const setHasEditStatusFileBranchAction = (data) => {
  return {
    type: 'SET_HAS_EDIT_STATUS_FILE_BRANCH',
    payload: data
  }
}