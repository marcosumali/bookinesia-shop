import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../../components/svg/closeSvg';
import PasswordInput from '../../form/inputPassword';
import { handleChangesPassword, authChangePasswordValidation, clearAuthChangePassword } from '../../../store/firestore/auth/auth.actions';
import Button from '../../button/button';
import LoadingButton from '../../button/buttonLoading';

class modalChangePass extends Component {
  render() {    
    let {
      handleChangesPassword,
      oldPassword,
      oldPasswordError,
      newPassword,
      newPasswordError,
      newPasswordConfirm,
      newPasswordConfirmError,
      passwordChangeErrors,
      loadingStatus,
      authChangePasswordValidation,
      authUser,
      clearAuthChangePassword
    } = this.props

    // console.log('modalChangePass', this.props)
    return (
      <Modal
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Change Password</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close" onClick={ () => clearAuthChangePassword() }>
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Container-wrap-center-cross animated fadeIn faster">
            <div className="Change-button">
              <div className="Change-text">Change Password</div>
            </div>
          </div>
        }>
        <div className="row No-margin">
          <form className="col m12 Password-form-box">
            <div className="col m12 No-margin No-padding Margin-b-16">
              <PasswordInput 
                inputId="oldPassword"
                inputLabel="Old Password"
                inputError={ oldPasswordError }
                inputValue={ oldPassword }
                handleChangesFunction={ handleChangesPassword }
              />
            </div>
            <div className="col m12 No-margin No-padding Margin-b-16">
              <PasswordInput 
                inputId="newPassword"
                inputLabel="New Password"
                inputError={ newPasswordError }
                inputValue={ newPassword }
                handleChangesFunction={ handleChangesPassword }
              />
            </div>
            <div className="col m12 No-margin No-padding Margin-b-16">
              <PasswordInput 
                inputId="newPasswordConfirm"
                inputLabel="New Password Confirmation"
                inputError={ newPasswordConfirmError }
                inputValue={ newPasswordConfirm }
                handleChangesFunction={ handleChangesPassword }
              />
            </div>
            <div className="col m12 No-margin No-paddingMargin-b-16">
              {
                passwordChangeErrors.length > 0 ?
                <div>
                  {
                    passwordChangeErrors && passwordChangeErrors.map((error, index) => {
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
          </form>
          <div className="col m12 No-margin No-padding Password-button-form-box">
            <div className="col m12 No-margin No-padding Container-wrap-end">
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
                  clickFunction={ authChangePasswordValidation }
                  data={{ oldPassword, newPassword, newPasswordConfirm, user: authUser }}
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
    authUser: state.auth.user,
    oldPassword: state.auth.oldPassword,
    oldPasswordError: state.auth.oldPasswordError,
    newPassword: state.auth.newPassword,
    newPasswordError: state.auth.newPasswordError,
    newPasswordConfirm: state.auth.newPasswordConfirm,
    newPasswordConfirmError: state.auth.newPasswordConfirmError,
    passwordChangeErrors: state.auth.passwordChangeErrors,
    loadingStatus: state.auth.loadingStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesPassword,
  authChangePasswordValidation,
  clearAuthChangePassword
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalChangePass);

