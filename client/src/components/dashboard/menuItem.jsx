import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import './dashboard.css';
import SunSvg from '../svg/sunSvg';
import CalendarSvg from '../svg/calendarSvg';
import CreateSvg from '../svg/createSvg';
import ChartSvg from '../svg/chartSvg';
import ArrowDownSvg from '../svg/arrowDownSvg';
import { dispatchToSetDisplayToShow } from '../../store/dashboard/dashboard.actions';

class menuItem extends Component {
  render() {
    return (
      <div
        className="Menu-item-box Container-nowrap-center-cross" 
        onClick={ () => {this.props.dispatchToSetDisplayToShow(this.props.text, this.props.manageShowStatus, this.props.reportsShowStatus)}}
      >
        <div className="Container-nowrap-center Margin-l-5 Margin-r-5">
          {
            this.props.text === 'Welcome'?
            <SunSvg height="1rem" width="1rem" color="#ffffff" />
            :
            this.props.text === 'Calendar'?
            <CalendarSvg height="1rem" width="1rem" color="#ffffff" />
            :
            this.props.text === 'Manage'?
            <CreateSvg height="1rem" width="1rem" color="#ffffff" />
            :
            this.props.text === 'Reports'?
            <ChartSvg height="1rem" width="1rem" color="#ffffff" />
            :
            <div></div>
          }
        </div>
        <div className="Height-100cent Container-nowrap-center-cross">
          <div className="Menu-text">{ this.props.text }</div>
        </div>
        {
          this.props.text === 'Manage' || this.props.text === 'Reports' ?
          <div className="Height-100cent Width-100cent Margin-r-5 Container-nowrap-end">
            <ArrowDownSvg height="1.25rem" width="1.25rem" color="#ffffff" />
          </div>
          :
          <div></div>
        }
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    displayToShow: state.nav.displayToShow,
    manageShowStatus: state.nav.manageShowStatus,
    reportsShowStatus: state.nav.reportsShowStatus,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchToSetDisplayToShow
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (menuItem);
