import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleChangesManageBranch, validateAndUpdateBranch, handleSingleFileInputBranch } from '../../../store/firestore/branch/branch.actions';
import { handleMultipleSelectOption, handleCancelation } from '../../../store/dashboard/dashboard.actions';
import TextInput from '../../form/inputText';
import TelephoneInput from '../../form/inputTelephone';
import SelectInput from '../../form/inputSelect';
import FileInput from '../../form/inputFile';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';

class manageBranch extends Component {
  render() {
    let {
      branch,
      branchNameInput,
      branchNameInputError,
      branchAddressInput,
      branchAddressInputError,
      branchPhoneInput,
      branchPhoneInputError,
      branchTimezoneInput,
      handleChangesManageBranch,
      timezones,
      handleMultipleSelectOption,
      handleSingleFileInputBranch,
      fileError,
      file,
      loadingStatus,
      handleCancelation,
      hasEditStatusFile,
      validateAndUpdateBranch,
    } = this.props

    return (
      <div>
        <div className="col m12 No-margin Manage-content-header-box" style={{ paddingBottom: '0.625em' }}>
          <div className="col m12 No-margin No-padding">
            <div className="Manage-content-header-text">Branch</div>
          </div>
        </div>
        <div className="col m12 No-margin" >
          <div className="col m12 No-margin No-padding Container-nowrap-center-cross">
            <div className="col m12 No-margin No-padding Container-nowrap-center">
              {
                branch.picture.length <= 0 ?
                <div className="Branch-image-empty"></div>
                :
                <img className="Branch-image-inner" src={ branch.picture } alt="inner-img"/>
              }
            </div>
          </div>
          <div className="col m12 No-margin No-padding Container-wrap-center-cross">
            <form className="col m12 No-margin No-padding Container-wrap-center-cross">
              <div className="col m12 No-padding Margin-t-10 Margin-b-10">
                <TextInput 
                  inputId="name"
                  inputLabel="Name"
                  inputError={ branchNameInputError }
                  inputValue={ branchNameInput }
                  handleChangesFunction={ handleChangesManageBranch }
                />
              </div>
              <div className="col m12 No-padding Margin-t-10 Margin-b-10">
                <TextInput 
                  inputId="address"
                  inputLabel="Address"
                  inputError={ branchAddressInputError }
                  inputValue={ branchAddressInput }
                  handleChangesFunction={ handleChangesManageBranch }
                />
              </div>
              <div className="col m12 No-padding Margin-t-10 Margin-b-10">
                <TelephoneInput 
                  inputId="phone"
                  inputLabel="Phone Number"
                  inputError={ branchPhoneInputError }
                  inputValue={ branchPhoneInput }
                  handleChangesFunction={ handleChangesManageBranch }
                />
              </div>
              <div className="col m12 No-padding Margin-t-10 Margin-b-5">
                <SelectInput 
                  inputId="timezone"
                  className=""
                  inputSize={ 12 }
                  handleChangesFunction={ handleMultipleSelectOption }
                  purpose="manageShop"
                  inputName="timezone"
                  selectedData=""
                  showLabel={ true }
                  inputLabel="Time Zone"
                  inputValue={ branchTimezoneInput }
                  optionData={ timezones }
                />
              </div>
              <div className="col m12 No-padding Margin-b-10">
                <FileInput
                  inputId="image"
                  inputLabel="Picture"
                  handleChangesFunction={ handleSingleFileInputBranch }
                  fileError={ fileError }
                />
              </div>
            </form>
          </div>
        </div>

        <div className="col m12 Container-nowrap-end Margin-b-10 Margin-t-10">
          {
            (branch.name !== branchNameInput && loadingStatus === false) ||
            (branch.address !== branchAddressInput && loadingStatus === false) ||
            (branch.phone !== branchPhoneInput && loadingStatus === false) ||
            (branch.timezone !== branchTimezoneInput && loadingStatus === false) ||
            (hasEditStatusFile && loadingStatus === false) ?
            <Button 
              text="Cancel"
              type="Btn-blue"
              clickFunction={ handleCancelation }
              data={{ functionToBeExecuted: 'setBranchInput', section: null, requiredData: branch }}
            />
            :
            <DisabledButton 
              text="Cancel"
              type="Btn-disabled"
            />
          }
          {
            (branch.name !== branchNameInput && loadingStatus === false) ||
            (branch.address !== branchAddressInput && loadingStatus === false) ||
            (branch.phone !== branchPhoneInput && loadingStatus === false) ||
            (branch.timezone !== branchTimezoneInput && loadingStatus === false) ||
            (hasEditStatusFile && loadingStatus === false) ?
            <Button 
              text="Save"
              type="Btn-white-blue"
              clickFunction={ validateAndUpdateBranch }
              data={{ branch, branchNameInput, branchAddressInput, branchPhoneInput, branchTimezoneInput, file }}
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
    branch: state.branch.branch,
    branchNameInput: state.branch.branchNameInput,
    branchNameInputError: state.branch.branchNameInputError,
    branchAddressInput: state.branch.branchAddressInput,
    branchAddressInputError: state.branch.branchAddressInputError,
    branchPhoneInput: state.branch.branchPhoneInput,
    branchPhoneInputError: state.branch.branchPhoneInputError,
    branchTimezoneInput: state.branch.branchTimezoneInput,
    timezones: state.branch.timezones,
    fileError: state.branch.branchFileInputError,
    file: state.branch.file,
    loadingStatus: state.branch.loadingStatus,
    hasEditStatusFile: state.branch.hasEditStatusFileBranch,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesManageBranch,
  handleMultipleSelectOption,
  handleSingleFileInputBranch,
  handleCancelation,
  validateAndUpdateBranch,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageBranch);

