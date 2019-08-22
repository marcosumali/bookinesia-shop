import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextInput from '../../form/inputText';
import NumberInput from '../../form/inputNumber';
import SelectInput from '../../form/inputSelect';
import SwitchInput from '../../form/inputSwitch';
import { handleChangesUpdateService, updateServiceData } from '../../../store/firestore/service/service.actions';
import { handleMultipleSelectOption, handleCheckedStatus, handleSingleCheckbox, handleCancelation } from '../../../store/dashboard/dashboard.actions';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';

class manageService extends Component {
  render() {
    let {
      serviceName,
      serviceNameError,
      serviceDuration,
      serviceDurationError,
      servicePrice,
      servicePriceError,
      handleChangesUpdateService,
      serviceTypeOptions,
      handleMultipleSelectOption,
      serviceType,
      serviceDisableStatus,
      handleCheckedStatus,
      handleSingleCheckbox,
      selectedService,
      handleCancelation,
      updateServiceData,
      loadingStatus,
    } = this.props

    return (
      <div className="col m12 No-margin No-padding">
        <div className="col m12 No-margin No-padding Margin-b-24">
          <TextInput 
            inputId="name"
            inputLabel="Service Name"
            inputError={ serviceNameError }
            inputValue={ serviceName }
            handleChangesFunction={ handleChangesUpdateService }
          />
        </div>

        <div className="col m12 No-margin No-padding Margin-b-24">
          <NumberInput 
            inputId="duration"
            inputLabel="Service Duration (Minutes)"
            inputError={ serviceDurationError }
            inputValue={ serviceDuration }
            handleChangesFunction={ handleChangesUpdateService }
          />
        </div>

        <div className="col m12 No-margin No-padding Margin-b-24">
          <NumberInput 
            inputId="price"
            inputLabel="Service Price (Rp)"
            inputError={ servicePriceError }
            inputValue={ servicePrice }
            handleChangesFunction={ handleChangesUpdateService }
          />
        </div>

        <div className="col m12 No-margin No-padding Margin-b-10">
          <SelectInput 
            inputId="type"
            className=""
            inputSize={ 12 }
            handleChangesFunction={ handleMultipleSelectOption }
            purpose="manageService"
            inputName="serviceType"
            selectedData=""
            showLabel={ true }
            inputLabel="Service Type"
            inputValue={ serviceType }
            optionData={ serviceTypeOptions }
          />
        </div>

        <div className="col m12 No-margin No-padding Margin-b-16">
          <SwitchInput 
            inputId="serviceStatus"
            inputLabel="Status"
            showLabel={ true }
            inputValue={ serviceDisableStatus }
            handleChangesFunction={ handleSingleCheckbox }
            handleCheckFunction={ handleCheckedStatus }
            checkedStatus={ serviceDisableStatus }
          />
        </div>

        <div className="col m12 No-margin No-padding Container-nowrap-end Margin-b-10">
          {
            (selectedService.name !== serviceName && loadingStatus === false) ||
            (selectedService.duration !== serviceDuration && loadingStatus === false) ||
            (selectedService.price !== servicePrice && loadingStatus === false) ||
            (selectedService.type !== serviceType && loadingStatus === false) ||
            (selectedService.disableStatus !== serviceDisableStatus && loadingStatus === false) ?
            <Button 
              text="Cancel"
              type="Btn-blue"
              clickFunction={ handleCancelation }
              data={{ functionToBeExecuted: 'reverseServiceInput', section: '', requiredData: selectedService }}
            />
            :
            <DisabledButton 
              text="Cancel"
              type="Btn-disabled"
            />
          }

          {
            (selectedService.name !== serviceName && loadingStatus === false) ||
            (selectedService.duration !== serviceDuration && loadingStatus === false) ||
            (selectedService.price !== servicePrice && loadingStatus === false) ||
            (selectedService.type !== serviceType && loadingStatus === false) ||
            (selectedService.disableStatus !== serviceDisableStatus && loadingStatus === false) ?
            <Button 
              text="Save"
              type="Btn-white-blue"
              clickFunction={ updateServiceData }
              data={{ selectedService, name: serviceName, duration: serviceDuration, price: servicePrice, type: serviceType, disableStatus: serviceDisableStatus }}
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

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    serviceName: state.service.serviceName,
    serviceNameError: state.service.serviceNameError,
    serviceDuration: state.service.serviceDuration,
    serviceDurationError: state.service.serviceDurationError,
    servicePrice: state.service.servicePrice,
    servicePriceError: state.service.servicePriceError,
    serviceType: state.service.serviceType,
    serviceTypeOptions: state.service.serviceTypeOptions,
    serviceDisableStatus: state.service.serviceDisableStatus,
    selectedService: state.service.selectedService,
    loadingStatus: state.service.loadingStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesUpdateService,
  handleMultipleSelectOption,
  handleCheckedStatus,
  handleSingleCheckbox,
  handleCancelation,
  updateServiceData,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageService);