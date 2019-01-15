let initialState = {
  displayToShow: '',
  manageShowStatus: false,
  reportsShowStatus: false,
  menuToShow: '',
  subMenuToShow: '',
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
    default:
      return state;
  }
}

export default dashbordDataList;