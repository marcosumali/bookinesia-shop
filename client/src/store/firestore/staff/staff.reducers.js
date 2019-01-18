let initialState = {
  barbers: [],
  barbersExists: true,
  barbersLoading: true
}

const staffDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_BARBERS_SUCCESS':
      return ({
        ...state,
        barbers: action.payload,
        barbersLoading: false,
      })
    case 'SET_BARBERS_FAILED':
      return ({
        ...state,
        barbersExists: action.payload,
      })
    default:
      return state;
  }
}

export default staffDataList;