import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../../components/svg/closeSvg';
import AccountCircleSvg from '../../../components/svg/accountCircleSvg';
import AddBoxSvg from '../../svg/addBoxSvg';
import TextInput from '../../form/inputText';
import TelephoneInput from '../../form/inputTelephone';
import EmailInput from '../../form/inputEmail';
import CheckboxInput from '../../form/inputCheckbox';
import RadioInput from '../../form/inputRadio';
import Button from '../../button/button';
import LoadingButton from '../../button/buttonLoading';
import { formatMoney, getTotalTransaction } from '../../../helpers/currency';
import { returnWhatDay, returnWhatMonth } from '../../../helpers/date';
import { handleMultipleCheckboxStatus, handleMultipleCheckbox, handleRadio } from '../../../store/dashboard/dashboard.actions';
import { handleChangesNewTransaction, validateAndAddNewTransaction, clearAddTransaction } from '../../../store/firestore/transaction/transaction.actions';

class modalAddTrans extends Component {
  render() {
    let {
      shop,
      branch,
      barber,
      selectedDate,
      handleChangesNewTransaction,
      addName,
      addNameError,
      addEmail,
      addEmailError,
      addPhone,
      addPhoneError,
      selectedPrimaryService,
      selectedSecondaryServices,
      services,
      handleMultipleCheckbox,
      handleMultipleCheckboxStatus,
      handleRadio,
      validateAndAddNewTransaction,
      transactionErrors,
      loadingStatus,
      clearAddTransaction,
      authUser,
    } = this.props
    let appointmentDate = `${returnWhatDay(new Date(selectedDate).getDay())}, ${new Date(selectedDate).getDate()} ${returnWhatMonth(new Date(selectedDate).getMonth())} ${new Date(selectedDate).getFullYear()}`

    let primaryServices = []
    let secondaryServices = []
    services && services.map((service) => {
      if (service.type === 'primary') {
        primaryServices.push(service)
      } else if (service.type === 'secondary') {
        secondaryServices.push(service)
      }
      return ''
    })

    let selectedServicesId = [ selectedPrimaryService, ...selectedSecondaryServices ]

    let selectedServices = []
    selectedServicesId && selectedServicesId.map(serviceId => {
      if (serviceId !== "") {
        let serviceIndex = services.findIndex(service => service.id === serviceId)
        selectedServices.push(services[serviceIndex])
      }
      return ''
    })

    let user = {
      type: authUser.job,
      id: authUser.id
    }
  
    return (
      <Modal
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Add New Transaction</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close" onClick={ () => clearAddTransaction() }>
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Height-100cent Container-nowrap-center">
            <AddBoxSvg height="1.6em" width="1.6em" color="#F68606"/>
          </div>
        }>
        <div className="row No-margin">
          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m12 No-margin No-padding Container-nowrap-center-cross">
              <div className="col m1 No-margin No-padding Container-nowrap-center Barber-image-box">
                {
                  barber.picture.length <= 0 ?
                  <AccountCircleSvg className="" width="100%" height="100%" color="#666666" />
                  :
                  <img className="Barber-image" src={ barber.picture } alt={ "selectedImage" }/>
                }
              </div>
              <div className="col m11 No-margin No-padding Container-wrap-center-cross">
                <div className="col m12 No-margin No-padding">
                  <div className="Manage-text" style={{ fontSize: '1em' }} >{ barber.name }</div>
                </div>
                <div className="col m12 No-margin No-padding">
                  <div className="Modal-text-orange Margin-b-5">Appointment Date: { appointmentDate }</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m12 No-margin No-padding Margin-b-16">
              <TextInput 
                inputId="name"
                inputLabel="Name"
                inputError={ addNameError }
                inputValue={ addName }
                handleChangesFunction={ handleChangesNewTransaction }
              />
            </div>
            <div className="col m12 No-margin No-padding Margin-b-16">
              <TelephoneInput 
                inputId="phone"
                inputLabel="Phone Number"
                inputError={ addPhoneError }
                inputValue={ addPhone }
                handleChangesFunction={ handleChangesNewTransaction }
              />
            </div>
            <div className="col m12 No-margin No-padding Margin-b-16">
              <EmailInput 
                inputId="email"
                inputLabel="Email"
                inputError={ addEmailError }
                inputValue={ addEmail }
                handleChangesFunction={ handleChangesNewTransaction }
              />
            </div>
          </div>
          
          <form className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m6 No-margin No-padding Margin-b-5">
              <div className="Modal-text-blue">Choose Services</div>
            </div>
            <div className="col m6 No-margin No-padding Margin-b-5">
              <div className="Modal-text-blue">Additional Services</div>
            </div>
            <div className="col m6 No-margin No-padding Margin-b-10" style={{ paddingRight: '0.625em' }}>
              {
                primaryServices && primaryServices.map((service, index) => {
                  return (
                  <div className="col m12 No-margin No-padding Margin-b-5" key={ 'service' + index }>
                    <div className="col m12 No-margin No-padding">
                      <RadioInput 
                        inputData={ service }
                        handleChangesFunction={ handleRadio }
                        purpose="addNewTransaction"
                        className="Modal-text-blue"
                        selectedDataId={ selectedPrimaryService }
                        groupId="group1"
                        checkedStatus={ true }
                      />
                    </div>
                    <div className="col m12 No-margin No-padding">
                      <div className="col m6 Container-nowrap-start">
                        <div className="Modal-text-gray" style={{ paddingLeft: '1.75em' }}>{ service.duration } minutes</div>
                      </div>
                      <div className="col m6 Container-nowrap-end">
                        <div className="Modal-text-gray">{ service.currency } { formatMoney(service.price) }</div>
                      </div>
                    </div>
                  </div>
                  )
                })
              }
            </div>
            <div className="col m6 No-margin No-padding Margin-b-10" style={{ paddingRight: '0.625em' }}>
              {
                secondaryServices && secondaryServices.map((service, index) => {
                  return (
                    <div className="col m12 No-margin No-padding Margin-b-5" key={ 'service' + index }>
                      <div className="col m12 No-margin No-padding">
                        <CheckboxInput 
                          inputData={ service }
                          handleChangesFunction={ handleMultipleCheckbox }
                          handleCheckedFunction={ handleMultipleCheckboxStatus }
                          multipleData={ selectedSecondaryServices }
                          purpose="addNewTransaction"
                          checkedStatus={ true }
                          className="Modal-text-blue"
                          groupId="group2"
                        />
                      </div>
                      <div className="col m12 No-margin No-padding">
                        <div className="col m6 Container-nowrap-start">
                          <div className="Modal-text-gray" style={{ paddingLeft: '1.75em' }}>{ service.duration } minutes</div>
                        </div>
                        <div className="col m6 Container-nowrap-end">
                          <div className="Modal-text-gray">{ service.currency } { formatMoney(service.price) }</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="col m12 No-margin No-padding Margin-b-10">
              {
                transactionErrors && transactionErrors.map((error, index) => {
                  return (
                    <div className="Input-info-error" key={ 'error' + index }>{ index + 1 }. { error }</div>
                  )
                })
              }
            </div>
          </form>

          <div className="col m12 No-margin No-padding Modal-body-box Container-nowrap-center-cross">
            <div className="col m6 Container-nowrap-start">
              <div className="Modal-text-gray">Total Amount: { selectedServices.length > 0 ? selectedServices[0].currency : "" } { formatMoney(getTotalTransaction(selectedServices)) }</div>
            </div>
            <div className="col m6 Container-nowrap-end">
              {
                loadingStatus ?
                <LoadingButton 
                  type="Btn-white-blue Container-nowrap-center"
                  color="#ffffff"
                />
                :
                <Button 
                  text="Save"
                  type="Btn-white-blue"
                  clickFunction={ validateAndAddNewTransaction }
                  data={{ name: addName, phone: addPhone, email: addEmail, selectedServices, branch, staff: barber, date: selectedDate, shop, user }}
                />
              }
            </div>
          </div>

        </div>
      </Modal>
    )
  }
}


const mapStateToProps = state => {
  return {
    shop: state.shop.shop,
    branch: state.branch.branch,
    selectedDate: state.appointment.selectedDate,
    addName: state.transaction.addName,
    addNameError: state.transaction.addNameError,
    addPhone: state.transaction.addPhone,
    addPhoneError: state.transaction.addPhoneError,
    addEmail: state.transaction.addEmail,
    addEmailError: state.transaction.addEmailError,
    services: state.service.services,
    selectedPrimaryService: state.transaction.selectedPrimaryService,
    selectedSecondaryServices: state.transaction.selectedSecondaryServices,
    transactionErrors: state.transaction.transactionErrors,
    loadingStatus: state.transaction.loadingStatus,
    authUser: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesNewTransaction,
  handleMultipleCheckboxStatus,
  handleMultipleCheckbox,
  handleRadio,
  validateAndAddNewTransaction,
  clearAddTransaction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalAddTrans);

