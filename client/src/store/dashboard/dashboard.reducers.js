let initialState = {
  displayToShow: '',
  manageShowStatus: false,
  reportsShowStatus: false,
  menuToShow: '',
  subMenuToShow: '',
  filterInput: '',
  activeTab: '',
  hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  minutes: ['00', '10', '20', '30', '40', '50'],
  file: {},
}

const dashbordDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_DISPLAY':
      return ({
        ...state,
        displayToShow: action.payload,
      })
    case 'SET_MANAGE_STATUS':
      return ({
        ...state,
        manageShowStatus: action.payload,
      })
    case 'SET_REPORTS_STATUS':
      return ({
        ...state,
        reportsShowStatus: action.payload,
      })
    case 'SET_MENU':
      return ({
        ...state,
        menuToShow: action.payload,
      })
    case 'SET_SUB_MENU':
      return ({
        ...state,
        subMenuToShow: action.payload,
      })
    case 'SET_FILTER_INPUT':
      return ({
        ...state,
        filterInput: action.payload,
      })
    case 'SET_ACTIVE_TAB':
      return ({
        ...state,
        activeTab: action.payload,
      })
    case 'SET_SINGLE_FILE_INPUT':
      return ({
        ...state,
       file: action.payload,
      })
    default:
      return state;
  }
}

export default dashbordDataList;