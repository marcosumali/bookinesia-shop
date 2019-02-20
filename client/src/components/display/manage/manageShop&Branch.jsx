import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Tab } from 'react-materialize';

import ManageShop from './manageShop';
import ManageBranchDetails from './manageBranchDetails';
import ManageBranchHours from './manageBranchHours';
import { handleActiveTabShopAndBranch } from '../../../store/dashboard/dashboard.actions';

class manageShopAndBranch extends Component {
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
    return (
      <div className="col m12 No-margin No-padding Height-100cent">
        <div className="col m6 No-margin Height-100cent Manage-menu-box" style={{ paddingRight: '0px !important', overflowY: 'hidden' }}>
          <div className="col m12 No-margin Manage-content-card" style={{ paddingRight: "0px" }}>
            <ManageShop />
          </div>
        </div>
  
        <div className="col m6 No-margin Height-100cent Manage-menu-box" style={{ paddingRight: '0px !important', overflowY: 'hidden' }}>
          <div className="col m12 No-margin No-margin No-padding Manage-content-card">
            <div className="col m12 No-margin Manage-content-header-box">
              <div className="col m12 No-margin No-padding">
                <div className="Manage-content-header-text">Branch</div>
              </div>
            </div>
            <div className="col m12 No-margin No-padding">
              <Tabs className='tab-demo z-depth-1' onChange={(tabIndex) => this.props.handleActiveTabShopAndBranch(tabIndex) }>
                <Tab title="Details"></Tab>
                <Tab title="Opening Hours"></Tab>
              </Tabs>
            </div>
            <div className="col m12 No-margin No-padding Manage-branch-content-box">
              {
                this.props.activeTab === 'Details' ?
                <ManageBranchDetails />
                :
                this.props.activeTab === 'Opening Hours' ?
                <ManageBranchHours />
                :
                <div></div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    activeTab: state.nav.activeTabShopAndBranch
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleActiveTabShopAndBranch
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageShopAndBranch);

