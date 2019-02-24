import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SwitchInput from '../../form/inputSwitch';
import SelectInput from '../../form/inputSelect';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';
import { 
  handleCheckedStatus, 
  handleMultipleSwitches, 
  handleMultipleSelectOption, 
  handleCancelation,
} from '../../../store/dashboard/dashboard.actions';
import { updateStaffSchedulesData } from '../../../store/firestore/staffSchedule/staffSchedule.actions';

class manageBarberHours extends Component {
  render() {
    let { 
      hours, 
      minutes, 
      selectedStaffSchedules, 
      handleCheckedStatus, 
      selectedStaffSchedulesInput, 
      handleMultipleSwitches, 
      handleMultipleSelectOption, 
      hasEditStatus,
      handleCancelation,
      staffScheduleInputError,
      updateStaffSchedulesData,
      loadingStatus,
    } = this.props

    return (
      <form className="col m12 No-padding Container-wrap-center-cross Margin-b-10">
        <div className="col m12 No-margin No-padding Container-wrap-center-cross Margin-b-10">
          {/* Schedule Headers */}
          <div className="col m12 No-padding No-margin Container-wrap-center-cross">
            <div className="col m2 No-padding No-margin Container-nowrap-center-cross">
              <div className="Manage-barber-hours-text-blue Text-capitalize"></div>
            </div>
            <div className="col m2 No-padding No-margin Container-nowrap-end Margin-r-10">
            </div>
            <div className="col m3 No-margin Container-nowrap-center">
              <div className="Select-headers">Start</div>
            </div>
            <div className="col m1 No-padding No-margin Container-nowrap-center">
              <div className="Manage-barber-hours-text-gray"></div>
            </div>
            <div className="col m3 No-margin Container-nowrap-center">
              <div className="Select-headers">End</div>
            </div>
          </div>
          {
            selectedStaffSchedulesInput && selectedStaffSchedulesInput.map((selectedStaffSchedule, index) => {
              return(
                <div className="col m12 No-padding No-margin Container-wrap-center-cross Schedule-box" key={ 'staffSchedule' + index }>
                  <div className="col m2 No-padding No-margin Container-nowrap-center-cross">
                    <div className="Manage-barber-hours-text-blue Text-capitalize">{ selectedStaffSchedule.day }</div>
                  </div>
                  <div className="col m2 No-padding No-margin Container-nowrap-end Margin-r-10">
                    <SwitchInput 
                      inputId={ selectedStaffSchedule.id }
                      inputLabel=""
                      showLabel={ false }
                      inputValue={ true }
                      handleChangesFunction={ (e) => handleMultipleSwitches('manageBarberHours', e, selectedStaffSchedulesInput) }
                      handleCheckFunction={ handleCheckedStatus }
                      checkedStatus={ selectedStaffSchedule.disableStatus }
                    />
                  </div>
                  <div className="col m3 No-margin Container-nowrap-center">
                    <SelectInput 
                      inputId={ selectedStaffSchedule.id }
                      className="Margin-r-5"
                      inputSize={ 6 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="manageBarberHours"
                      inputName="startHours"
                      selectedData={ selectedStaffSchedulesInput }
                      showLabel={ index === 0 ? true : false }
                      inputLabel="Hours"
                      inputValue={ selectedStaffSchedule.startHours }
                      optionData={ hours }
                    />
                    <SelectInput 
                      inputId={ selectedStaffSchedule.id }
                      className=""
                      inputSize={ 6 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="manageBarberHours"
                      inputName="startMinutes"
                      selectedData={ selectedStaffSchedulesInput }
                      showLabel={ index === 0 ? true : false }
                      inputLabel="Minutes"
                      inputValue={ selectedStaffSchedule.startMinutes }
                      optionData={ minutes }
                    />
                  </div>
                  <div className="col m1 No-padding No-margin Container-nowrap-center">
                    <div className="Manage-barber-hours-text-gray">to</div>
                  </div>
                  <div className="col m3 No-margin Container-nowrap-center">
                    <SelectInput 
                      inputId={ selectedStaffSchedule.id }
                      className="Margin-r-5"
                      inputSize={ 6 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="manageBarberHours"
                      inputName="endHours"
                      selectedData={ selectedStaffSchedulesInput }
                      showLabel={ index === 0 ? true : false }
                      inputLabel="Hours"
                      inputValue={ selectedStaffSchedule.endHours }
                      optionData={ hours }
                    />
                    <SelectInput 
                      inputId={ selectedStaffSchedule.id }
                      className=""
                      inputSize={ 6 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="manageBarberHours"
                      inputName="endMinutes"
                      selectedData={ selectedStaffSchedulesInput }
                      showLabel={ index === 0 ? true : false }
                      inputLabel="Minutes"
                      inputValue={ selectedStaffSchedule.endMinutes }
                      optionData={ minutes }
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="col m12 No-margin No-padding Container-nowrap-center Margin-b-10">
          <div className="Input-info-error">{ staffScheduleInputError }</div>
        </div>
        <div className="col m12 No-margin No-padding Container-nowrap-end Margin-b-10">
          {
            hasEditStatus && loadingStatus === false ?
            <Button 
              text="Cancel"
              type="Btn-blue"
              clickFunction={ handleCancelation }
              data={{ functionToBeExecuted: 'setSelectedStaffSchedulesInput', section: 'working hours', requiredData: selectedStaffSchedules }}
            />
            :
            <DisabledButton 
              text="Cancel"
              type="Btn-disabled"
            />
          }
          {
            hasEditStatus && loadingStatus === false ?
            <Button 
              text="Save"
              type="Btn-white-blue"
              clickFunction={ updateStaffSchedulesData }
              data={{ staffSchedules: selectedStaffSchedules, staffSchedulesInput:  selectedStaffSchedulesInput}}
            />
            :
            loadingStatus ?
            <LoadingButton 
              type="Btn-white-blue Container-nowrap-center"
              color="#ffffff"
            />
            :
            <DisabledButton 
              text="Save"
              type="Btn-disabled"
            />
          }
        </div>
      </form>
    )
  }
}


const mapStateToProps = state => {
  return {
    hours: state.nav.hours,
    minutes: state.nav.minutes,
    selectedStaffSchedules: state.staffSchedule.selectedStaffSchedules,
    selectedStaffSchedulesInput: state.staffSchedule.selectedStaffSchedulesInput,
    hasEditStatus: state.staffSchedule.hasEditStatus,
    staffScheduleInputError: state.staffSchedule.staffScheduleInputError,
    loadingStatus: state.staffSchedule.loadingStatus
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCheckedStatus,
  handleMultipleSwitches,
  handleMultipleSelectOption,
  handleCancelation,
  updateStaffSchedulesData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageBarberHours);