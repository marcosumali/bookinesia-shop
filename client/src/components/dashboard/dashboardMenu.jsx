import React, { Component } from 'react';

import SunSvg from '../svg/sunSvg';
import CalendarSvg from '../svg/calendarSvg';
import CreateSvg from '../svg/createSvg';
import ChartSvg from '../svg/chartSvg';
import ArrowDownSvg from '../svg/arrowDownSvg';

export default class dashboardMenu extends Component {
  render() {
    return (
      <div className="Dashboard-menu-box">
        <div className="Menu-box Margin-t-40">
        
          <div className="Menu-item-box Container-nowrap-center-cross">
            <div className="Container-nowrap-center Margin-l-5 Margin-r-5">
              <SunSvg height="1rem" width="1rem" color="#ffffff" />
            </div>
            <div className="Height-100cent Container-nowrap-center-cross">
              <div className="Menu-text">Welcome</div>
            </div>
          </div>

          <div className="Menu-item-box Container-nowrap-center-cross">
            <div className="Container-nowrap-center Margin-l-5 Margin-r-5">
              <CalendarSvg height="1rem" width="1rem" color="#ffffff" />
            </div>
            <div className="Height-100cent Container-nowrap-center-cross">
              <div className="Menu-text">Calendar</div>
            </div>
          </div>

          <div className="Menu-item-box Container-nowrap-center-cross">
            <div className="Container-nowrap-center Margin-l-5 Margin-r-5">
              <CreateSvg height="1rem" width="1rem" color="#ffffff" />
            </div>
            <div className="Height-100cent Container-nowrap-center-cross">
              <div className="Menu-text">Manage</div>
            </div>
            <div className="Height-100cent Width-100cent Margin-r-5 Container-nowrap-end">
              <ArrowDownSvg height="1.25rem" width="1.25rem" color="#ffffff" />
            </div>
          </div>

          <div className="Menu-item-box Container-nowrap-center-cross">
            <div className="Container-nowrap-center Margin-l-5 Margin-r-5">
              <ChartSvg height="1rem" width="1rem" color="#ffffff" />
            </div>
            <div className="Height-100cent Container-nowrap-center-cross">
              <div className="Menu-text">Reports</div>
            </div>
            <div className="Height-100cent Width-100cent Margin-r-5 Container-nowrap-end">
              <ArrowDownSvg height="1.25rem" width="1.25rem" color="#ffffff" />
            </div>
          </div>

        </div>
      </div>
    )
  }
}
