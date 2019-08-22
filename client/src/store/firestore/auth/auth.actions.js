import swal from 'sweetalert';
import { afterLoginValidation } from '../management/management.actions';
import { getAllStaffsAndCalendar } from '../staff/staff.actions';
import { getAllServices } from '../service/service.actions';
import { getStaffServices } from '../staffService/staffService.actions';
import { getStaffSchedules } from '../staffSchedule/staffSchedule.actions';
import { getShop } from '../shop/shop.actions';
import { getBranch } from '../branch/branch.actions';
import { getBranchAccess } from '../branchAccess/branchAccess.actions';
import { getBranchSchedules } from '../branchSchedule/branchSchedule.actions';
import {
  getCookies,
  verifyCookies,
  removeCookies
} from '../../../helpers/auth';
import { emptyError } from '../transaction/transaction.actions';

export const loginError = 'The email or password you entered is incorrect. Please try again.'
export const passwordMinError = 'Password is too short, min. 8 characters.'
const loginDisableError = `Your account has been disabled. We're sorry for the inconvenience.`
const tooManyRequestError = 'Too many unsuccessful authentication attempts. Try again later.'
const oldPasswordError = 'The old password you entered is incorrect.'
const samePasswordError = `The new password can't be the same with your old password.`
const notSameNewPasswordError = 'Your new password and its confirmation do not match.'

export const authSignIn = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { email, password, window, cookies } = data
    let firebase = getFirebase()
    dispatch(setAuthLoadingStatus(true))

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      let uid = response.user.uid
      let email = response.user.email
      dispatch(afterLoginValidation(uid, email, window, cookies))
    })
    .catch(err => {
      dispatch(setAuthLoadingStatus(false))
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
        dispatch(setAuthLoginError(loginError))
      } else if (err.code === 'auth/user-disabled') {
        dispatch(setAuthLoginError(loginDisableError))
      } else if (err.code === 'auth/too-many-requests') {
        dispatch(setAuthLoginError(tooManyRequestError))
      }
    })
  }
}

export const handleChangesLogin = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'email') {
      dispatch(setEmailLoginInput(value))
    } else if (inputId === 'password') {
      dispatch(setPasswordLoginInput(value))
    }
  }
}

const setEmailLoginInput = (data) => {
  return {
    type: 'SET_AUTH_EMAIL',
    payload: data
  }
}

const setPasswordLoginInput = (data) => {
  return {
    type: 'SET_AUTH_PASSWORD',
    payload: data
  }
}

export const setAuthLoginError = (data) => {
  return {
    type: 'SET_AUTH_LOGIN_ERROR',
    payload: data
  }
}

export const setAuthLoadingStatus = (data) => {
  return {
    type: 'SET_AUTH_LOADING_STATUS',
    payload: data
  }
}


// To verify token during component rendering
export const handleCookies = (purpose, cookies) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let BSID = getCookies(cookies)
    if (BSID) {
      let userData = verifyCookies(BSID)
      // console.log('check BSID', purpose, '===', userData)
      if (purpose === 'handleAuth') {
        dispatch(setAuthenticationStatus(true))
        dispatch(setUser(userData))
        if (userData.job === 'owner' || userData.job === 'ownerRepresentative') {
          dispatch(setOwnerStatus(true))
        } else if (userData.job === 'admin') {
          dispatch(setAdminStatus(true))
        }
      } else if (purpose === 'getData') {
        let shopId = userData.shopId
        dispatch(getShop(shopId))
        dispatch(getBranchAccess(userData.id, cookies))
      }
    } else {
      dispatch(setAuthenticationStatus(false))
      dispatch(setIsAuthenticationStatus(false))
      dispatch(setAdminStatus(false))
      dispatch(setOwnerStatus(false))
    }
  }
}

// To get all operation branches data
export const getOperationalDataNow = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let inputDate = new Date(Date.now())
    let year = inputDate.getFullYear()
    let month = inputDate.getMonth() + 1
    let date = inputDate.getDate()
    let acceptedDate = `${year}-${month}-${date}`

    dispatch(getBranch(branchId))
    dispatch(getAllStaffsAndCalendar(branchId, acceptedDate))
    dispatch(getAllServices(branchId))
    dispatch(getStaffServices(branchId))
    dispatch(getStaffSchedules(branchId))
    dispatch(getBranchSchedules(branchId))
  }
}

const setAuthenticationStatus = (data) => {
  return {
    type: 'SET_AUTHENTICATION_STATUS',
    payload: data
  }
}

const setIsAuthenticationStatus = (data) => {
  return {
    type: 'SET_IS_AUTHENTICATION_STATUS',
    payload: data
  }
}

const setAdminStatus = (data) => {
  return {
    type: 'SET_ADMIN_AUTHORISATION',
    payload: data
  }
}

const setOwnerStatus = (data) => {
  return {
    type: 'SET_OWNER_AUTHORISATION',
    payload: data
  }
}

const setUser = (data) => {
  return {
    type: 'SET_USER',
    payload: data
  }
}

export const authSignOut = (cookies, window) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase()
    firebase.auth().signOut().then(function() {
      removeCookies(cookies)
      window.location.assign('/signin')
    }).catch(function(err) {
      console.log('ERROR: sign out', err)
    })
  }
}

export const setOnlineStatus = (status) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(setOnlineStatusAction(status))
  }
}

const setOnlineStatusAction = (data) => {
  return {
    type: 'SET_ONLINE_STATUS',
    payload: data
  }
}

export const handleChangesPassword = (e) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let target = e.target
    let inputId = target.id
    let value = target.value

    if (inputId === 'oldPassword') {
      dispatch(setOldPassword(value))
    } else if (inputId === 'newPassword') {
      dispatch(setNewPassword(value))
    } else if (inputId === 'newPasswordConfirm') {
      dispatch(setNewPasswordConfirm(value))
    }
  }
}

const setOldPassword = (data) => {
  return {
    type: 'SET_PASSWORD_OLD',
    payload: data
  }
}

const setNewPassword = (data) => {
  return {
    type: 'SET_PASSWORD_NEW',
    payload: data
  }
}

const setNewPasswordConfirm = (data) => {
  return {
    type: 'SET_PASSWORD_NEW_CONFIRMATION',
    payload: data
  }
}

const setOldPasswordError = (data) => {
  return {
    type: 'SET_PASSWORD_OLD_ERROR',
    payload: data
  }
}

const setNewPasswordError = (data) => {
  return {
    type: 'SET_PASSWORD_NEW_ERROR',
    payload: data
  }
}

const setNewPasswordConfirmError = (data) => {
  return {
    type: 'SET_PASSWORD_NEW_CONFIRMATION_ERROR',
    payload: data
  }
}

// To validate user's input form of inputting information when changing passwords
export const authChangePasswordValidation = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let { oldPassword, newPassword, newPasswordConfirm, user } = data

    // To set loading status as true
    await dispatch(setAuthLoadingStatus(true))

    // Input is ERROR
    if (oldPassword.length <= 0) {
      await dispatch(setOldPasswordError(emptyError))
    } 
    
    if (oldPassword.length > 0 && oldPassword.length < 8) {
      await dispatch(setOldPasswordError(passwordMinError))
    }

    if (newPassword.length <= 0) {
      await dispatch(setNewPasswordError(emptyError))
    } 
    
    if (newPassword.length > 0 && newPassword.length < 8) {
      await dispatch(setNewPasswordError(passwordMinError))
    }

    if (newPasswordConfirm.length <= 0) {
      await dispatch(setNewPasswordConfirmError(emptyError))
    } 
    
    if (newPasswordConfirm.length > 0 && newPasswordConfirm.length < 8) {
      await dispatch(setNewPasswordConfirmError(passwordMinError))
    }


    // Input is OK
    if (oldPassword.length >= 8) {
      await dispatch(setOldPasswordError(false))
    }

    if (newPassword.length >= 8) {
      await dispatch(setNewPasswordError(false))
    }

    if (newPasswordConfirm.length >= 8) {
      await dispatch(setNewPasswordConfirmError(false))
    }
    
    if (oldPassword.length >= 8 && newPassword.length >= 8 && newPasswordConfirm.length >= 8) {
      // console.log('pass through')

      let inputErrors = []
      // Combination Error
      let passwordStatus = await dispatch(authPasswordValidation(user, oldPassword))
      if (passwordStatus === false) {
        inputErrors.push(oldPasswordError)
      }

      if (oldPassword === newPassword) {
        inputErrors.push(samePasswordError)
      }
      
      if (newPassword !== newPasswordConfirm) {
        inputErrors.push(notSameNewPasswordError)
      }

      if (passwordStatus === 'too-many-requests') {
        inputErrors = []
        inputErrors.push(tooManyRequestError)
      }

      await dispatch(setPasswordChangeErrors(inputErrors))

      // Combination OK
      if (oldPassword !== newPassword && newPassword === newPasswordConfirm && passwordStatus) {
        dispatch(authUpdatePassword(user, oldPassword, newPassword))
      } else {
        dispatch(setAuthLoadingStatus(false))
      }
    } else {
      dispatch(setAuthLoadingStatus(false))
    }
  }
}

const setPasswordChangeErrors = (data) => {
  return {
    type: 'SET_PASSWORD_CHANGE_ERROR',
    payload: data
  }
}

export const authPasswordValidation = (user, password) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let email = user.email
    let validateResult = 'none'

    let firebase = getFirebase()
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      validateResult = true
    })
    .catch(err => {
      if (err.code === 'auth/too-many-requests') {
        validateResult = 'too-many-requests'
      } else {
        validateResult = false
      }
    })

    return validateResult
  }  
}

export const authUpdatePassword = (userData, oldPassword, newPassword) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firebase = getFirebase()

    let user = firebase.auth().currentUser
    let email = userData.email
    let credential = firebase.auth.EmailAuthProvider.credential(
      email, 
      oldPassword
    )

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
      user.updatePassword(newPassword).then(function() {
        dispatch(setAuthLoadingStatus(false))
        dispatch(setOldPassword(''))
        dispatch(setNewPassword(''))
        dispatch(setNewPasswordConfirm(''))
        swal("Change Password Successful", "", "success")
      }).catch(function(err) {
        console.log('ERROR: update password', err)
      })
    }).catch(function(err) {
      console.log('ERROR: reauthenticate user', err)
    })
  }
}


// To clear auth input error when click modal close
export const clearAuthChangePassword = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let errors = []
    dispatch(setPasswordChangeErrors(errors))
    dispatch(setAuthLoadingStatus(false))
    dispatch(setOldPassword(''))
    dispatch(setNewPassword(''))
    dispatch(setNewPasswordConfirm(''))
    dispatch(setOldPasswordError(false))
    dispatch(setNewPasswordError(false))
    dispatch(setNewPasswordConfirmError(false))    
  } 
}