let initialState = {
  transactions: [],
  transactionsExist: true,
  transactionsLoading: true,
  dashboards: [],
  dashboardsExists: true,
  dashboardsLoading: true,
  paymentMethod: 'Cash',
  showPaymentMethodStatus: false,
  addName: '',
  addNameError: false,
  addPhone: '',
  addPhoneError: false,
  addEmail: '',
  addEmailError: false,
  selectedPrimaryService: '',
  selectedSecondaryServices: [],
  transactionErrors: [],
  loadingStatus: false,
}

const transactionDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_DASHBOARD_SUCCESS':
      return ({
        ...state,
        dashboards: action.payload,
        dashboardsLoading: false,
      })
    case 'SET_TRANSACTIONS_SUCCESS':
      return ({
        ...state,
        transactions: action.payload,
        transactionsLoading: false,
      })
    case 'SET_TRANSACTIONS_FAILED':
      return ({
        ...state,
        transactionsExist: action.payload,
      })
    case 'SET_PAYMENT_METHOD':
      return ({
        ...state,
        paymentMethod: action.payload,
      })
    case 'SET_SHOW_PAYMENT_METHOD_STATUS':
      return ({
        ...state,
        showPaymentMethodStatus: action.payload,
      })
    case 'SET_ADD_TRANSACTION_NAME_INPUT':
      return ({
        ...state,
        addName: action.payload,
      })
    case 'SET_ADD_TRANSACTION_NAME_INPUT_ERROR':
      return ({
        ...state,
        addNameError: action.payload,
      })
    case 'SET_ADD_TRANSACTION_EMAIL_INPUT':
      return ({
        ...state,
        addEmail: action.payload,
      })
    case 'SET_ADD_TRANSACTION_EMAIL_INPUT_ERROR':
      return ({
        ...state,
        addEmailError: action.payload,
      })
    case 'SET_ADD_TRANSACTION_PHONE_INPUT':
      return ({
        ...state,
        addPhone: action.payload,
      })
    case 'SET_ADD_TRANSACTION_PHONE_INPUT_ERROR':
      return ({
        ...state,
        addPhoneError: action.payload,
      })
    case 'SET_SELECTED_PRIMARY_SERVICE':
      return ({
        ...state,
        selectedPrimaryService: action.payload,
      })
    case 'SET_SELECTED_SECONDARY_SERVICES':
      return ({
        ...state,
        selectedSecondaryServices: action.payload,
      })
    case 'SET_TRANSACTION_ERRORS':
      return ({
        ...state,
        transactionErrors: action.payload,
      })
    case 'SET_TRANSACTION_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload,
      })
    default:
      return state;
  }
}

export default transactionDataList;