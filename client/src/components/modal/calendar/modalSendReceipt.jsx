import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../svg/closeSvg';
import IconButton from '../../button/buttonIcon';
import Button from '../../button/button';
import LoadingButton from '../../button/buttonLoading';
import EmailInput from '../../form/inputEmail';
import {
  handleChangesSendEmailReceipt,
  sendEmailReceipt,
  setInitialSendEmailReceipt
} from '../../../store/firestore/transaction/transaction.actions';

class modalSendReceipt extends Component {
  render() {
    let {
      transaction,
      handleChangesSendEmailReceipt,
      sendEmailReceipt,
      loadingStatus,
      sendEmailError,
      sendEmailInput,
      setInitialSendEmailReceipt
    } = this.props

    const options = {
      ready: function() {
        setInitialSendEmailReceipt(transaction.email)
       }
    }
    return (
      <Modal
        modalOptions={ options }
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Send Receipt</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close">
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Height-100cent Container-nowrap-center">
            <IconButton text="receipt"/>
          </div>
        }>
        <div className="row No-margin">
          <div className="col m12 No-margin No-padding Modal-body-box">
            <EmailInput 
              inputId="email"
              inputLabel="Email"
              inputError={ sendEmailError }
              inputValue={ sendEmailInput }
              handleChangesFunction={ handleChangesSendEmailReceipt }
            />
          </div>
          <div className="col m12 No-margin No-padding Modal-body-box Container-nowrap-end">
            {
              loadingStatus ?
              <LoadingButton 
                type="Btn-white-blue Container-nowrap-center"
                color="#ffffff"
              />
              :
              <Button 
                text="Send"
                type="Btn-white-blue"
                clickFunction={ sendEmailReceipt }
                data={{ transaction, email: sendEmailInput }}
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
    loadingStatus: state.transaction.sendEmailLoadingStatus,
    sendEmailError: state.transaction.sendEmailError,
    sendEmailInput: state.transaction.sendEmailInput,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesSendEmailReceipt,
  sendEmailReceipt,
  setInitialSendEmailReceipt,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalSendReceipt);

