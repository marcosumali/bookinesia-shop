import { getGrantedBranches } from '../branch/branch.actions';
import { getOperationalDataNow } from '../auth/auth.actions';
import { getLatestBranchStatus } from '../../../helpers/dashboard';

// To get branch access data based on uid
export const getBranchAccess = (uid, cookies) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let branchAccessRef = firestore.collection('branchAccess')

    branchAccessRef
    .where('managementId', '==', uid)
    .where('disableStatus', '==', false)
    .get()
    .then(async querySnapshot => {
      if (querySnapshot.empty === false) {

        let grantedAccesses = []
        querySnapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          grantedAccesses.push(data)
        })

        let branchesData = await dispatch(getGrantedBranches(grantedAccesses))
        
        await dispatch(setBranchAccess(branchesData))

        let BMS = await getLatestBranchStatus(cookies)
        if (BMS) {
          await dispatch(getOperationalDataNow(BMS)) // BMS = branch id          
        } else {
          await dispatch(getOperationalDataNow(branchesData[0].id))
        }
      }
    })
    .catch(err => {
      console.log('ERROR: get branch access', err)
    })
    
  }
}

const setBranchAccess = (data) => {
  return {
    type: 'SET_BRANCH_ACCESS_DATA',
    payload: data
  }
}