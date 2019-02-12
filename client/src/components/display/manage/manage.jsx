import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Tab } from 'react-materialize';

import './manage.css';
import '../../../assets/css/materialize/form.css';
import '../../../assets/css/materialize/tabs.css';
import '../../../assets/css/swal/swal.css';
import ManageMenu from './manageMenu';
import ManageContentStart from './manageContentStart';
import { handleActiveTab, handleActiveTabAdmin } from '../../../store/dashboard/dashboard.actions';
import ManageBarberDetails from './manageBarberDetails';
import ManageBarberServices from './manageBarberServices';
import ManageBarberWorkingHours from './manageBarberHours';
import ManageBarberAppointments from './manageBarberApps';
import ManageService from './manageService';

class serviceProviders extends Component {
  componentDidUpdate() {
    // There is CSS mixed up when dispatching active tab resulting in first tab always active unless double click on ther tabs
    // As manipulation, we remove the active class from first tab if the active tab is not first tab
    // Achors [1] is detail tabs while anchors [0] is sign out button
    let anchors = document.getElementsByTagName('a')
    for (let i = 0; i < anchors.length; i++) {
      let innerHtml = anchors[i].innerHTML
      if (innerHtml === this.props.activeTab && innerHtml !== 'Details') {
        anchors[1].classList.remove('active')
        anchors[i].classList.add('active')
      } else if (innerHtml === this.props.activeTab && innerHtml === 'Details') {
        anchors[i].classList.add('active')
      }
    }
  }

  render() {
    let { 
      selectedBarber,
      displayToShow,
      selectedService,
      isOwner,
    } = this.props
    // console.log('manage', this.props)
    return (
      <div className="col m12 No-margin No-padding Height-100cent">
        <div className="col m4 No-margin No-padding Height-100cent Manage-menu-box">
          <ManageMenu />
        </div>
        <div className="col m8 No-margin No-padding Height-100cent Manage-content-box">
          {
            displayToShow === 'Providers' && selectedBarber.id ?
            <div className="col m12 No-margin No-padding Manage-content-card">
              <div className="col m12 No-margin No-padding Manage-content-header-box">
                <div className="col m12 No-margin No-padding">
                  <div className="Manage-content-header-text">{ selectedBarber.name }</div>
                </div>
              </div>
              <div className="col m12 No-margin No-padding">
                <div className="col m12 No-margin No-padding">
                  {
                    isOwner ?
                    <Tabs className='tab-demo z-depth-1' onChange={(tabIndex) => this.props.handleActiveTab(tabIndex) }>
                      <Tab title="Details"></Tab>
                      <Tab title="Services"></Tab>
                      <Tab title="Working Hours"></Tab>
                      <Tab title="Appointments"></Tab>
                    </Tabs>
                    :
                    <Tabs className='tab-demo z-depth-1' onChange={(tabIndex) => this.props.handleActiveTabAdmin(tabIndex) }>
                      <Tab title="Appointments"></Tab>
                    </Tabs>
                  }
                </div>
                <div className="col m12 No-margin No-padding Manage-content-body-box">
                  {
                    this.props.activeTab === 'Details' || this.props.activeTab.length === 0 ?
                    <ManageBarberDetails />
                    :
                    this.props.activeTab === 'Services' ?
                    <ManageBarberServices />
                    :
                    this.props.activeTab === 'Working Hours' ?
                    <ManageBarberWorkingHours />
                    :
                    this.props.activeTab === 'Appointments' ?
                    <ManageBarberAppointments />
                    :
                    <div></div>
                  }
                </div>
              </div>
            </div>
            :
            displayToShow === 'Services' && selectedService.id ?
            <div className="col m12 No-margin No-padding Manage-content-card">
              <div className="col m12 No-margin No-padding Manage-content-header-box">
                <div className="col m12 No-margin No-padding">
                  <div className="Manage-content-header-text">{ selectedService.name }</div>
                </div>
                <div className="col m12 No-margin No-padding">
                  <div className="col m12 No-margin No-padding Manage-content-body-box">
                    <ManageService />
                  </div>
                </div>
              </div>
            </div>
            :
            <ManageContentStart />
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    displayToShow: state.nav.displayToShow,
    selectedBarber: state.staff.selectedBarber,
    selectedService: state.service.selectedService,
    activeTab: state.nav.activeTab,
    isOwner: state.auth.isOwner,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleActiveTab,
  handleActiveTabAdmin,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (serviceProviders);