let initialState = {
  branchSchedules: [],
  branchSchedulesInput: [],
  hasEditStatus: false,
  loadingStatus: false,
}

const branchScheduleDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_BRANCH_SCHEDULES':
      return ({
        ...state,
        branchSchedules: action.payload,
      })
    case 'SET_BRANCH_SCHEDULES_INPUT':
      return ({
        ...state,
        branchSchedulesInput: action.payload,
      })
    case 'SET_HAS_EDIT_STATUS_BRANCH_SCHEDULE':
      return ({
        ...state,
        hasEditStatus: action.payload,
      })
    case 'SET_BRANCH_SCHEDULE_LOADING_STATUS':
      return ({
        ...state,
        loadingStatus: action.payload,
      })
    default:
      return state;
  }
}

export default branchScheduleDataList;