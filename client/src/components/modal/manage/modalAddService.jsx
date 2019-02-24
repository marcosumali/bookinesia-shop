import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../svg/closeSvg';
import AddBoxSvg from '../../svg/addBoxSvg';
import TextInput from '../../form/inputText';
import NumberInput from '../../form/inputNumber';
import SelectInput from '../../form/inputSelect';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';
import { handleChangesAddService, addServiceData, clearAddServiceData } from '../../../store/firestore/service/service.actions';
import { handleMultipleSelectOption } from '../../../store/dashboard/dashboard.actions';

class modalAddService extends Component {
  render() {
    let {
      addServiceName,
      addServiceNameError,
      addServiceDuration,
      addServiceDurationError,
      addServicePrice,
      addServicePriceError,
      addServiceType,
      serviceTypeOptions,
      loadingStatus,
      handleChangesAddService,
      handleMultipleSelectOption,
      addServiceData,
      clearAddServiceData,
      services,
      barbers,
      user,
    } = this.props

    return (
      <Modal
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Add New Service</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close" onClick={ () => clearAddServiceData() }>
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Container-wrap-center-cross">
            <AddBoxSvg width="2em" height="2em" color="#f68606" />
          </div>
        }>
        <div className="row No-margin">
          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m12 No-margin No-padding Margin-b-16">
              <TextInput 
                inputId="name"
                inputLabel="Service Name"
                inputError={ addServiceNameError }
                inputValue={ addServiceName }
                handleChangesFunction={ handleChangesAddService }
              />
            </div>

            <div className="col m12 No-margin No-padding Margin-b-16">
              <NumberInput 
                inputId="duration"
                inputLabel="Service Duration (Minutes)"
                inputError={ addServiceDurationError }
                inputValue={ addServiceDuration }
                handleChangesFunction={ handleChangesAddService }
              />
            </div>

            <div className="col m12 No-margin No-padding Margin-b-16">
              <NumberInput 
                inputId="price"
                inputLabel="Service Price (Rp)"
                inputError={ addServicePriceError }
                inputValue={ addServicePrice }
                handleChangesFunction={ handleChangesAddService }
              />
            </div>

            <div className="col m12 No-margin No-padding Margin-b-24">
              <SelectInput 
                inputId="type"
                className=""
                inputSize={ 12 }
                handleChangesFunction={ handleMultipleSelectOption }
                purpose="addService"
                inputName="serviceType"
                selectedData=""
                showLabel={ true }
                inputLabel="Service Type"
                inputValue={ addServiceType }
                optionData={ serviceTypeOptions }
              />
            </div>

            <div className="col m12 No-margin No-padding Margin-b-10">
              <div className="Modal-info-text"><span style={{ fontWeight: 'bold' }} >FYI</span>, newly added service's status is disabled and need to be manually editted in manage services' tab. Disabled services will not be reflected in the shop's booking website.</div>
            </div>
          </div>
          <div className="col m12 No-margin No-padding Modal-body-box Container-nowrap-end">
            {
              addServiceName.length <= 0 && 
              addServiceDuration.length <= 0 && 
              addServicePrice.length <= 0 && 
              addServiceNameError === false && 
              addServiceDurationError === false && 
              addServicePriceError === false && 
              loadingStatus === false ?
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
                clickFunction={ addServiceData }
                data={{ 
                  services, 
                  name: addServiceName, 
                  duration: addServiceDuration,
                  price: addServicePrice,
                  type: addServiceType,
                  branchId: user.branchId, 
                  staffs: barbers 
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
    addServiceName: state.service.addServiceName,
    addServiceNameError: state.service.addServiceNameError,
    addServiceDuration: state.service.addServiceDuration,
    addServiceDurationError: state.service.addServiceDurationError,
    addServicePrice: state.service.addServicePrice,
    addServicePriceError: state.service.addServicePriceError,
    addServiceType: state.service.addServiceType,
    serviceTypeOptions: state.service.serviceTypeOptions,
    loadingStatus: state.service.loadingStatus,
    services: state.service.allServices,
    barbers: state.staff.allBarbers,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesAddService,
  handleMultipleSelectOption,
  addServiceData, 
  clearAddServiceData,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalAddService);