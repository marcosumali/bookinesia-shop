import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import '../../assets/css/general.css';
import './dashboardPage.css';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import DashboardMenu from '../../components/dashboard/dashboardMenu';
import DashboardDisplay from '../../components/dashboard/dashboardDisplay';
import { setCookies, setWindow } from '../../store/firestore/management/management.actions';
import { getDMSCookies } from '../../store/dashboard/dashboard.actions';
import { handleCookies } from '../../store/firestore/auth/auth.actions';

class dashboardPage extends Component {
  componentWillMount() {
    let cookiesFunction = this.props.cookies
    this.props.setCookies(cookiesFunction)
    this.props.setWindow(window)
    this.props.getDMSCookies(cookiesFunction)
    this.props.handleCookies('handleAuth', cookiesFunction)
    this.props.handleCookies('getData', cookiesFunction)
  }

  render() {

    let {
      isAuthenticated
    } = this.props

    return (
      <div className="">
        {
          isAuthenticated ?
          <div className="">
            <div className="Dashboard-header-box">
              <DashboardHeader />
            </div>
            <div className="Dashboard-body-box">
              <div className="Dashboard-menu-box">
                <DashboardMenu />
              </div>
              <div className="Dashboard-display-box">
                <DashboardDisplay cookies={ this.props.cookies } />
              </div>
            </div>
          </div>
          :
          <Redirect to="/" />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isOwner: state.auth.isOwner,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCookies,
  getDMSCookies,
  setWindow,
  handleCookies,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardPage);


