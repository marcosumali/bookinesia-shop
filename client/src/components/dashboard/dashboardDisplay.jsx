import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import Welcome from '../display/welcome';
import Calendar from '../display/calendar/calendar';
import Manage from '../display/manage/manage';
import ManageServices from '../display/manageServices';
import ManageUsers from '../display/manageUsers';
import ReportsTransaction from '../display/reportsTransaction';
import Loading from '../display/loading/loading';
import { getStaffsAndOtherData, getAllStaffs } from '../../store/firestore/staff/staff.actions';
import { getServices } from '../../store/firestore/service/service.actions';
import { getStaffServices } from '../../store/firestore/staffService/staffService.actions';

class dashboardDisplay extends Component {
  componentWillMount() {
    this.props.getStaffsAndOtherData('dummyshop-bekasi')
    this.props.getAllStaffs('dummyshop-bekasi')
    this.props.getServices('dummyshop-bekasi')
    this.props.getStaffServices('dummyshop-bekasi')
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
          this.props.staffServicesLoading ?
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
              this.props.displayToShow === 'Barbers' ?
              <Manage />
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
    allBarbersLoading: state.staff.allBarbersLoading,
    transactionsLoading: state.transaction.transactionsLoading,
    dashboardsLoading: state.transaction.dashboardsLoading,
    servicesLoading: state.service.servicesLoading,
    staffServicesLoading: state.staffService.staffServicesLoading,
    selectedDate: state.appointment.selectedDate,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getStaffsAndOtherData,
  getAllStaffs,
  getServices,
  getStaffServices
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardDisplay);


