import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import Welcome from '../display/welcome';
import Calendar from '../display/calendar/calendar';
import Manage from '../display/manage/manage';
import ManageUsers from '../display/manageUsers';
import ReportsTransaction from '../display/reportsTransaction';
import Loading from '../display/loading/loading';
import { getAllStaffsAndOtherData } from '../../store/firestore/staff/staff.actions';
import { getAllServices } from '../../store/firestore/service/service.actions';
import { getStaffServices } from '../../store/firestore/staffService/staffService.actions';
import { getStaffSchedules } from '../../store/firestore/staffSchedule/staffSchedule.actions';

class dashboardDisplay extends Component {
  componentWillMount() {
    this.props.getAllStaffsAndOtherData('dummyshop-bekasi')
    this.props.getAllServices('dummyshop-bekasi')
    this.props.getStaffServices('dummyshop-bekasi')
    this.props.getStaffSchedules('dummyshop-bekasi')
  }
  
  render() {
    // console.log('dashboardDisplay', this.props)
    return (
      <div className="Height-100cent">
        {/* DISPLAY */}
        {
          this.props.barbersLoading || 
          this.props.transactionsLoading || 
          this.props.dashboardsLoading || 
          !this.props.selectedDate ||
          this.props.allBarbersLoading ||
          this.props.servicesLoading ||
          this.props.allServicesLoading ||
          this.props.staffServicesLoading ||
          this.props.staffSchedulesLoading ?
          <Loading />
          :
          <div className="row No-margin Height-100cent">
            {
              this.props.displayToShow === 'Welcome' ?
              <Welcome />
              :
              this.props.displayToShow === 'Calendar' ?
              <Calendar />
              :
              this.props.displayToShow === 'Providers' ?
              <Manage />
              :
              this.props.displayToShow === 'Services' ?
              <Manage />
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
    allBarbersLoading: state.staff.allBarbersLoading,
    transactionsLoading: state.transaction.transactionsLoading,
    dashboardsLoading: state.transaction.dashboardsLoading,
    servicesLoading: state.service.servicesLoading,
    allServicesLoading: state.service.allServicesLoading,
    staffServicesLoading: state.staffService.staffServicesLoading,
    staffSchedulesLoading: state.staffSchedule.staffSchedulesLoading,
    selectedDate: state.appointment.selectedDate,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllStaffsAndOtherData,
  getAllServices,
  getStaffServices,
  getStaffSchedules
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardDisplay);


