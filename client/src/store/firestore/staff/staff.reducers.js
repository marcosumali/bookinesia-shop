let initialState = {
  barbers: [],
  barbersExists: true,
  barbersLoading: true,
  allBarbers: [],
  allBarbersExists: true,
  allBarbersLoading: true,
  selectedBarber: '',
  barberName: '',
  barberNameError: false,
  barberDisableStatus: false,
  fileError: false,
  addBarberName: '',
  addBarberNameError:  false,
  loadingStatus: false,
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
    case 'SET_ALL_BARBERS_SUCCESS':
      return ({
        ...state,
        allBarbers: action.payload,
        allBarbersLoading: false,
      })
    case 'SET_ALL_BARBERS_FAILED':
      return ({
        ...state,
        allBarbersExists: action.payload,
      })
    case 'SET_SELECTED_BARBER':
      return ({
        ...state,
        selectedBarber: action.payload,
      })
    case 'SET_BARBER_NAME_INPUT':
      return ({
        ...state,
        barberName: action.payload,
      })
    case 'SET_BARBER_NAME_INPUT_ERROR':
      return ({
        ...state,
        barberNameError: action.payload,
      })
    case 'SET_BARBER_DISABLE_STATUS_INPUT':
      return ({
        ...state,
        barberDisableStatus: action.payload,
      })
    case 'SET_FILE_ERROR':
      return ({
        ...state,
        fileError: action.payload,
      })
    case 'SET_ADD_BARBER_NAME_INPUT':
      return ({
        ...state,
        addBarberName: action.payload,
      })
    case 'SET_ADD_BARBER_NAME_INPUT_ERROR':
      return ({
        ...state,
        addBarberNameError: action.payload,
      })
    case 'SET_STAFF_DETAILS_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload,
      })
    default:
      return state;
  }
}

export default staffDataList;