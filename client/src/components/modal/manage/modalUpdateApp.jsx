import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../svg/closeSvg';
import AccountCircleSvg from '../../svg/accountCircleSvg';
import LoadingDotSvg from '../../svg/loadingDotSvg';
import BasicDateInput from '../../form/inputDateBasic';
import NumberInput from '../../form/inputNumber';
import SelectInput from '../../form/inputSelect';
import SwitchInput from '../../form/inputSwitch';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';
import {
  returnAcceptedDate
} from '../../../helpers/date';
import { 
  handleBasicDateInput, 
  handleMultipleSelectOption, 
  handleSingleCheckbox, 
  handleCheckedStatus, 
  handleNumberInput,
} from '../../../store/dashboard/dashboard.actions';
import { 
  setSelectedAppointmentInput,
  updateSelectedAppointment,
  clearUpdateAppointment,
} from '../../../store/firestore/appointment/appointment.actions';

class modalUpdateApp extends Component {
  render() {
    let { 
      filteredAppointment,
      updateDateInput,
      updateMaxQueueInput,
      updateMaxQueueInputError,
      updateStartHours,
      updateStartMinutes,
      updateEndHours,
      updateEndMinutes,
      updateDisableStatus,
      handleBasicDateInput,
      hours,
      minutes,
      handleMultipleSelectOption,
      handleSingleCheckbox, 
      handleCheckedStatus,
      handleNumberInput,
      loadingStatus,
      selectedAppointment,
      selectedBarber,
      setSelectedAppointmentInput,
      updateAppointmentErrors,
      updateSelectedAppointment,
      clearUpdateAppointment,
      user,
    } = this.props

    const options = {
      dismissible: false,
      ready: function() {
        setSelectedAppointmentInput(filteredAppointment)
      }
    }
    return (
      <Modal
        modalOptions={ options }
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Update Selected Appointment</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close" onClick={ () => clearUpdateAppointment() }>
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="col m12 No-margin No-padding Manage-box Container-wrap-center-cross animated fadeIn faster">
            <div className="col m12 No-margin No-padding Container-nowrap-center-cross Margin-b-5">
              {
                filteredAppointment.disableStatus ?
                <div className="Manage-text Disabled">{ new Date(returnAcceptedDate(filteredAppointment.date)).toDateString() }</div>
                :
                <div className="Manage-text">{ new Date(returnAcceptedDate(filteredAppointment.date)).toDateString() }</div>
              }
            </div>
            <div className="col m12 No-margin No-padding Container-nowrap-center-cross">
              <div className="col m3 No-padding Container-nowrap-start">
                {
                  filteredAppointment.disableStatus ?
                  <div className="Manage-text-gray Disabled">Start Time: { filteredAppointment.startHours }.{ filteredAppointment.startMinutes }</div>
                  :
                  <div className="Manage-text-gray">Start Time: { filteredAppointment.startHours }.{ filteredAppointment.startMinutes }</div>
                }
              </div>
              <div className="col m3 No-padding Container-nowrap-center">
                {
                  filteredAppointment.disableStatus ?
                  <div className="Manage-text-gray Disabled">Finish Time: { filteredAppointment.endHours }.{ filteredAppointment.endMinutes }</div>
                  :
                  <div className="Manage-text-gray">Finish Time: { filteredAppointment.endHours }.{ filteredAppointment.endMinutes }</div>
                }
              </div>
              <div className="col m3 No-padding Container-nowrap-center">
                {
                  filteredAppointment.disableStatus ?
                  <div className="Manage-text-gray Disabled">#Transaction: { filteredAppointment.currentTransaction }</div>
                  : 
                  <div className="Manage-text-gray">#Transaction: { filteredAppointment.currentTransaction }</div>
                }
              </div>
              <div className="col m3 No-padding Container-nowrap-end">
                {
                  filteredAppointment.disableStatus ?
                  <div className="Manage-text-gray Disabled">Max. Queue: { filteredAppointment.maxQueue }</div>
                  :
                  <div className="Manage-text-gray">Max. Queue: { filteredAppointment.maxQueue }</div>
                }
              </div>
            </div>
          </div>
        }>
        <div className="row No-margin">
          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m12 No-margin No-padding Margin-b-10 Container-nowrap-center-cross Update-barber-box">
              <div className="col m1 No-margin No-padding Container-nowrap-center Barber-image-box">
                {
                  selectedBarber.picture.length <= 0 ?
                  <AccountCircleSvg className="" width="100%" height="100%" color="#666666" />
                  :
                  <img className="Barber-image" src={ selectedBarber.picture } alt={ "selectedImage" }/>
                }
              </div>
              <div className="col m11 No-margin No-padding Container-wrap-center-cross">
                <div className="col m12 No-margin No-padding">
                  <div className="Manage-text-gray Margin-b-5">PROVIDER</div>
                </div>
                <div className="col m12 No-margin No-padding">
                  <div className="Manage-text" style={{ fontSize: '1em' }} >{ selectedBarber.name }</div>
                </div>
              </div>
            </div>
            {
              Object.keys(selectedAppointment).length === 0 && selectedAppointment.constructor === Object ?
              <div className="col m12 No-margin No-padding Container-nowrap-center animated fadeIn">
                <LoadingDotSvg height="4em" width="4em" color="#5499c3" />
              </div>
              :
              <div className="animated fadeIn faster col m12 No-padding No-margin Container-wrap-center-cross">
                <div className="col m12 No-padding No-margin Container-nowrap-center-cross">
                  <div className="col m3 No-padding No-margin Container-nowrap-center-cross">
                    <div className="Manage-barber-hours-text-blue Text-capitalize"></div>
                  </div>
                  <div className="col m3 No-padding No-margin Container-nowrap-end">
                  </div>
                  <div className="col m1 No-padding No-margin Container-nowrap-end">
                  </div>
                  <div className="col m3 No-margin Container-nowrap-center">
                    <div className="Select-headers No-margin">Start</div>
                  </div>
                  <div className="col m3 No-margin Container-nowrap-center">
                    <div className="Select-headers No-margin">End</div>
                  </div>
                </div>
                <div className="col m12 No-padding No-margin Container-nowrap-center-cross">
                  <div className="col m3 No-padding Margin-b-10" style={{ marginTop: '0.6rem' }}>
                    <BasicDateInput 
                      inputId="updateDate"
                      className="input-field Input-date-box"
                      inputLabelStatus={ true }
                      inputLabel="Appointment Date"
                      openingStatus={ true }
                      openingDate={ updateDateInput }
                      handleChangesDateFunction={ handleBasicDateInput }              
                    />
                  </div>
                  <div className="col m3 No-margin No-padding Margin-b-10 Container-wrap-center">
                    <SwitchInput 
                      inputId="updateAppointmentStatus"
                      showLabel={ true }
                      inputLabel="Status"
                      inputValue=""
                      handleChangesFunction={ handleSingleCheckbox }
                      handleCheckFunction={ handleCheckedStatus }
                      checkedStatus={ updateDisableStatus }
                    />
                  </div>
                  <div className="col m1 No-padding Margin-b-10" style={{ marginTop: '0.95rem' }}>
                    <NumberInput 
                      inputId="updateMaxQueue"
                      inputLabel="Max Queue"
                      inputError={ updateMaxQueueInputError }
                      inputValue={ updateMaxQueueInput }
                      handleChangesFunction={ handleNumberInput }
                    />
                  </div>
                  <div className="col m3 No-padding Margin-b-10 Container-wrap-center" style={{ marginTop: '1.2rem' }}>
                    <SelectInput 
                      inputId="startHours"
                      className="Margin-r-5"
                      inputSize={ 5 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="updateAppointment"
                      inputName="startHours"
                      selectedData={ null }
                      showLabel={ true }
                      inputLabel="Hours"
                      inputValue={ updateStartHours }
                      optionData={ hours }
                    />
                    <SelectInput 
                      inputId="startMinutes"
                      className=""
                      inputSize={ 5 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="updateAppointment"
                      inputName="startMinutes"
                      selectedData={ null }
                      showLabel={ true }
                      inputLabel="Minutes"
                      inputValue={ updateStartMinutes }
                      optionData={ minutes }
                    />
                  </div>
                  {/* <div className="col m1 No-padding Container-nowrap-center" style={{ marginTop: '1.2rem' }}>
                    <div className="Manage-barber-hours-text-gray">to</div>
                  </div> */}
                  <div className="col m3 No-padding Margin-b-10 Container-wrap-center" style={{ marginTop: '1.2rem' }}>
                    <SelectInput 
                      inputId="endHours"
                      className="Margin-r-5"
                      inputSize={ 5 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="updateAppointment"
                      inputName="endHours"
                      selectedData={ null }
                      showLabel={ true }
                      inputLabel="Hours"
                      inputValue={ updateEndHours }
                      optionData={ hours }
                    />
                    <SelectInput 
                      inputId="endMinutes"
                      className=""
                      inputSize={ 5 }
                      handleChangesFunction={ handleMultipleSelectOption }
                      purpose="updateAppointment"
                      inputName="endMinutes"
                      selectedData={ null }
                      showLabel={ true }
                      inputLabel="Minutes"
                      inputValue={ updateEndMinutes }
                      optionData={ minutes }
                    />
                  </div>
                </div>
              </div>
            }
            <div className="col m12 Container-wrap-center-cross Margin-b-10">
              {
                updateAppointmentErrors.length > 0 ?
                <div>
                  {
                    updateAppointmentErrors && updateAppointmentErrors.map((error, index) => {
                      return (
                        <div className="Error-box" key={ 'error' + index }>
                          <label htmlFor="error" className="Input-info-error">{index+1}. { error }</label>
                        </div>
                      )
                    })
                  }
                </div>
                :
                <div></div>
              }
            </div>  
          </div>
          <div className="col m12 No-margin No-padding Modal-body-box Container-nowrap-end">
            {
              selectedAppointment.date === updateDateInput && 
              selectedAppointment.maxQueue === updateMaxQueueInput && 
              selectedAppointment.startHours === updateStartHours &&
              selectedAppointment.startMinutes === updateStartMinutes &&
              selectedAppointment.endHours === updateEndHours &&
              selectedAppointment.endMinutes === updateEndMinutes &&
              selectedAppointment.disableStatus === updateDisableStatus ?
              <DisabledButton 
                text="Save"
                type="Btn-disabled"
              />
              :
              loadingStatus ?
              <LoadingButton 
                type="Btn-white-blue Container-nowrap-center"
                color="#ffffff"
              />
              :
              <Button 
                text="Save"
                type="Btn-white-blue"
                clickFunction={ updateSelectedAppointment }
                data={{ 
                  updateDateInput,
                  updateMaxQueueInput,
                  updateStartHours,
                  updateStartMinutes,
                  updateEndHours,
                  updateEndMinutes,
                  updateDisableStatus,
                  selectedAppointment,
                  branchId: user.branchId,
                  selectedBarber
                }}
              />
            }
          </div>
        </div>
      </Modal>
    )
  }
}


const mapStateToProps = state => {
  return {
    selectedBarber: state.staff.selectedBarber,
    selectedAppointment: state.appointment.selectedAppointment,
    updateDateInput: state.appointment.updateDateInput,
    updateMaxQueueInput: state.appointment.updateMaxQueueInput,
    updateMaxQueueInputError: state.appointment.updateMaxQueueInputError,
    updateStartHours: state.appointment.updateStartHours,
    updateStartMinutes: state.appointment.updateStartMinutes,
    updateEndHours: state.appointment.updateEndHours,
    updateEndMinutes: state.appointment.updateEndMinutes,
    updateDisableStatus: state.appointment.updateDisableStatus,
    loadingStatus: state.appointment.loadingStatus,
    updateAppointmentErrors: state.appointment.updateAppointmentErrors,
    hours: state.nav.hours,
    minutes: state.nav.minutes,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleBasicDateInput,
  handleMultipleSelectOption,
  handleSingleCheckbox, 
  handleCheckedStatus,
  handleNumberInput,
  setSelectedAppointmentInput,
  updateSelectedAppointment,
  clearUpdateAppointment,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalUpdateApp);