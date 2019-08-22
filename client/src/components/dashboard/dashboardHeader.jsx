import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, NavItem } from 'react-materialize';

import '../../pages/dashboard/dashboardPage.css';
import './dashboard.css';
import MenuSvg from '../svg/menuSvg';
import ArrowDownSvg from '../svg/arrowDownSvg';
import StoreSvg from '../svg/storeSvg';
import OnlineStatusBox from '../statusBox/onlineStatusBox';
import { authSignOut, setOnlineStatus } from '../../store/firestore/auth/auth.actions';
import { setGrantedBranch } from '../../store/firestore/branch/branch.actions';

class dashboardHeader extends Component {
  render() {
    let {
      cookies,
      onlineStatus,
      setOnlineStatus,
      grantedBranches,
      setGrantedBranch,
      selectedBranch,
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
          <div className="Account-box">
            <Dropdown trigger={
                <div className="Container-wrap-center-cross">
                  <div className="col m3 No-margin No-padding PersonSvg-box Container-nowrap-center">
                    <StoreSvg height="1.25rem" width="1.25rem" color="#5499c3" />
                  </div>
                  <div className="col m5 No-margin No-padding Text-box Container-nowrap-center-cross">
                    <div className="Account-text">{ selectedBranch.name }</div>
                  </div>
                  <div className="col m4 No-margin No-padding ArrowDownSvg-box Container-nowrap-end">
                    <ArrowDownSvg height="1.25rem" width="1.25rem" color="#5499c3" />
                  </div>
                </div>
              }>
              {
                grantedBranches && grantedBranches.map((branch, index) => {
                  return (
                    <div key={ 'branch' + index } onClick={ () => setGrantedBranch(cookies, branch.id) }>
                      <NavItem>{ branch.name }</NavItem>
                    </div>
                  )
                })
              }
            </Dropdown>
          </div>
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
    grantedBranches: state.access.grantedBranches,
    selectedBranch: state.branch.branch,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authSignOut,
  setOnlineStatus,
  setGrantedBranch,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardHeader);