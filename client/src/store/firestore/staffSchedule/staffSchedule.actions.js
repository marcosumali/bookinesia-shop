import swal from 'sweetalert';

let emptyInputError = 'Barber has to provide atleast one day of active working hours.'

// ---------------------------------------------- STAFF SCHEDULES ACTION ----------------------------------------------
// Get staff schedules data based on provided branchId
export const getStaffSchedules = (branchId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let staffScheduleRef = firestore.collection('staffSchedule')
    
    staffScheduleRef
    .where('branchId', '==', branchId)
    .onSnapshot(function (querySnapshot) {
      let staffSchedules = []
      if (querySnapshot.empty === false) {
        querySnapshot.forEach(function(doc) {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          staffSchedules.push(data)
        })
        dispatch(setStaffSchedulesSuccess(staffSchedules))
      } else {
        dispatch(setStaffSchedulesFailed(false))
      }
    })
  }
}

const setStaffSchedulesSuccess = (data) => {
  return {
    type: 'SET_STAFF_SCHEDULES_SUCCESS',
    payload: data
  }
}

const setStaffSchedulesFailed = (data) => {
  return {
    type: 'SET_STAFF_SCHEDULES_FAILED',
    payload: data
  }
}

// To set selected staff schedules based on selected staff
export const setSelectedStaffSchedules = (barber, staffSchedules) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let selectedStaffSchedules = []
    staffSchedules && staffSchedules.map((staffSchedule) => {
      if (staffSchedule.staffId === barber.id) {
        selectedStaffSchedules.push(staffSchedule)
      }
      return ''
    })
    dispatch(setSelectedStaffSchedulesAction(selectedStaffSchedules))
    dispatch(setSelectedStaffSchedulesInput(selectedStaffSchedules))
  }
}

export const setSelectedStaffSchedulesAction = (data) => {
  return {
    type: 'SET_SELECTED_STAFF_SCHEDULES',
    payload: data
  }
}

// To set selected staff schedules based on staff services for user input purposes
export const setSelectedStaffSchedulesInput = (staffSchedules) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let result = []

    staffSchedules && staffSchedules.map((staffSchedule) => {
      result.push(staffSchedule)
      return ''
    })

    dispatch(setSelectedSchedulesInputAction(result))
  }
}

const setSelectedSchedulesInputAction = (data) => {
  return {
    type: 'SET_SELECTED_STAFF_SCHEDULES_INPUT',
    payload: data
  }
}

// To set edit status to true or false
export const setHasEditStatusStaffSchedule = (clickStatus) => {
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
    type: 'SET_HAS_EDIT_STATUS_STAFF_SCHEDULE',
    payload: data
  }
}

// To update staff schedule data
export const updateStaffSchedulesData = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let { staffSchedules, staffSchedulesInput } = data
    let errorScore = staffSchedulesInput.length

    staffSchedulesInput && staffSchedulesInput.map(staffSchedulesInput => {
      if (staffSchedulesInput.disableStatus) {
        errorScore = errorScore - 1
      }
      return ''
    })

    if (errorScore <= 0) {
      dispatch(setStaffScheduleInputError(emptyInputError))
    }

    if (errorScore > 0) {
      dispatch(setStaffScheduleInputError(false))
    }

    // STEP 1
    // Obtain staff schedules to be updated by:
    // 1. For each staff schedules input, obtain the index from selected staff schedules data
    // 2. Compare each data between input and selected staff schedules data, 
    // 3. If there is any difference, then include it the array to be updated

    let scheduleTosBeUpdated = []
    staffSchedulesInput && staffSchedulesInput.map(scheduleInput => {
      let checkedIndex = staffSchedules.findIndex(staffSchedule => staffSchedule.id === scheduleInput.id)
      if (
        staffSchedules[checkedIndex].disableStatus !== scheduleInput.disableStatus ||
        staffSchedules[checkedIndex].startHours !== scheduleInput.startHours ||
        staffSchedules[checkedIndex].endHours !== scheduleInput.endHours ||
        staffSchedules[checkedIndex].startMinutes !== scheduleInput.startMinutes ||
        staffSchedules[checkedIndex].endMinutes !== scheduleInput.endMinutes
        ) {
        scheduleTosBeUpdated.push(scheduleInput)
      }
      return ''
    })
    // console.log('result', scheduleTosBeUpdated)

    if (errorScore > 0 && scheduleTosBeUpdated.length > 0) {
      swal({
        title: 'Are you sure?',
        text: "Barber's working hours information will be updated with the new input.",
        icon: 'warning',
        buttons: ['Cancel', 'OK']
      })
      .then(result => {
        if (result) {
          scheduleTosBeUpdated && scheduleTosBeUpdated.map((scheduleInput, index) => {
            let staffScheduleRef = firestore.collection('staffSchedule').doc(scheduleInput.id)
            
            staffScheduleRef.update({
              disableStatus: scheduleInput.disableStatus,
              startHours: scheduleInput.startHours,
              startMinutes: scheduleInput.startMinutes,
              endHours: scheduleInput.endHours,
              endMinutes: scheduleInput.endMinutes,
            })
            .then(() => {
              // Use index since we can't async await update process
              if (index === 0) {
                dispatch(setHasEditStatusStaffSchedule(false))
                dispatch(setSelectedStaffSchedulesAction(staffSchedulesInput))
                swal("Information Updated", "", "success")
              }
            })
            .catch(err => {
              console.log('ERROR: update staff schedules', err)
            })
            return ''
          })
        }
      })
    }
  }
}

const setStaffScheduleInputError = (data) => {
  return {
    type: 'SET_STAFF_SCHEDULE_INPUT_ERROR',
    payload: data
  }
}