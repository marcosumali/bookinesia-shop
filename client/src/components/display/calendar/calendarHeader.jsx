import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './calendar.css';
import ArrowLeftSvg from '../../svg/arrowLeftSvg';
import ArrowRightSvg from '../../svg/arrowRightSvg';
import BasicDateInput from '../../form/inputDateBasic';
import { setAppointmentDateIndex, setTodayDateIndex } from '../../../store/firestore/appointment/appointment.actions';
import { handleBasicDateInput } from '../../../store/dashboard/dashboard.actions';

class calendarHeader extends Component {
  render() {
    let {
      handleBasicDateInput,
      allBarbers,
      user
    } = this.props

    return (
      <div className="row No-margin animated fadeIn faster">
        <div className="Calendar-header-box Container-nowrap-center-cross">
          <div className="col m3 No-margin No-padding">
            <div className="Calendar-header-text">CALENDAR</div>
          </div>
          <div className="col m2 No-margin No-padding Height-100cent Container-nowrap-end">
            <div
              className="col m4 No-margin No-padding Height-100cent Container-nowrap-end" 
              onClick={ () => this.props.setAppointmentDateIndex(user.branchId,'previous', this.props.selectedDate) }
            >
              <ArrowLeftSvg height="2.75rem" width="2.75rem" color="#5499c3" />
            </div>
          </div>
          <div className="col m2 No-padding Height-100cent Container-wrap-center" style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>
            <div className="Width-100cent Container-nowrap-center">
              <BasicDateInput 
                inputId="calendarDate"
                className="input-field"
                inputLabelStatus={ false }
                inputLabel=""
                openingStatus={ true }
                openingDate={ this.props.selectedDate }
                handleChangesDateFunction={ (e) => handleBasicDateInput(e, user.branchId, allBarbers) }              
              />
            </div>
          </div>
          <div className="col m2 No-margin No-padding Height-100cent Container-nowrap-start">
            <div 
              className="col m4 No-margin No-padding Height-100cent Container-nowrap-start"
              onClick={ () => this.props.setAppointmentDateIndex(user.branchId,'next', this.props.selectedDate) }
            >
              <ArrowRightSvg height="2.75rem" width="2.75rem" color="#5499c3" />
            </div>
          </div>
          <div className="col m3 No-margin No-padding Container-nowrap-end">
            <div className="Show-today-box" onClick={ () => this.props.setTodayDateIndex(user.branchId) }>
              <div className="Show-today-text">Show Today</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    appointmentsDate: state.transaction.dashboards,
    appointmentDateIndex: state.appointment.datesIndex,
    selectedDate: state.appointment.selectedDate,
    allBarbers: state.staff.allBarbers,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setAppointmentDateIndex,
  setTodayDateIndex,
  handleBasicDateInput,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (calendarHeader);
