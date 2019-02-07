let initialState = {
  branch: '',
  branchLoading: '',
  branchExists: '',
  branchNameInput: '',
  branchNameInputError: false,
  branchAddressInput: '',
  branchAddressInputError: false,
  branchPhoneInput: '',
  branchPhoneInputError: false,
  branchTimezoneInput: '',
  timezones: [ 'WIB', 'WITA', 'WIT' ],
  loadingStatus: false,
  file: {},
  branchFileInputError: false,
  hasEditStatusFileBranch: false,
}

const branchDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
  case 'SET_BRANCH_SUCCESS':
    return ({
      ...state,
      branch: action.payload,
      branchLoading: false,
    })
  case 'SET_BRANCH_FAILED':
    return ({
      ...state,
      branchExists: action.payload,
    })
  case 'SET_BRANCH_NAME_INPUT':
    return ({
      ...state,
      branchNameInput: action.payload,
    })
  case 'SET_BRANCH_NAME_INPUT_ERROR':
    return ({
      ...state,
      branchNameInputError: action.payload,
    })
  case 'SET_BRANCH_ADDRESS_INPUT':
    return ({
      ...state,
      branchAddressInput: action.payload,
    })
  case 'SET_BRANCH_ADDRESS_INPUT_ERROR':
    return ({
      ...state,
      branchAddressInputError: action.payload,
    })
  case 'SET_BRANCH_PHONE_INPUT':
    return ({
      ...state,
      branchPhoneInput: action.payload,
    })
  case 'SET_BRANCH_PHONE_INPUT_ERROR':
    return ({
      ...state,
      branchPhoneInputError: action.payload,
    })
  case 'SET_BRANCH_TIMEZONE_INPUT':
    return ({
      ...state,
      branchTimezoneInput: action.payload,
    })
  case 'SET_BRANCH_LOADING_STATUS':
    return ({
      ...state,
      loadingStatus: action.payload,
    })
  case 'SET_SINGLE_FILE_BRANCH_INPUT':
    return ({
      ...state,
      file: action.payload,
    })
  case 'SET_SINGLE_FILE_BRANCH_INPUT_ERROR':
    return ({
      ...state,
      branchFileInputError: action.payload,
    })
  case 'SET_HAS_EDIT_STATUS_FILE_BRANCH':
    return ({
      ...state,
      hasEditStatusFileBranch: action.payload,
    })
  default:
    return state;
  }
}

export default branchDataList;