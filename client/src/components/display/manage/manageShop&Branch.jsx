import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ManageShop from './manageShop';
import ManageBranch from './manageBranch';

class manageShopAndBranch extends Component {
  render() {
    return (
      <div className="col m12 No-margin No-padding Height-100cent">
        <div className="col m6 No-margin Height-100cent Manage-menu-box" style={{ paddingRight: '0px !important' }}>
          <div className="col m12 No-margin Manage-content-card" style={{ paddingRight: "0px" }}>
            <ManageShop />
          </div>
        </div>
  
        <div className="col m6 No-margin Height-100cent Manage-menu-box" style={{ paddingRight: '0px !important' }}>
          <div className="col m12 No-margin Manage-content-card">
            <ManageBranch />
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageShopAndBranch);

