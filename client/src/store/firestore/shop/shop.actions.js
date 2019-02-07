import swal from 'sweetalert';

import { emptyError  } from '../transaction/transaction.actions';
import { maxFileSizeError, setSingleFileInputError, imageFileTypeError, setHasEditStatusFile } from '../../dashboard/dashboard.actions';

// Get shop data
export const getShop = (shopId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let shopRef = firestore.collection('shop').doc(shopId)
    
    shopRef
    .onSnapshot(function (doc) {
      if (doc.exists) {
        let data = doc.data()
        let id = doc.id
        data['id'] = id
        dispatch(setShopAction(data))
        dispatch(setShopNameInput(data.name))
      } 
    })
  }
}

const setShopAction = (data) => {
  return {
    type: 'SET_SHOP_SUCCESS',
    payload: data
  }
}

export const setShopNameInput = (data) => {
  return {
    type: 'SET_SHOP_NAME_INPUT',
    payload: data
  }
}

export const setShopNameInputError = (data) => {
  return {
    type: 'SET_SHOP_NAME_INPUT_ERROR',
    payload: data
  }
}


// To handle changes in input from shop manage
export const handleChangesManageShop = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'name') {
      dispatch(setShopNameInput(value))
    }
  }
}

// To validate and update shop data
export const validateAndUpdateShop = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { shop, shopNameInput, file } = data
    let lowercasedName = shopNameInput.toLowerCase()
    let maxFileSize = 1 * 1024 * 1024 
    let firestore = getFirestore()
    let firebase = getFirebase()
    let shopRef = firestore.collection('shop').doc(shop.id)
    
    // Validation wrong
    if (shopNameInput.length <= 0) {
      dispatch(setShopNameInputError(emptyError))
    }

    if (file.type) {
      let error = ''
      if (file.size > maxFileSize) {
        error = error + maxFileSizeError
      }
  
      if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png') {
        error = error + imageFileTypeError
      }
      dispatch(setSingleFileInputError(error))
    }

    // Validation OK
    if (shopNameInput.length > 0) {
      dispatch(setShopNameInputError(false))
    }

    if (file.type) {
      if (file.size <= maxFileSize && (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png')) {
        dispatch(setSingleFileInputError(false))
      }
    }

    if (file.type) { 
      if (shopNameInput.length > 0 && file.size <= maxFileSize && (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png')) {
        swal({
          title: 'Are you sure?',
          text: `Shop's information will be updated with the new input.`,
          icon: 'warning',
          buttons: ['Cancel', 'OK']
        })
        .then(result => {
          if (result) {
            dispatch(setShopLoadingStatus(true))
            let storageShopLogoRefToUpdate = firebase.storage().ref(`shop/${shop.id}/${file.name}`)
            let storageShopLogoRefToDelete = firebase.storage().ref(`shop/${shop.id}/${shop.storageFileName}`)
  
            storageShopLogoRefToDelete
            .delete()
            .then(function() {
              storageShopLogoRefToUpdate
              .put(file)
              .then(function(snapshot) {
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  shopRef.update({
                    name: lowercasedName,
                    storageFileName: file.name,
                    logo: downloadURL
                  })
                  .then(() => {
                    dispatch(setHasEditStatusFile(false))
                    dispatch(setShopLoadingStatus(false))
                    swal("Information Updated", "", "success")
                  })
                  .catch(err => {
                    console.log('ERROR: update shop data with file', err)
                  })    
                })
              })
              .catch(err => {
                console.log('ERROR: update shop logo file', err)
              })
            }).catch(function(err) {
              console.log('ERROR: delete file shop logo', err)
            })
          }
        })
      }
    } else {
      if (shopNameInput.length > 0) {
        swal({
          title: 'Are you sure?',
          text: `Shop's information will be updated with the new input.`,
          icon: 'warning',
          buttons: ['Cancel', 'OK']
        })
        .then(result => {
          if (result) {
            dispatch(setShopLoadingStatus(true))
            shopRef.update({
              name: lowercasedName
            })
            .then(() => {
              dispatch(setShopLoadingStatus(false))
              swal("Information Updated", "", "success")
            })
            .catch(err => {
              console.log('ERROR: update shop data no file', err)
            })    
          }
        })
      }
    }
  }
}

export const setShopLoadingStatus = (data) => {
  return {
    type: 'SET_SHOP_LOADING_STATUS',
    payload: data
  }
}