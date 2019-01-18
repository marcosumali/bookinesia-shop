import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import Welcome from '../display/welcome';
import Calendar from '../display/calendar/calendar';
import ManageServiceProviders from '../display/manageServiceProviders';
import ManageServices from '../display/manageServices';
import ManageUsers from '../display/manageUsers';
import ReportsTransaction from '../display/reportsTransaction';
import Loading from '../display/loading/loading';
import { getStaffs } from '../../store/firestore/staff/staff.actions';

class dashboardDisplay extends Component {
  componentWillMount() {
    this.props.getStaffs('dummyshop-bekasi')
  }
  
  componentDidUpdate() {
    console.log('didupdate')
    this.props.getStaffs('dummyshop-bekasi')
  }

  render() {
    // console.log('dashboardDisplay', this.props)
    return (
      <div className="Height-100cent">
        {/* DISPLAY */}
        {
          this.props.barbersLoading || this.props.dashboardsLoading || !this.props.selectedDate ?
          <Loading />
          :
          <div>
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
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    displayToShow: state.nav.displayToShow,
    subMenuToShow: state.nav.subMenuToShow,
    barbersLoading: state.staff.barbersLoading,
    dashboardsLoading: state.transaction.dashboardsLoading,
    selectedDate: state.appointment.selectedDate,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getStaffs
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardDisplay);


