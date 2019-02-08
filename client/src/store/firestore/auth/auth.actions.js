import {
  afterLoginValidation,
} from '../management/management.actions';
import { getAllStaffsAndCalendar } from '../staff/staff.actions';
import { getAllServices } from '../service/service.actions';
import { getStaffServices } from '../staffService/staffService.actions';
import { getStaffSchedules } from '../staffSchedule/staffSchedule.actions';
import { getShop } from '../shop/shop.actions';
import { getBranch } from '../branch/branch.actions';
import {
  getCookies,
  verifyCookies
} from '../../../helpers/auth';

export const loginError = 'The email or password you entered is incorrect. Please try again.'
const loginDisableError = `Your account has been disabled. We're sorry for the inconvenience.`
const tooManyRequestError = 'Too many unsuccessful authentication attempts. Try again later.'
// const oldPasswordError = 'The old password you entered is incorrect.'
// const samePasswordError = `The new password can't be the same with your old password.`
// const notSameNewPasswordError = 'Your new password and its confirmation do not match.'

export const authSignIn = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let { email, password, window, cookies } = data
    let firebase = getFirebase()

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      let uid = response.user.uid
      let email = response.user.email
      dispatch(setAuthLoadingStatus(true))
      dispatch(afterLoginValidation(uid, email, window, cookies))
    })
    .catch(err => {
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
      console.log('check BSID', purpose, '===', userData)
      if (purpose === 'handleAuth') {
        dispatch(setAuthenticationStatus(true))
        dispatch(setUser(userData))
        if (userData.job === 'owner' || userData.job === 'ownerRepresentative') {
          dispatch(setOwnerStatus(true))
        } else if (userData.job === 'admin') {
          dispatch(setAdminStatus(true))
        }
      } else if (purpose === 'getData') {
        let inputDate = new Date(Date.now())
        let year = inputDate.getFullYear()
        let month = inputDate.getMonth() + 1
        let date = inputDate.getDate()
        let acceptedDate = `${year}-${month}-${date}`
        let shopId = userData.shopId
        let branchId = userData.branchId
        dispatch(getShop(shopId))
        dispatch(getBranch(branchId))
        dispatch(getAllStaffsAndCalendar(branchId, acceptedDate))
        dispatch(getAllServices(branchId))
        dispatch(getStaffServices(branchId))
        dispatch(getStaffSchedules(branchId))
      }
    } else {
      dispatch(setAuthenticationStatus(false))
      dispatch(setIsAuthenticationStatus(false))
      dispatch(setAdminStatus(false))
      dispatch(setOwnerStatus(false))
    }
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