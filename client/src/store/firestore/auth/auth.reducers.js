let initialState = {
  email: '',
  emailError: false,
  password: '',
  passwordError: false,
  loginError: '',
  loadingStatus: false,
  authenticationStatus: false,
  isAuthenticated: true,
  isAdmin: false,
  isOwner: false,
  user: '',
  onlineStatus: '',
  oldPassword: '',
  oldPasswordError: false,
  newPassword: '',
  newPasswordError: false,
  newPasswordConfirm: '',
  newPasswordConfirmError: false,
  passwordChangeErrors: [],
}

const authDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_AUTH_EMAIL':
      return ({
        ...state,
        email: action.payload,
      })
    case 'SET_AUTH_EMAIL_ERROR':
      return ({
        ...state,
        emailError: action.payload,
      })
    case 'SET_AUTH_PASSWORD':
      return ({
        ...state,
        password: action.payload,
      })
    case 'SET_AUTH_PASSWORD_ERROR':
      return ({
        ...state,
        passwordError: action.payload,
      })
    case 'SET_AUTH_LOGIN_ERROR':
      return ({
        ...state,
        loginError: action.payload,
      })
    case 'SET_AUTH_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload,
      })
    case 'SET_AUTHENTICATION_STATUS':
      return ({
        ...state,
        authenticationStatus: action.payload,
      })
    case 'SET_IS_AUTHENTICATION_STATUS':
      return ({
        ...state,
        isAuthenticated: action.payload,
      })
    case 'SET_ADMIN_AUTHORISATION':
      return ({
        ...state,
        isAdmin: action.payload,
      })
    case 'SET_OWNER_AUTHORISATION':
      return ({
        ...state,
        isOwner: action.payload,
      })
    case 'SET_USER':
      return ({
        ...state,
        user: action.payload,
      })
    case 'SET_ONLINE_STATUS':
      return ({
        ...state,
        onlineStatus: action.payload,
      })
    case 'SET_PASSWORD_OLD':
      return ({
        ...state,
        oldPassword: action.payload,
      })
    case 'SET_PASSWORD_NEW':
      return ({
        ...state,
        newPassword: action.payload,
      })
    case 'SET_PASSWORD_NEW_CONFIRMATION':
      return ({
        ...state,
        newPasswordConfirm: action.payload,
      })
    case 'SET_PASSWORD_OLD_ERROR':
      return ({
        ...state,
        oldPasswordError: action.payload,
      })
    case 'SET_PASSWORD_NEW_ERROR':
      return ({
        ...state,
        newPasswordError: action.payload,
      })
    case 'SET_PASSWORD_NEW_CONFIRMATION_ERROR':
      return ({
        ...state,
        newPasswordConfirmError: action.payload,
      })
    case 'SET_PASSWORD_CHANGE_ERROR':
      return ({
        ...state,
        passwordChangeErrors: action.payload,
      })
    default:
      return state;
  }
}

export default authDataList;