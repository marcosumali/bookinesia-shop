import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedServicesInput, updateStaffServicesData } from '../../../store/firestore/staffService/staffService.actions';
import { handleMultipleCheckboxStatus, handleMultipleCheckbox, handleCancelation } from '../../../store/dashboard/dashboard.actions';
import CheckboxInput from '../../form/inputCheckbox';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';

class manageBarberServices extends Component {
  render() {
    // console.log('manageBarberServices', this.props)
    let { 
      services, 
      handleMultipleCheckboxStatus, 
      handleMultipleCheckbox, 
      selectedServicesInput, 
      selectedStaffServices, 
      handleCancelation, 
      hasEditStatus, 
      staffServiceInputError,
      updateStaffServicesData,
    } = this.props

    return (
      <div className="col m12 Container-wrap-center-cross Margin-b-10">
        <form className="col m12 No-margin No-padding Container-wrap-center-cross Margin-b-10">
          {
            services && services.map((service, index) => {
              return (
                <div className="col m12 No-margin No-padding Manage-barber-service-box" key={ 'service' + index }>
                  <CheckboxInput 
                    inputData={ service }
                    handleChangesFunction={ handleMultipleCheckbox }
                    handleCheckedFunction={ handleMultipleCheckboxStatus }
                    multipleData={ selectedServicesInput }
                  />
                </div>
              )
            })
          }
        </form>
        <div className="col m12 No-margin No-padding Container-nowrap-center Margin-b-10">
          <div className="Input-info-error">{ staffServiceInputError }</div>
        </div>
        <div className="col m12 No-margin No-padding Container-nowrap-end Margin-b-10">
          {
            hasEditStatus ?
            <Button 
              text="Cancel"
              type="Btn-blue"
              clickFunction={ handleCancelation }
              data={{ functionToBeExecuted: 'setSelectedServicesInput', section: 'services', requiredData: { uniqueStatus: true, staffServices: selectedStaffServices }}}
            />
            :
            <DisabledButton 
              text="Cancel"
              type="Btn-disabled"
            />
          }
          {
            hasEditStatus ?
            <Button 
              text="Save"
              type="Btn-white-blue"
              clickFunction={ updateStaffServicesData }
              data={{ staffServices: selectedStaffServices, servicesInput: selectedServicesInput }}
            />
            :
            <DisabledButton 
              text="Save"
              type="Btn-disabled"
            />
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    services: state.service.services,
    selectedBarber: state.staff.selectedBarber,
    selectedStaffServices: state.staffService.selectedStaffServices,
    selectedServicesInput: state.staffService.selectedServicesInput,
    hasEditStatus: state.staffService.hasEditStatus,
    staffServiceInputError: state.staffService.staffServiceInputError,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setSelectedServicesInput,
  handleMultipleCheckboxStatus,
  handleMultipleCheckbox,
  handleCancelation,
  updateStaffServicesData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageBarberServices);