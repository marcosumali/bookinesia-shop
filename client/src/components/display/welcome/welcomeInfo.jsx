import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CalendarSvg from '../../svg/calendarSvg';
import CreateSvg from '../../svg/createSvg';
import ChartSvg from '../../svg/chartSvg';

class welcomeInfo extends Component {
  render() {
    let { isOwner } = this.props
    return (
      <div className="row No-margin">
        <div className="col m12 No-margin No-padding">
          <div className="General-text">General Information</div>
        </div>
        <div className="col m12 Info-outer-box No-margin No-padding">
          <div className="col m3 Svg-box Container-nowrap-center">
            <CalendarSvg height="5em" width="5em" color="#5499c3" />
          </div>
          <div className="col m8 No-padding No-margin">
            <div className="col m12 Info-header-box">
              <div className="Info-header-text">Calendar</div>
            </div>
            <div className="col m12 Info-box">
              <div className="Info-text">Use this feature to manage each customer's transactions including to add new transaction or edit status of on-going transactions.</div>
            </div>
          </div>
        </div>
        <div className="col m12 Info-outer-box No-margin No-padding">
          <div className="col m3 Svg-box Container-nowrap-center">
            <CreateSvg height="5em" width="5em" color="#5499c3" />
          </div>
          <div className="col m8 No-padding No-margin">
            <div className="col m12 Info-header-box">
              <div className="Info-header-text">Manage</div>
            </div>
            <div className="col m12 Info-box">
              {
                isOwner ?
                <div className="Info-text">Use this feature to manage your shop's information including detail of each provided service and provider's information.</div>
                :
                <div className="Info-text">Use this feature to manage each shop's provider appointment information including adding or editing appointment schedule.</div>
              }
            </div>
          </div>
        </div>
        {
          isOwner ?
          <div className="col m12 Info-outer-box No-margin No-padding">
            <div className="col m3 Svg-box Container-nowrap-center">
              <ChartSvg height="5em" width="5em" color="#5499c3" />
            </div>
            <div className="col m8 No-padding No-margin">
              <div className="col m12 Info-header-box">
                <div className="Info-header-text">Reports</div>
              </div>
              <div className="col m12 Info-box">
                <div className="Info-text">Use this feature to view and generate selected reports to gain insight of your shop's transactions and extract raw sales transactions into Excel file.</div>
              </div>
            </div>
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    isOwner: state.auth.isOwner,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (welcomeInfo);

