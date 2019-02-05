// Get branch data
export const getBranch = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let branchRef = firestore.collection('branch').doc(branchId)

    branchRef
    .onSnapshot(function (doc) {
      if (doc.exists) {
        let data = doc.data()
        let id = doc.id
        data['id'] = id
        dispatch(getBranchAction(data))
      }
    })
  }
}

const getBranchAction = (data) => {
  return {
    type: 'SET_BRANCH_SUCCESS',
    payload: data
  }
}
