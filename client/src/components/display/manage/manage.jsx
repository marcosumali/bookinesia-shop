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
import { handleActiveTab } from '../../../store/dashboard/dashboard.actions';
import ManageBarberDetails from './manageBarberDetails';
import ManageBarberServices from './manageBarberServices';
import ManageBarberWorkingHours from './manageBarberHours';

class serviceProviders extends Component {
  componentDidUpdate() {
    // There is CSS mixed up when dispatching active tab resulting in first tab always active unless double click on ther tabs
    // As manipulation, we remove the active class from first tab if the active tab is not first tab
    let anchors = document.getElementsByTagName('a')
    for (let i = 0; i < anchors.length; i++) {
      let innerHtml = anchors[i].innerHTML
      if (innerHtml === this.props.activeTab && innerHtml !== 'Details') {
        anchors[0].classList.remove('active')
        anchors[i].classList.add('active')
      } else if (innerHtml === this.props.activeTab && innerHtml === 'Details') {
        anchors[i].classList.add('active')
      }
    }
  }

  render() {
    let { 
      selectedBarber,
    } = this.props
    // console.log('manage', this.props)
    return (
      <div className="col m12 No-margin No-padding Height-100cent">
        <div className="col m4 No-margin No-padding Height-100cent Manage-menu-box">
          <ManageMenu />
        </div>
        <div className="col m8 No-margin No-padding Height-100cent Manage-content-box">
          {
            this.props.displayToShow === 'Barbers' && this.props.selectedBarber.id ?
            <div className="col m12 No-margin No-padding Manage-content-card">
              <div className="col m12 No-margin No-padding Manage-content-header-box">
                <div className="col m12 No-margin No-padding">
                  <div className="Manage-content-header-text">{ selectedBarber.name }</div>
                </div>
              </div>
              <div className="col m12 No-margin No-padding">
                <div className="col m12 No-margin No-padding">
                  <Tabs className='tab-demo z-depth-1' onChange={(tabIndex) => this.props.handleActiveTab(tabIndex) }>
                    <Tab title="Details"></Tab>
                    <Tab title="Services"></Tab>
                    <Tab title="Working Hours"></Tab>
                  </Tabs>
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
                    <div></div>
                  }
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
    activeTab: state.nav.activeTab,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleActiveTab,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (serviceProviders);