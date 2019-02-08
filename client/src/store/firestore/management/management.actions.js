import {
  setAuthLoginError,
  setAuthLoadingStatus,
  loginError
} from '../auth/auth.actions';
import {
  setNewCookies
} from '../../../helpers/auth';

export const setCookies = (cookiesFunction) => {
  return {
    type: 'SET_COOKIES_FUNCTION',
    payload: cookiesFunction
  }
}

export const setWindow = (windowFunction) => {
  return {
    type: 'SET_WINDOW_FUNCTION',
    payload: windowFunction
  }
}

// To get data and create cookies after login
export const afterLoginValidation = (uid, email, window, cookies) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let managementRef = firestore.collection('management').doc(uid)

    managementRef.get()
    .then(doc => {
      if (doc.exists) {
        let id = doc.id
        let { name, job, picture, shopId, branchId, disableStatus } = doc.data()
        let managementData = {
          id, name, job, picture, shopId, branchId, disableStatus, email
        }
        dispatch(setAuthLoginError(''))
        setNewCookies(cookies, managementData)
        window.location.assign('/dashboard')
      } else {
        dispatch(setAuthLoginError(loginError))
        dispatch(setAuthLoadingStatus(false))
      }
    })
    .catch(err => {
      console.log('ERROR: shop login', err)
    })
  }
}
