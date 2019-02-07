let initialState = {
  shop: '',
  shopLoading: true,
  shopExists: true,
  shopNameInput: '',
  shopNameInputError: false,
  loadingStatus: false,
}

const shopDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
  case 'SET_SHOP_SUCCESS':
    return ({
      ...state,
      shop: action.payload,
      shopLoading: false,
    })
  case 'SET_SHOP_FAILED':
    return ({
      ...state,
      shopExists: action.payload,
    })
  case 'SET_SHOP_NAME_INPUT':
    return ({
      ...state,
      shopNameInput: action.payload,
    })
  case 'SET_SHOP_NAME_INPUT_ERROR':
    return ({
      ...state,
      shopNameInputError: action.payload,
    })
  case 'SET_SHOP_LOADING_STATUS':
    return ({
      ...state,
      loadingStatus: action.payload,
    })
  default:
    return state;
  }
}

export default shopDataList;