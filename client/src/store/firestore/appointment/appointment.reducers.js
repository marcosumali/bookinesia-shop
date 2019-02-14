let initialState = {
  dates: [],
  datesExist: true,
  datesLoading: true,
  datesIndex: 0,
  selectedDate: '',
  startDate: '',
  endDate: '',
  filterDateErrors: [],
  filteredAppointments: [],
  selectedAppointment: {},
  updateDateInput: '',
  updateMaxQueueInput: '',
  updateMaxQueueInputError: false,
  updateStartHours: '',
  updateStartMinutes: '',
  updateEndHours: '',
  updateEndMinutes: '',
  updateDisableStatus: '',
  loadingStatus: false,
  updateAppointmentErrors: [],
  addDateInput: '',
  addMaxQueueInput: '',
  addMaxQueueInputError: false,
  addStartHours: '',
  addStartMinutes: '',
  addEndHours: '',
  addEndMinutes: '',
  addAppointmentErrors: [],
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
    case 'SET_FILTER_START_DATE':
      return ({
        ...state,
       startDate: action.payload,
      })
    case 'SET_FILTER_END_DATE':
      return ({
        ...state,
       endDate: action.payload,
      })
    case 'SET_FILTER_ERROR':
      return ({
        ...state,
        filterDateErrors: action.payload,
      })
    case 'SET_FILTERED_APPOINTMENTS':
      return ({
        ...state,
        filteredAppointments: action.payload,
      })
    case 'SET_SELECTED_FILTERED_APPOINTMENT':
      return ({
        ...state,
        selectedAppointment: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_DATE_INPUT':
      return ({
        ...state,
        updateDateInput: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_MAX_QUEUE_INPUT':
      return ({
        ...state,
        updateMaxQueueInput: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_START_HOURS_INPUT':
      return ({
        ...state,
        updateStartHours: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_START_MINUTES_INPUT':
      return ({
        ...state,
        updateStartMinutes: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_END_HOURS_INPUT':
      return ({
        ...state,
        updateEndHours: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_END_MINUTES_INPUT':
      return ({
        ...state,
        updateEndMinutes: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_DISABLE_STATUS_INPUT':
      return ({
        ...state,
        updateDisableStatus: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_MAX_QUEUE_ERROR':
      return ({
        ...state,
        updateMaxQueueInputError: action.payload,
      })
    case 'SET_UPDATE_APPOINTMENT_ERROR':
      return ({
        ...state,
        updateAppointmentErrors: action.payload,
      })
    case 'SET_APPOINTMENT_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload,
      })
    case 'SET_ADD_APPOINTMENT_DATE_INPUT':
      return ({
        ...state,
        addDateInput: action.payload,
      })
    case 'SET_ADD_APPOINTMENT_MAX_QUEUE_INPUT':
      return ({
        ...state,
        addMaxQueueInput: action.payload,
      })
    case 'SET_ADD_APPOINTMENT_START_HOURS_INPUT':
      return ({
        ...state,
        addStartHours: action.payload,
      })
    case 'SET_ADD_APPOINTMENT_START_MINUTES_INPUT':
      return ({
        ...state,
        addStartMinutes: action.payload,
      })
    case 'SET_ADD_APPOINTMENT_END_HOURS_INPUT':
      return ({
        ...state,
        addEndHours: action.payload,
      })
    case 'SET_ADD_APPOINTMENT_END_MINUTES_INPUT':
      return ({
        ...state,
        addEndMinutes: action.payload,
      })
    case 'SET_ADD_APPOINTMENT_MAX_QUEUE_ERROR':
      return ({
        ...state,
        addMaxQueueInputError: action.payload,
      })
    case 'SET_ADD_APPOINTMENT_ERROR':
      return ({
        ...state,
        addAppointmentErrors: action.payload,
      })
    default:
      return state;
  }
}

export default appointmentDataList;