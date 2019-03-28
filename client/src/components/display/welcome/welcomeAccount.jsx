import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PersonSvg from '../../svg/personSvg';
import ModalChangePassword from '../../modal/welcome/modalChangePass';
import { authSignOut } from '../../../store/firestore/auth/auth.actions';

class welcomeAccount extends Component {
  render() {
    let {
      shop,
      branch,
      user,
      authSignOut,
      cookies,
      window,
    } = this.props
    return (
      <div className="col m12 No-margin No-padding">
        <div className="col m12 No-margin No-padding Detail-account-header-box">
          <div className="col m2 No-margin No-padding Height-100cent Container-wrap-center">
            <PersonSvg height="1.75em" width="1.75em" color="#666666" />
          </div>
          <div className="col m10 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-header-text">My Account</div>
          </div>
        </div>
        <div className="col m12 No-margin No-padding Detail-account-info-box">
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-gray">My Booking Website</div>
          </div>
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="col m12 No-margin No-padding Container-wrap-center-cross">
              <a className="Url-link" href={ `https://www.bookinesia.com/shop/${shop.id}` } rel="noopener noreferrer" target="_blank">
                <div className="Detail-account-text-blue">{ `https://www.bookinesia.com/shop/${shop.id}` }</div>
              </a>
            </div>
          </div>
        </div>
        <div className="col m12 No-margin No-padding Detail-account-info-box">
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-gray">Shop</div>
          </div>
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-blue Text-capitalize">{ shop.name }</div>
          </div>
        </div>
        <div className="col m12 No-margin No-padding Detail-account-info-box">
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-gray">Branch</div>
          </div>
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-blue Text-capitalize">{ branch.name }</div>
          </div>
        </div>
        <div className="col m12 No-margin No-padding Detail-account-info-box">
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-gray">User Name</div>
          </div>
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-blue Text-capitalize">{ user.name }</div>
          </div>
        </div>
        <div className="col m12 No-margin No-padding Detail-account-info-box">
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-gray">User Authorisation</div>
          </div>
          <div className="col m12 No-margin No-padding Height-100cent Container-wrap-center-cross">
            <div className="Detail-account-text-blue Text-capitalize">{ user.job }</div>
          </div>
        </div>
        <div className="col m12 No-margin No-padding Detail-account-info-box">
          <ModalChangePassword />
        </div>
        <div className="col m12 No-margin No-padding Detail-account-info-box">
          <div className="Container-wrap-center-cross animated fadeIn faster">
            <div className="Sign-out-button" onClick={ () => authSignOut(cookies, window) }>
              <div className="Sign-out-text">Sign Out</div>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    shop: state.shop.shop,
    branch: state.branch.branch,
    user: state.auth.user,
    cookies: state.user.cookies,
    window: state.user.window,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authSignOut,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (welcomeAccount);