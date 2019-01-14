import React, { Component } from 'react';

import '../../assets/css/general.css';
import './dashboardPage.css';
import DashboardHeader from '../../components/dashboard/dashboardHeader';
import DashboardMenu from '../../components/dashboard/dashboardMenu';
import DashboardDisplay from '../../components/dashboard/dashboardDisplay';

export default class dashboardPage extends Component {
  render() {
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
