let initialState = {
  services: [],
  servicesExists: true,
  servicesLoading: true,
}

const serviceDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_SERVICES_SUCCESS':
      return ({
        ...state,
        services: action.payload,
        servicesLoading: false,
      })
    case 'SET_SERVICES_FAILED':
      return ({
        ...state,
        servicesExists: action.payload,
      })
    default:
      return state;
  }
}

export default serviceDataList;