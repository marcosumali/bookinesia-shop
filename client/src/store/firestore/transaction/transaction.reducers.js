let initialState = {
  transactions: [],
  transactionsExist: true,
  transactionsLoading: true,
  dashboards: [],
  dashboardsExists: true,
  dashboardsLoading: true,
  paymentMethod: 'Cash',
  showPaymentMethodStatus: false,
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
    default:
      return state;
  }
}

export default transactionDataList;