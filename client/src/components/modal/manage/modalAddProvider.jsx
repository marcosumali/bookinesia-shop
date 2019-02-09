import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../svg/closeSvg';
import AddBoxSvg from '../../svg/addBoxSvg';
import TextInput from '../../form/inputText';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';
import { handleChangesAddBarber, addNewStaffAndOtherData, clearAddBarberData } from '../../../store/firestore/staff/staff.actions';

class modalAddProvider extends Component {
  render() {
    let { 
      addBarberName, 
      addBarberNameError,
      handleChangesAddBarber,
      addNewStaffAndOtherData,
      barbers,
      services,
      clearAddBarberData,
      loadingStatus,
      user,
    } = this.props
    // console.log('modalAddBarber', this.props)
    return (
      <Modal
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Add New Provider</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close" onClick={ () => clearAddBarberData() }>
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Container-wrap-center-cross">
            <AddBoxSvg width="80%" height="80%" color="#f68606" />
          </div>
        }>
        <div className="row No-margin">
          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m12 No-margin No-padding Margin-b-16">
              <TextInput 
                inputId="name"
                inputLabel="Name"
                inputError={ addBarberNameError }
                inputValue={ addBarberName }
                handleChangesFunction={ handleChangesAddBarber }
              />
            </div>
            <div className="col m12 No-margin No-padding Margin-b-10">
              <div className="Modal-info-text"><span style={{ fontWeight: 'bold' }} >FYI</span>, newly added provider's attributes including details, provided services and schedules are disabled and need to be manually editted in manage providers' tab. Disabled providers will not be reflected in the shop's booking website.</div>
            </div>
          </div>
          <div className="col m12 No-margin No-padding Modal-body-box Container-nowrap-end">
            {
              addBarberName.length <= 0 && addBarberNameError === false && loadingStatus === false ?
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
                clickFunction={ addNewStaffAndOtherData }
                data={{ barbers, newBarberName: addBarberName, branchId: user.branchId, services }}
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
    addBarberName: state.staff.addBarberName,
    addBarberNameError: state.staff.addBarberNameError,
    barbers: state.staff.allBarbers,
    services: state.service.services,
    loadingStatus: state.staff.loadingStatus,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesAddBarber,
  addNewStaffAndOtherData,
  clearAddBarberData
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalAddProvider);