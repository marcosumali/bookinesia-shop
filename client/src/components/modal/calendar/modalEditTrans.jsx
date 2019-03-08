import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../../components/svg/closeSvg';
import AccountCircleSvg from '../../../components/svg/accountCircleSvg';
import TextInput from '../../form/inputText';
import TelephoneInput from '../../form/inputTelephone';
import EmailInput from '../../form/inputEmail';
import CheckboxInput from '../../form/inputCheckbox';
import RadioInput from '../../form/inputRadio';
import Button from '../../button/button';
import LoadingButton from '../../button/buttonLoading';
import { formatMoney, getTotalTransaction } from '../../../helpers/currency';
import { returnWhatDay, returnWhatMonth, returnAcceptedDate } from '../../../helpers/date';
import { handleMultipleCheckboxStatus, handleMultipleCheckbox, handleRadio } from '../../../store/dashboard/dashboard.actions';
import { handleChangesEditTransaction, validateAndEditTransaction, clearEditTransaction, setInitialTransaction } from '../../../store/firestore/transaction/transaction.actions';

class modalEditTrans extends Component {
  doNothing() {
  }

  render() {
    let {
      transaction,
      barber,
      selectedDate,
      handleChangesEditTransaction,
      editName,
      editNameError,
      editEmail,
      editEmailError,
      editPhone,
      editPhoneError,
      selectedPrimaryService,
      selectedSecondaryServices,
      services,
      handleMultipleCheckbox,
      handleMultipleCheckboxStatus,
      handleRadio,
      validateAndEditTransaction,
      transactionErrors,
      loadingStatus,
      clearEditTransaction,
      authUser,
      setInitialTransaction,
    } = this.props
    let acceptedDate = returnAcceptedDate(selectedDate)
    let appointmentDate = `${returnWhatDay(new Date(acceptedDate).getDay())}, ${new Date(acceptedDate).getDate()} ${returnWhatMonth(new Date(acceptedDate).getMonth())} ${new Date(acceptedDate).getFullYear()}`

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

    const options = {
      dismissible: false,
      ready: function() {
        setInitialTransaction(transaction.name, transaction.phone, transaction.email)
      }
    }
    return (
      <Modal
        modalOptions={ options }
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Edit Transaction</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close" onClick={ () => clearEditTransaction() }>
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Height-100cent Container-nowrap-center">
            <Button 
              text="Edit"
              type="Btn-white-blue No-margin"
              clickFunction={ () => this.doNothing() }
              data=""
            />
          </div>
        }>
        <div className="row No-margin">
          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m12 No-margin No-padding Container-nowrap-center-cross Margin-b-10">
              <div className="Modal-text-gray"><span style={{ fontWeight: 'bold' }}>Transaction Code : </span>{ transaction.id }</div>
            </div>
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
                  <div className="Modal-text-orange Margin-b-5">Appointment Date : { appointmentDate }</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m12 No-margin No-padding Margin-b-16">
              <TextInput 
                inputId="name"
                inputLabel="Name"
                inputError={ editNameError }
                inputValue={ editName }
                handleChangesFunction={ handleChangesEditTransaction }
              />
            </div>
            <div className="col m12 No-margin No-padding Margin-b-16">
              <TelephoneInput 
                inputId="phone"
                inputLabel="Phone Number"
                inputError={ editPhoneError }
                inputValue={ editPhone }
                handleChangesFunction={ handleChangesEditTransaction }
              />
            </div>
            <div className="col m12 No-margin No-padding Margin-b-16">
              <EmailInput 
                inputId="email"
                inputLabel="Email"
                inputError={ editEmailError }
                inputValue={ editEmail }
                handleChangesFunction={ handleChangesEditTransaction }
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
            <div className="col m6 No-margin No-padding  Margin-b-10" style={{ paddingRight: '0.625em' }}>
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
            <div className="col m6 No-padding No-margin Margin-b-10" style={{ paddingRight: '0.625em' }}>
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
                  clickFunction={ validateAndEditTransaction }
                  data={{ name: editName, phone: editPhone, email: editEmail, selectedServices, transaction, user }}
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
    editName: state.transaction.editName,
    editNameError: state.transaction.editNameError,
    editPhone: state.transaction.editPhone,
    editPhoneError: state.transaction.editPhoneError,
    editEmail: state.transaction.editEmail,
    editEmailError: state.transaction.editEmailError,
    services: state.service.services,
    selectedPrimaryService: state.transaction.selectedPrimaryService,
    selectedSecondaryServices: state.transaction.selectedSecondaryServices,
    transactionErrors: state.transaction.transactionErrors,
    loadingStatus: state.transaction.loadingStatus,
    authUser: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesEditTransaction,
  handleMultipleCheckboxStatus,
  handleMultipleCheckbox,
  handleRadio,
  validateAndEditTransaction,
  clearEditTransaction,
  setInitialTransaction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalEditTrans);

