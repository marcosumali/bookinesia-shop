let initialState = {
  cookies: '',
  window: '',
}

const managementDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_COOKIES_FUNCTION':
      return ({
        ...state,
        cookies: action.payload,
      })
    case 'SET_WINDOW_FUNCTION':
      return ({
        ...state,
        window: action.payload,
      })
    default:
      return state;
  }
}

export default managementDataList;