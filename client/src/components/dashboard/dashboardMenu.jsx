import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MenuItem from './menuItem';
import SubMenuItem from './subMenuItem';

class dashboardMenu extends Component {
  render() {
    let {
      isOwner,
    } = this.props
    // console.log('from dashboardMenu', this.props)
    return (
      <div className="Dashboard-menu-box">
        <div className="Menu-box Margin-t-40">

          {
            this.props.menuToShow === 'Welcome' ?
            <div className="Active">
              <MenuItem text='Welcome' />
            </div>
            :
            <div>
              <MenuItem text='Welcome' />
            </div>
          }

          {
            this.props.menuToShow === 'Calendar' ?
            <div className="Active">          
              <MenuItem text='Calendar' />
            </div>
            :
            <div>
              <MenuItem text='Calendar' />
            </div>
          }

          {
            this.props.menuToShow === 'Manage' ?
            <div className="Active">
              <MenuItem text='Manage'/>
            </div>
            :
            <div>
              <MenuItem text='Manage' />
            </div>
          }
          {
            this.props.manageShowStatus === true ?
            <div>
              <SubMenuItem text="Providers"/>
              {
                isOwner ?
                <div>
                  <SubMenuItem text="Services"/>
                  <SubMenuItem text="Shop & Branch"/>
                </div>
                :
                <div></div>
              }
            </div>
            :
            <div></div>
          }

          {
            isOwner ?
            <div>
              {
                this.props.menuToShow === 'Reports' ?
                <div className="Active">
                  <MenuItem text='Reports' />
                </div>
                :
                <div>
                  <MenuItem text='Reports' />
                </div>
              }
              {
                this.props.reportsShowStatus === true ?
                <SubMenuItem text="Transactions"/>
                :
                <div></div>
              }
            </div>
            :
            <div></div>
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    displayToShow: state.nav.displayToShow,
    manageShowStatus: state.nav.manageShowStatus,
    reportsShowStatus: state.nav.reportsShowStatus,
    subMenuToShow: state.nav.subMenuToShow,
    menuToShow: state.nav.menuToShow,
    cookies: state.user.cookies,
    isOwner: state.auth.isOwner,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (dashboardMenu);

