import swal from 'sweetalert';

// Get branch schedule data
export const getBranchSchedules = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let branchScheduleRef = firestore.collection('branchSchedule')

    branchScheduleRef
    .where('branchId', '==', branchId)
    .onSnapshot(function (querySnapshot) {
      let schedules = []
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(function(doc) {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          schedules.push(data)
        })
        dispatch(setBranchSchedules(schedules))
        dispatch(setBranchSchedulesInput(schedules))
      } else {
        dispatch(setBranchSchedules([]))
        dispatch(setBranchSchedulesInput([]))
      }
    })
  }
}

const setBranchSchedules = (data) => {
  return {
    type: 'SET_BRANCH_SCHEDULES',
    payload: data
  }
}

export const setBranchSchedulesInput = (data) => {
  return {
    type: 'SET_BRANCH_SCHEDULES_INPUT',
    payload: data
  }
}

// To set edit status to true or false
export const setHasEditStatusBranchSchedule = (clickStatus) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let status = ''

    if (clickStatus) {
      status = true
    } else {
      status = false
    }
    dispatch(setHasEditStatusAction(status))
  }
}

const setHasEditStatusAction = (data) => {
  return {
    type: 'SET_HAS_EDIT_STATUS_BRANCH_SCHEDULE',
    payload: data
  }
}

// To update branch schedule data
export const updateBranchSchedulesData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let { branchSchedules, branchSchedulesInput } = data

    // STEP 1
    // Obtain branch schedules to be updated by:
    // 1. For each branch schedules input, obtain the index from selected branch schedules data
    // 2. Compare each data between input and selected branch schedules data, 
    // 3. If there is any difference, then include it the array to be updated

    let scheduleTosBeUpdated = []
    branchSchedulesInput && branchSchedulesInput.map(scheduleInput => {
      let checkedIndex = branchSchedules.findIndex(branchSchedule => branchSchedule.id === scheduleInput.id)
      if (
        branchSchedules[checkedIndex].disableStatus !== scheduleInput.disableStatus ||
        branchSchedules[checkedIndex].openHours !== scheduleInput.openHours ||
        branchSchedules[checkedIndex].closeHours !== scheduleInput.closeHours ||
        branchSchedules[checkedIndex].openMinutes !== scheduleInput.openMinutes ||
        branchSchedules[checkedIndex].closeMinutes !== scheduleInput.closeMinutes
        ) {
        scheduleTosBeUpdated.push(scheduleInput)
      }
      return ''
    })
    // console.log('result', scheduleTosBeUpdated)

    if (scheduleTosBeUpdated.length > 0) {
      swal({
        title: 'Are you sure?',
        text: "Branch's opening hours information will be updated with the new input.",
        icon: 'warning',
        buttons: ['Cancel', 'OK']
      })
      .then(result => {
        if (result) {
          dispatch(setBranchScheduleLoadingStatus(true))

          let score = 0
          scheduleTosBeUpdated && scheduleTosBeUpdated.map((scheduleInput, index) => {
            let branchScheduleRef = firestore.collection('branchSchedule').doc(scheduleInput.id)
            score = score + 1
            
            branchScheduleRef.update({
              disableStatus: scheduleInput.disableStatus,
              openHours: scheduleInput.openHours,
              openMinutes: scheduleInput.openMinutes,
              closeHours: scheduleInput.closeHours,
              closeMinutes: scheduleInput.closeMinutes,
            })
            .then(() => {
            })
            .catch(err => {
              console.log('ERROR: update branch schedules', err)
            })
            return ''
          })

          if (score >= scheduleTosBeUpdated.length) {
            dispatch(setHasEditStatusBranchSchedule(false))
            dispatch(setBranchSchedulesInput(branchSchedulesInput))
            dispatch(setBranchScheduleLoadingStatus(false))
            swal("Information Updated", "", "success")
          }
        }
      })
    }
  }
}

export const setBranchScheduleLoadingStatus = (data) => {
  return {
    type: 'SET_BRANCH_SCHEDULE_LOADING_STATUS',
    payload: data
  }
}