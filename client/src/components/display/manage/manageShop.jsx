import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextInput from '../../form/inputText';
import FileInput from '../../form/inputFile';
import AccountCircleSvg from '../../svg/accountCircleSvg';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import LoadingButton from '../../button/buttonLoading';
import { handleSingleFileInput, handleCancelation } from '../../../store/dashboard/dashboard.actions';
import { handleChangesManageShop, validateAndUpdateShop } from '../../../store/firestore/shop/shop.actions';

class manageShop extends Component {
  render() {
    let {
      shop,
      shopNameInput,
      shopNameInputError,
      fileError,
      handleChangesManageShop,
      handleSingleFileInput,
      handleCancelation,
      loadingStatus,
      hasEditStatusFile,
      validateAndUpdateShop,
      file,
    } = this.props
    // console.log('manageShop', this.props)
    return (
      <div>
        <div className="col m12 No-margin Manage-content-header-box" style={{ paddingBottom: '0.625em' }}>
          <div className="col m12 No-margin No-padding">
            <div className="Manage-content-header-text">Shop</div>
          </div>
        </div>
        <div className="col m12 No-margin" style={{ padding: '0.625em', paddingTop: '1em' }}>
          <div className="col m3 No-margin No-padding Container-nowrap-center-cross"  style={{ height: '5.5em' }}>
            <div className="col m12 No-margin No-padding Container-nowrap-center">
              {
                shop.logo.length <= 0 ?
                <AccountCircleSvg className="" width="100%" height="100%" color="#666666" />
                :
                <img className="Shop-image-inner" src={ shop.logo } alt="inner-img"/>
              }
            </div>
          </div>
          <div className="col m9 No-margin No-padding Container-wrap-center-cross">
            <form className="col m12 No-margin No-padding Container-wrap-center-cross">
              <div className="col m11 Margin-l-10 Margin-b-10" style={{ paddingRight: "0px" }}>
                <TextInput 
                  inputId="name"
                  inputLabel="Name"
                  inputError={ shopNameInputError }
                  inputValue={ shopNameInput }
                  handleChangesFunction={ handleChangesManageShop }
                />
              </div>
              <div className="col m11 Margin-l-10 Margin-b-10" style={{ paddingRight: "0px" }}>
                <FileInput
                  inputId="image"
                  inputLabel="Logo"
                  handleChangesFunction={ handleSingleFileInput }
                  fileError={ fileError }
                />
              </div>
            </form>
          </div>
        </div>

        <div className="col m12 Container-nowrap-end Margin-b-10 Margin-t-10">
          {
            (shop.name !== shopNameInput && loadingStatus === false) || 
            (hasEditStatusFile && loadingStatus === false) ?
            <Button 
              text="Cancel"
              type="Btn-blue"
              clickFunction={ handleCancelation }
              data={{ functionToBeExecuted: 'setShopInput', section: null, requiredData: shop }}
            />
            :
            <DisabledButton 
              text="Cancel"
              type="Btn-disabled"
            />
          }
          {
            (shop.name !== shopNameInput && loadingStatus === false) || 
            (hasEditStatusFile && loadingStatus === false) ?
            <Button 
              text="Save"
              type="Btn-white-blue"
              clickFunction={ validateAndUpdateShop }
              data={{ shop, shopNameInput, file }}
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
    shop: state.shop.shop,
    shopNameInput: state.shop.shopNameInput,
    shopNameInputError: state.shop.shopNameInputError,
    fileError: state.nav.fileError,
    file: state.nav.file,
    loadingStatus: state.shop.loadingStatus,
    hasEditStatusFile: state.nav.hasEditStatusFile,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleChangesManageShop,
  handleSingleFileInput,
  handleCancelation,
  validateAndUpdateShop,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageShop);
