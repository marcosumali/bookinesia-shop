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
    default:
      return state;
  }
}

export default authDataList;