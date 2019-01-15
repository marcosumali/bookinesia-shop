import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import './dashboardPage.css';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import DashboardMenu from '../../components/dashboard/dashboardMenu';
import DashboardDisplay from '../../components/dashboard/dashboardDisplay';
import { setCookies } from '../../store/firestore/management/management.actions';
import { getDMSCookies } from '../../store/dashboard/dashboard.actions';


class dashboardPage extends Component {
  componentWillMount() {
    let cookiesFunction = this.props.cookies
    this.props.setCookies(cookiesFunction)
    this.props.getDMSCookies(cookiesFunction)
  }

  render() {
    console.log('dashboardPage', this.props)
    return (
      <div className="">
        <div className="Dashboard-header-box">
          <DashboardHeader />
        </div>
        <div className="Dashboard-body-box">
          <div className="Dashboard-menu-box">
            <DashboardMenu />
          </div>
          <div className="Dashboard-display-box">
            <DashboardDisplay />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCookies,
  getDMSCookies
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardPage);


