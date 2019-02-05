import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleSingleCheckbox, handleCheckedStatus, handleCancelation, handleSingleFileInput } from '../../../store/dashboard/dashboard.actions';
import { handleChangesManageBarbers, updateBarberDataValidation } from '../../../store/firestore/staff/staff.actions';
import TextInput from '../../form/inputText';
import SwitchInput from '../../form/inputSwitch';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';
import FileInput from '../../form/inputFile';
import AccountCircleSvg from '../../svg/accountCircleSvg';

class manageBarberDetails extends Component {
  render() {
    let { 
      selectedBarber, 
      barberName, 
      barberNameError, 
      handleChangesManageBarbers, 
      handleSingleCheckbox, 
      barberDisableStatus, 
      handleCheckedStatus,
      updateBarberDataValidation,
      handleCancelation,
      fileSizeError,
      handleSingleFileInput,
      file,
      hasEditStatusFile,
      loadingStatus,
    } = this.props
    // console.log('manageBarberDetails', this.props)
    return (
      <div className="col m12 Container-wrap-center-cross Margin-b-10">
        <div className="col m11 Container-nowrap-center-cross Margin-b-16">
          <div className="col m3 offset-m1 l2">
            <div className="col m12 No-margin No-padding">
              {
                selectedBarber.picture.length <= 0 ?
                <AccountCircleSvg className="" width="100%" height="100%" color="#666666" />
                :
                <img className="Barber-image-inner" src={ selectedBarber.picture } alt="inner-img"/>
              }
            </div>
          </div>
          <div className="col m7 offset-m1 l10 Container-wrap-center-cross">
            <form className="col m12 No-margin No-padding Container-wrap-center-cross">
              <div className="col m11 Margin-l-10 Margin-b-10">
                <TextInput 
                  inputId="name"
                  inputLabel="Name"
                  inputError={ barberNameError }
                  inputValue={ barberName }
                  handleChangesFunction={ handleChangesManageBarbers }
                />
              </div>
              <div className="col m11 Margin-l-10 Margin-b-10">
                <SwitchInput 
                  inputId="barberStatus"
                  inputLabel="Status"
                  showLabel={ true }
                  inputValue={ barberDisableStatus }
                  handleChangesFunction={ handleSingleCheckbox }
                  handleCheckFunction={ handleCheckedStatus }
                  checkedStatus={ barberDisableStatus }
                />
              </div>
              <div className="col m11 Margin-l-10 Margin-b-10">
                <FileInput
                  inputId="image"
                  inputLabel="Picture"
                  handleChangesFunction={ handleSingleFileInput }
                  fileSizeError={ fileSizeError }
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col m12 No-margin No-padding Container-nowrap-end Margin-b-10">
          {
            (selectedBarber.name !== barberName && loadingStatus === false) || 
            (selectedBarber.disableStatus !== barberDisableStatus && loadingStatus === false) ||
            (hasEditStatusFile && loadingStatus === false) ?
            <Button 
              text="Cancel"
              type="Btn-blue"
              clickFunction={ handleCancelation }
              data={{ functionToBeExecuted: 'setBarberInfo', section: 'details', requiredData: selectedBarber }}
            />
            :
            <DisabledButton 
              text="Cancel"
              type="Btn-disabled"
            />
          }
          {
            (selectedBarber.name !== barberName && loadingStatus === false) || 
            (selectedBarber.disableStatus !== barberDisableStatus && loadingStatus === false) ||
            (hasEditStatusFile && loadingStatus === false) ?
            <Button 
              text="Save"
              type="Btn-white-blue"
              clickFunction={ updateBarberDataValidation }
              data={{ selectedBarber, name: barberName, disableStatus: barberDisableStatus, file, branchId: 'dummyshop-bekasi' }}
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
    selectedBarber: state.staff.selectedBarber,
    barberName: state.staff.barberName,
    barberNameError: state.staff.barberNameError,
    barberDisableStatus: state.staff.barberDisableStatus,
    activeTab: state.nav.activeTab,
    fileSizeError: state.staff.fileSizeError,
    file: state.nav.file,
    hasEditStatusFile: state.staff.hasEditStatusFile,
    loadingStatus: state.staff.loadingStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesManageBarbers,
  handleSingleCheckbox,
  handleCheckedStatus,
  updateBarberDataValidation,
  handleCancelation,
  handleSingleFileInput
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageBarberDetails);