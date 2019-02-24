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
import { updateBranchSchedulesData } from '../../../store/firestore/branchSchedule/branchSchedule.actions';

class manageBranchHours extends Component {
  render() {
    let { 
      hours, 
      minutes, 
      handleCheckedStatus, 
      handleMultipleSwitches, 
      handleMultipleSelectOption, 
      hasEditStatus,
      handleCancelation,
      updateBranchSchedulesData,
      loadingStatus,
      branchSchedules,
      branchSchedulesInput,
    } = this.props

    return (
      <form className="col m12 No-padding Container-wrap-center-cross Margin-b-10">
        <div className="col m12 No-margin No-padding Container-wrap-center-cross Margin-b-10">
          <div className="col m12 No-padding No-margin Container-nowrap-center-cross">
            <div className="col m3 No-margin Container-nowrap-center-cross">
              <div className="Manage-barber-hours-text-blue Text-capitalize"></div>
            </div>
            <div className="col m2 No-margin Container-nowrap-start Margin-r-10">
            </div>
            <div className="col m3 No-margin Container-nowrap-center" style={{ paddingLeft: '0px' }}>
              <div className="Select-headers">Open</div>
            </div>
            <div className="col m1  No-padding No-margin Container-nowrap-center">
              <div className="Manage-barber-hours-text-gray"></div>
            </div>
            <div className="col m3 No-margin Container-nowrap-center" style={{ paddingLeft: '0px' }}>
              <div className="Select-headers">Closed</div>
            </div>
          </div>
          {
            branchSchedulesInput && branchSchedulesInput.map((schedule, index) => {
              return(
                <div className="col m12 No-padding No-margin Container-nowrap-center-cross Schedule-box" key={ 'schedule' + index }>
                  <div className="col m3 No-margin Container-nowrap-center-cross">
                    <div className="Manage-barber-hours-text-blue Text-capitalize">{ schedule.day }</div>
                  </div>
                  <div className="col m2 No-margin Container-nowrap-start Margin-r-10">
                    <SwitchInput 
                      inputId={ schedule.id }
                      inputLabel=""
                      showLabel={ false }
                      inputValue={ true }
                      handleChangesFunction={ (e) => handleMultipleSwitches('manageBranchHours', e, branchSchedulesInput) }
                      handleCheckFunction={ handleCheckedStatus }
                      checkedStatus={ schedule.disableStatus }
                    />
                  </div>
                  <div className="col m3 No-margin Container-nowrap-center" style={{ paddingLeft: '0px' }}>
                    <SelectInput 
                      inputId={ schedule.id }
                      className="Margin-r-5"
                      inputSize={ 6 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="manageBranchHours"
                      inputName="openHours"
                      selectedData={ branchSchedulesInput }
                      showLabel={ index === 0 ? true : false }
                      inputLabel="Hours"
                      inputValue={ schedule.openHours }
                      optionData={ hours }
                    />
                    <SelectInput 
                      inputId={ schedule.id }
                      className=""
                      inputSize={ 6 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="manageBranchHours"
                      inputName="openMinutes"
                      selectedData={ branchSchedulesInput }
                      showLabel={ index === 0 ? true : false }
                      inputLabel="Minutes"
                      inputValue={ schedule.openMinutes }
                      optionData={ minutes }
                    />
                  </div>
                  <div className="col m1  No-padding No-margin Container-nowrap-center">
                    <div className="Manage-barber-hours-text-gray">to</div>
                  </div>
                  <div className="col m3 No-margin Container-nowrap-center" style={{ paddingLeft: '0px' }}>
                    <SelectInput 
                      inputId={ schedule.id }
                      className="Margin-r-5"
                      inputSize={ 6 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="manageBranchHours"
                      inputName="closeHours"
                      selectedData={ branchSchedulesInput }
                      showLabel={ index === 0 ? true : false }
                      inputLabel="Hours"
                      inputValue={ schedule.closeHours }
                      optionData={ hours }
                    />
                    <SelectInput 
                      inputId={ schedule.id }
                      className=""
                      inputSize={ 6 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="manageBranchHours"
                      inputName="closeMinutes"
                      selectedData={ branchSchedulesInput }
                      showLabel={ index === 0 ? true : false }
                      inputLabel="Minutes"
                      inputValue={ schedule.closeMinutes }
                      optionData={ minutes }
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="col m12 No-padding Container-nowrap-end Margin-b-10" style={{ marginRight: '0.625em' }}>
          {
            hasEditStatus && loadingStatus === false ?
            <Button 
              text="Cancel"
              type="Btn-blue"
              clickFunction={ handleCancelation }
              data={{ functionToBeExecuted: 'setBranchSchedulesInput', section: 'opening hours', requiredData: branchSchedules }}
            />
            :
            <DisabledButton 
              text="Cancel"
              type="Btn-disabled"
            />
          }
          {
            (hasEditStatus && loadingStatus === false) ?
            <Button 
              text="Save"
              type="Btn-white-blue"
              clickFunction={ updateBranchSchedulesData }
              data={{ branchSchedules, branchSchedulesInput }}
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
    loadingStatus: state.schedule.loadingStatus,
    branchSchedules: state.schedule.branchSchedules,
    branchSchedulesInput: state.schedule.branchSchedulesInput,
    hasEditStatus: state.schedule.hasEditStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleCheckedStatus,
  handleMultipleSwitches,
  handleMultipleSelectOption,
  handleCancelation,
  updateBranchSchedulesData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageBranchHours);