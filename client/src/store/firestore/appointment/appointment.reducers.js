let initialState = {
  dates: [],
  datesExist: true,
  datesLoading: true,
  datesIndex: 0,
  selectedDate: '',
}

const appointmentDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_APPOINTMENTS_DATE_SUCCESS':
      return ({
        ...state,
        dates: action.payload,
        datesLoading: false,
      })
    case 'SET_APPOINTMENTS_DATE_FAILED':
      return ({
        ...state,
        datesExist: action.payload,
      })
    case 'SET_APPOINTMENT_DATE_INDEX':
      return ({
        ...state,
        datesIndex: action.payload,
      })
    case 'SET_SELECTED_DATE':
      return ({
        ...state,
        selectedDate: action.payload,
      })
    default:
      return state;
  }
}

export default appointmentDataList;