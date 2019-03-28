import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MenuItem from './menuItem';
import SubMenuItem from './subMenuItem';
import MiniStatusBox from '../statusBox/miniStatusBox';

class dashboardMenu extends Component {
  constructor() {
    super()
    this.state = {
      showLegends: false
    }
  }

  changeShowLegends = (status) => {
    if (status) {
      this.setState({
        showLegends: false
      })
    } else {
      this.setState({
        showLegends: true
      })
    }
  }

  render() {
    let {
      isOwner,
    } = this.props

    return (
      <div className="row No-margin Dashboard-menu-box Container-wrap">
        <div className="col m12 No-padding No-margin Menu-box">
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
        <div className="col m12 No-margin No-padding Legends-box">
          <div className="col m12 No-margin No-padding" onClick={ () => this.changeShowLegends(this.state.showLegends) }>
            <div className="Legends-header-text">Calendar Legends</div>
          </div>
          {
            this.state.showLegends ?
            <div className="col m12 No-margin No-padding">
              <div className="col m12 Legends-status-box No-margin No-padding Container-nowrap-center-cross Margin-t-05em">
                <div className="col m1 No-margin No-padding Margin-r-5 Container-wrap-center">
                  <div className="No-margin Appointment-status-circle-off" />
                </div>
                <div className="col m11 No-margin No-padding Legends-text-box Container-wrap-center-cross">
                  <div className="Legends-text">Provider App. Off / No Appointment</div>
                </div>
              </div>
              <div className="col m12 Legends-status-box No-margin No-padding Container-nowrap-center-cross">
                <div className="col m1 No-margin No-padding Margin-r-5">
                  <MiniStatusBox status="booking confirmed" />
                </div>
                <div className="col m11 No-margin No-padding Legends-text-box Container-wrap-center-cross">
                  <div className="Legends-text">Booking Confirmed / On Progress</div>
                </div>
              </div>
              <div className="col m12 Legends-status-box No-margin No-padding Container-nowrap-center-cross">
                <div className="col m1 No-margin No-padding Margin-r-5">
                  <MiniStatusBox status="finished" />
                </div>
                <div className="col m11 No-margin No-padding Legends-text-box Container-wrap-center-cross">
                  <div className="Legends-text">Finished</div>
                </div>
              </div>
              <div className="col m12 Legends-status-box No-margin No-padding Container-nowrap-center-cross">
                <div className="col m1 No-margin No-padding Margin-r-5">
                  <MiniStatusBox status="canceled" />
                </div>
                <div className="col m11 No-margin No-padding Legends-text-box Container-wrap-center-cross">
                  <div className="Legends-text">Canceled / Skipped</div>
                </div>
              </div>
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

