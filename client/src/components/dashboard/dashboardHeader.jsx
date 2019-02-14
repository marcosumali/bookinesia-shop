import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, NavItem } from 'react-materialize';

import '../../pages/dashboard/dashboardPage.css';
import './dashboard.css';
import MenuSvg from '../svg/menuSvg';
import ArrowDownSvg from '../svg/arrowDownSvg';
import PersonSvg from '../svg/personSvg';
import OnlineStatusBox from '../statusBox/onlineStatusBox';
import { authSignOut, setOnlineStatus } from '../../store/firestore/auth/auth.actions';

class dashboardHeader extends Component {
  render() {
    let {
      user,
      cookies,
      authSignOut,
      onlineStatus,
      setOnlineStatus
    } = this.props

    if (window.navigator.onLine) {
      onlineStatus = 'online'
    } else {
      onlineStatus = 'offline'
    }

    window.addEventListener('offline', () => setOnlineStatus('offline'))
    window.addEventListener('online', () => setOnlineStatus('online'))

    return (
      <div className="row No-margin Dashboard-header-box">
        <div className="Container-nowrap-start Dashboard-header-inner-box">
          <div className="Icon-box Container-nowrap-center">
            <MenuSvg height="1.25rem" width="1.25rem" color="#666666" />
          </div>
          <div className="Header-box Container-nowrap-center">
            <div className="Header-text">Bookinesia</div>
          </div>
        </div>
        <div className="Container-nowrap-end Dashboard-header-inner-box">
          <OnlineStatusBox status={ onlineStatus } />
          <Dropdown trigger={
              <div className="Account-box Container-wrap-center-cross">
                <div className="col m3 No-margin No-padding PersonSvg-box Container-nowrap-center">
                  <PersonSvg height="1.25rem" width="1.25rem" color="#5499c3" />
                </div>
                <div className="col m5 No-margin No-padding Text-box Container-nowrap-center-cross">
                  <div className="Account-text">{ user.name }</div>
                </div>
                <div className="col m4 No-margin No-padding ArrowDownSvg-box Container-nowrap-end">
                  <ArrowDownSvg height="1.25rem" width="1.25rem" color="#5499c3" />
                </div>
              </div>
            }>
            <NavItem onClick={ () => authSignOut(cookies, window) }>Sign Out</NavItem>
          </Dropdown>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    user: state.auth.user,
    cookies: state.user.cookies,
    window: state.user.window,
    onlineStatus: state.auth.onlineStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authSignOut,
  setOnlineStatus,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardHeader);