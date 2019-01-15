let initialState = {
  cookies: '',
}

const authDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_COOKIES_FUNCTION':
      return ({
        ...state,
        cookies: action.payload,
      })
    default:
      return state;
  }
}

export default authDataList;