import React, { Component } from 'react';

import '../../pages/dashboard/dashboardPage.css';
import './dashboard.css';
import MenuSvg from '../svg/menuSvg';

export default class dashboardHeader extends Component {
  render() {
    return (
      <div className="Dashboard-header-box">
        <div className="Container-nowrap-start Dashboard-header-inner-box">
          <div className="Icon-box Container-nowrap-center">
            <MenuSvg height="1.25rem" width="1.25rem" color="#666666" />
          </div>
          <div className="Header-box Container-nowrap-center">
            <div className="Header-text">Bookinesia</div>
          </div>
        </div>
        <div className="Container-nowrap-end Dashboard-header-inner-box">
          <div>Right Dropdown</div>
        </div>
      </div>
    )
  }
}
