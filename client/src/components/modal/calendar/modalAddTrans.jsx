import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import './modalInfo.css';
import CloseSvg from '../../../components/svg/closeSvg';
import AddBoxSvg from '../../svg/addBoxSvg';
// import Button from '../../button/button';
// import LoadingButton from '../../button/buttonLoading';
// import DisabledButton from '../../button/buttonDisabled';
// import { formatMoney, getTotalTransaction } from '../../../helpers/currency';

class modalAddTrans extends Component {
  render() {
    // let { 
    // } = this.props
    // let user = {
    //   type: 'Admin',
    //   id: 'ZIicQDSyxFM49MXox1dAJIK4A5C3'
    // }
   

    // console.log('modalInfo', this.props)
    return (
      <Modal
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Add New Transaction</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close">
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
            Hello          
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
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalAddTrans);

