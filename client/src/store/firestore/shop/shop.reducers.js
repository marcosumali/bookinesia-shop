let initialState = {
  shop: '',
  shopLoading: true,
  shopExists: true,
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
    default:
      return state;
  }
}

export default shopDataList;