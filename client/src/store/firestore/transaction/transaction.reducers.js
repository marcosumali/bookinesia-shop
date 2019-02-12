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
  startDate: '',
  endDate: '',
  filterErrors: [],
  filteredTransactions: [],
  salesTransactions: [],
  reportHeaders: ['Transaction ID', 'Appointment Date', 'Provider Name', 'Service Name', 'Service Price', 'Customer Name', 'Customer Phone', 'Transaction Status', 'Payment Method'],
  editName: '',
  editNameError: false,
  editPhone: '',
  editPhoneError: false,
  editEmail: '',
  editEmailError: false,
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
    case 'SET_FILTER_TRANSACTION_START_DATE':
      return ({
        ...state,
        startDate: action.payload,
      })
    case 'SET_FILTER_TRANSACTION_END_DATE':
      return ({
        ...state,
        endDate: action.payload,
      })
    case 'SET_FILTER_TRANSACTION_ERRORS':
      return ({
        ...state,
        filterErrors: action.payload,
      })
    case 'SET_FILTER_TRANSACTIONS':
      return ({
        ...state,
        filteredTransactions: action.payload,
      })
    case 'SET_SALES_TRANSACTIONS':
      return ({
        ...state,
        salesTransactions: action.payload,
      })
    case 'SET_EDIT_TRANSACTION_NAME_INPUT':
      return ({
        ...state,
        editName: action.payload,
      })
    case 'SET_EDIT_TRANSACTION_NAME_INPUT_ERROR':
      return ({
        ...state,
        editNameError: action.payload,
      })
    case 'SET_EDIT_TRANSACTION_EMAIL_INPUT':
      return ({
        ...state,
        editEmail: action.payload,
      })
    case 'SET_EDIT_TRANSACTION_EMAIL_INPUT_ERROR':
      return ({
        ...state,
        editEmailError: action.payload,
      })
    case 'SET_EDIT_TRANSACTION_PHONE_INPUT':
      return ({
        ...state,
        editPhone: action.payload,
      })
    case 'SET_EDIT_TRANSACTION_PHONE_INPUT_ERROR':
      return ({
        ...state,
        editPhoneError: action.payload,
      })
    default:
      return state;
  }
}

export default transactionDataList;