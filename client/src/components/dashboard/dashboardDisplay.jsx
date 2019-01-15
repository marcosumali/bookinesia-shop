import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import Welcome from '../display/welcome';
import Calendar from '../display/calendar';
import ManageServiceProviders from '../display/manageServiceProviders';
import ManageServices from '../display/manageServices';
import ManageUsers from '../display/manageUsers';
import ReportsTransaction from '../display/reportsTransaction';

class dashboardDisplay extends Component {
  render() {
    return (
      <div>
        DISPLAY
        {
          this.props.displayToShow === 'Welcome' ?
          <Welcome />
          :
          this.props.displayToShow === 'Calendar' ?
          <Calendar />
          :
          this.props.displayToShow === 'Barbers' ?
          <ManageServiceProviders />
          :
          this.props.displayToShow === 'Services' ?
          <ManageServices />
          :
          this.props.displayToShow === 'Users' ?
          <ManageUsers />
          :
          this.props.displayToShow === 'Transactions' ?
          <ReportsTransaction />
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
    subMenuToShow: state.nav.subMenuToShow,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardDisplay);


