import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import Welcome from '../display/welcome';
import Calendar from '../display/calendar/calendar';
import Manage from '../display/manage/manage';
import ManageShopAndBranch from '../display/manage/manageShop&Branch';
import ReportsTransaction from '../display/report/reportsTransaction';
import Loading from '../display/loading/loading';
import { getAllStaffsAndCalendar } from '../../store/firestore/staff/staff.actions';
import { getAllServices } from '../../store/firestore/service/service.actions';
import { getStaffServices } from '../../store/firestore/staffService/staffService.actions';
import { getStaffSchedules } from '../../store/firestore/staffSchedule/staffSchedule.actions';
import { getShop } from '../../store/firestore/shop/shop.actions';
import { getBranch } from '../../store/firestore/branch/branch.actions';

class dashboardDisplay extends Component {
  componentWillMount() {
    let inputDate = new Date(Date.now())
    let year = inputDate.getFullYear()
    let month = inputDate.getMonth() + 1
    let date = inputDate.getDate()
    let acceptedDate = `${year}-${month}-${date}`
    this.props.getShop('dummyshop')
    this.props.getBranch('dummyshop-bekasi')
    this.props.getAllStaffsAndCalendar('dummyshop-bekasi', acceptedDate)
    this.props.getAllServices('dummyshop-bekasi')
    this.props.getStaffServices('dummyshop-bekasi')
    this.props.getStaffSchedules('dummyshop-bekasi')
  }
  
  render() {
    // console.log('dashboardDisplay', this.props)
    return (
      <div className="Height-100cent">
        {
          this.props.shopLoading || 
          this.props.branchLoading || 
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
              this.props.displayToShow === 'Shop & Branch' ?
              <ManageShopAndBranch />
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
    allBarbersLoading: state.staff.allBarbersLoading,
    dashboardsLoading: state.transaction.dashboardsLoading,
    servicesLoading: state.service.servicesLoading,
    allServicesLoading: state.service.allServicesLoading,
    staffServicesLoading: state.staffService.staffServicesLoading,
    staffSchedulesLoading: state.staffSchedule.staffSchedulesLoading,
    shopLoading: state.shop.shopLoading,
    branchLoading: state.branch.branchLoading,
    selectedDate: state.appointment.selectedDate,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllStaffsAndCalendar,
  getAllServices,
  getStaffServices,
  getStaffSchedules,
  getShop,
  getBranch,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardDisplay);


