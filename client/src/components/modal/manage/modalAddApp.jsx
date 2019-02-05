import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../svg/closeSvg';
import AccountCircleSvg from '../../svg/accountCircleSvg';
import BasicDateInput from '../../form/inputDateBasic';
import NumberInput from '../../form/inputNumber';
import SelectInput from '../../form/inputSelect';
import AddBoxSvg from '../../svg/addBoxSvg';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';
import { 
  handleBasicDateInput, 
  handleMultipleSelectOption,  
  handleNumberInput,
} from '../../../store/dashboard/dashboard.actions';
import { 
  addAppointment,
  clearAddAppointment,
} from '../../../store/firestore/appointment/appointment.actions';

class modalUpdateApp extends Component {
  render() {
    let { 
      addDateInput,
      addMaxQueueInput,
      addMaxQueueInputError,
      addStartHours,
      addStartMinutes,
      addEndHours,
      addEndMinutes,
      addDisableStatus,
      handleBasicDateInput,
      hours,
      minutes,
      handleMultipleSelectOption,
      handleNumberInput,
      loadingStatus,
      selectedBarber,
      addAppointmentErrors,
      addAppointment,
      clearAddAppointment,
    } = this.props
    // console.log('modalAddApp', this.props)
    const options = {
      ready: function() {
        document.getElementById('addDate').value = ""
      }
    }
    return (
      <Modal
        modalOptions={ options }
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Add New Appointment</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close" onClick={ () => clearAddAppointment() }>
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Container-wrap-center-cross Padding-t-5">
            <AddBoxSvg width="2.5em" height="2.5em" color="#f68606" />
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
            <div className="col m5 No-padding Margin-b-10" style={{ marginTop: '0.9rem' }}>
              <BasicDateInput 
                inputId="addDate"
                className="input-field Input-date-box"
                inputLabelStatus={ true }
                inputLabel="Appointment Date"
                openingStatus={ false }
                openingDate=""
                handleChangesDateFunction={ handleBasicDateInput }              
              />
            </div>
            <div className="col m2 No-padding Margin-b-10" style={{ marginTop: '1.3rem' }}>
              <NumberInput 
                inputId="addMaxQueue"
                inputLabel="Max Queue"
                inputError={ addMaxQueueInputError }
                inputValue={ addMaxQueueInput }
                handleChangesFunction={ handleNumberInput }
              />
            </div>
            <div className="col m2 No-padding Margin-b-10 Container-wrap-center" style={{ marginTop: '1.5rem' }}>
              <SelectInput 
                inputId="startHours"
                className="Margin-r-5"
                inputSize={ 4 }
                handleChangesFunction={ handleMultipleSelectOption }
                purpose="addAppointment"
                inputName="startHours"
                selectedData={ null }
                showLabel={ true }
                inputLabel="Hours"
                inputValue={ addStartHours }
                optionData={ hours }
              />
              <SelectInput 
                inputId="startMinutes"
                className=""
                inputSize={ 4 }
                handleChangesFunction={ handleMultipleSelectOption }
                purpose="addAppointment"
                inputName="startMinutes"
                selectedData={ null }
                showLabel={ true }
                inputLabel="Minutes"
                inputValue={ addStartMinutes }
                optionData={ minutes }
              />
            </div>
            <div className="col m1 No-padding Container-nowrap-center" style={{ marginTop: '1.5rem' }}>
              <div className="Manage-barber-hours-text-gray">to</div>
            </div>
            <div className="col m2 No-padding Margin-b-10 Container-wrap-center" style={{ marginTop: '1.5rem' }}>
              <SelectInput 
                inputId="endHours"
                className="Margin-r-5"
                inputSize={ 4 }
                handleChangesFunction={ handleMultipleSelectOption }
                purpose="addAppointment"
                inputName="endHours"
                selectedData={ null }
                showLabel={ true }
                inputLabel="Hours"
                inputValue={ addEndHours }
                optionData={ hours }
              />
              <SelectInput 
                inputId="endMinutes"
                className=""
                inputSize={ 4 }
                handleChangesFunction={ handleMultipleSelectOption }
                purpose="addAppointment"
                inputName="endMinutes"
                selectedData={ null }
                showLabel={ true }
                inputLabel="Minutes"
                inputValue={ addEndMinutes }
                optionData={ minutes }
              />
            </div>
            <div className="col m12 Container-wrap-center-cross Margin-b-10">
              {
                addAppointmentErrors.length > 0 ?
                <div>
                  {
                    addAppointmentErrors && addAppointmentErrors.map((error, index) => {
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
            <div className="col m12 No-margin No-padding">
              <div className="Modal-info-text"><span style={{ fontWeight: 'bold' }} >FYI</span>, newly added appointment is disabled and need to be manually editted in manage providers' tab on appointment section. Disabled appointments will not be reflected in the shop's booking website.</div>
            </div>
          </div>
          <div className="col m12 No-margin No-padding Modal-body-box Container-nowrap-end">
            {
              addDateInput.length <= 0 && 
              addMaxQueueInput.length <= 0 && 
              addStartHours.length <= 0 &&
              addStartMinutes.length <= 0 &&
              addEndHours.length <= 0 &&
              addEndMinutes.length <= 0 ?
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
                clickFunction={ addAppointment }
                data={{ 
                  addDateInput,
                  addMaxQueueInput,
                  addStartHours,
                  addStartMinutes,
                  addEndHours,
                  addEndMinutes,
                  addDisableStatus,
                  branchId: "dummyshop-bekasi",
                  selectedBarber,
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
    addDateInput: state.appointment.addDateInput,
    addMaxQueueInput: state.appointment.addMaxQueueInput,
    addMaxQueueInputError: state.appointment.addMaxQueueInputError,
    addStartHours: state.appointment.addStartHours,
    addStartMinutes: state.appointment.addStartMinutes,
    addEndHours: state.appointment.addEndHours,
    addEndMinutes: state.appointment.addEndMinutes,
    loadingStatus: state.appointment.loadingStatus,
    addAppointmentErrors: state.appointment.addAppointmentErrors,
    hours: state.nav.hours,
    minutes: state.nav.minutes,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleBasicDateInput,
  handleMultipleSelectOption,
  handleNumberInput,
  addAppointment,
  clearAddAppointment,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalUpdateApp);