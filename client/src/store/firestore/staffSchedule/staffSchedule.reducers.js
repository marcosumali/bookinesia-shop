let initialState = {
  staffSchedules: [],
  staffSchedulesExist: true,
  staffSchedulesLoading: true,
  selectedStaffSchedules: [],
  selectedStaffSchedulesInput: [],
  hasEditStatus: false,
  staffScheduleInputError: false,
  loadingStatus: false,
}

const staffScheduleDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_STAFF_SCHEDULES_SUCCESS':
      return ({
        ...state,
        staffSchedules: action.payload,
        staffSchedulesLoading: false,
      })
    case 'SET_STAFF_SCHEDULES_FAILED':
      return ({
        ...state,
        staffSchedulesExist: action.payload,
      })
    case 'SET_SELECTED_STAFF_SCHEDULES':
      return ({
        ...state,
        selectedStaffSchedules: action.payload,
      })
    case 'SET_SELECTED_STAFF_SCHEDULES_INPUT':
      return ({
        ...state,
        selectedStaffSchedulesInput: action.payload,
      })
    case 'SET_HAS_EDIT_STATUS_STAFF_SCHEDULE':
      return ({
        ...state,
        hasEditStatus: action.payload,
      })
    case 'SET_STAFF_SCHEDULE_INPUT_ERROR':
      return ({
        ...state,
        staffScheduleInputError: action.payload,
      })
    case 'SET_STAFF_SCHEDULE_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload,
      })
    default:
      return state;
  }
}

export default staffScheduleDataList;