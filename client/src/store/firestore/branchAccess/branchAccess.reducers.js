let initialState = {
  grantedBranches: [],
  grantedBranchesLoading: true,
}

const branchAccessList = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_BRANCH_ACCESS_DATA':
      return ({
        ...state,
        grantedBranches: action.payload,
        grantedBranchesLoading: false,
      })
     default:
      return state;
  }
}

export default branchAccessList;