let initialState = {
  branch: '',
  branchLoading: '',
  branchExists: '',
}

const branchDataList = (state = { ...initialState }, action) => {
  switch (action.type) {
  case 'SET_BRANCH_SUCCESS':
    return ({
      ...state,
      branch: action.payload,
      branchLoading: false,
    })
  case 'SET_BRANCH_FAILED':
    return ({
      ...state,
      branchExists: action.payload,
    })
    default:
      return state;
  }
}

export default branchDataList;