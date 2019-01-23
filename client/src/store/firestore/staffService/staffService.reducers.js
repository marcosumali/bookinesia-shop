let initialState = {
  staffServices: [],
  staffServicesExists: true,
  staffServicesLoading: true,
  selectedStaffServices: [],
  selectedStaffServicesInput: [],
}

const staffServiceDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_STAFF_SERVICES_SUCCESS':
      return ({
        ...state,
        staffServices: action.payload,
        staffServicesLoading: false,
      })
    case 'SET_STAFF_SERVICES_FAILED':
      return ({
        ...state,
        staffServicesExists: action.payload,
      })
    case 'SET_SELECTED_STAFF_SERVICES':
      return ({
        ...state,
        selectedStaffServices: action.payload,
      })
    case 'SET_SELECTED_STAFF_SERVICES_INPUT':
      return ({
        ...state,
        selectedStaffServicesInput: action.payload,
      })
    default:
      return state;
  }
}

export default staffServiceDataList;