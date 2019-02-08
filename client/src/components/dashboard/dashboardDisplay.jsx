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

class dashboardDisplay extends Component {  
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
          this.props.staffSchedulesLoading || 
          this.props.user.length <= 0 ?
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
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardDisplay);


