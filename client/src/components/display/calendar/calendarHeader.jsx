import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './calendar.css';
import ArrowLeftSvg from '../../svg/arrowLeftSvg';
import ArrowRightSvg from '../../svg/arrowRightSvg';
import CalendarSvg from '../../svg/calendarSvg';
import { setAppointmentDateIndex, setTodayDateIndex } from '../../../store/firestore/appointment/appointment.actions';

class calendarHeader extends Component {
  render() {
    // console.log('calendarHeader', this.props)
    return (
      <div className="row No-margin animated fadeIn faster">
        <div className="Calendar-header-box Container-nowrap-center-cross">
          <div className="col m4 No-margin No-padding">
            <div className="Calendar-header-text">CALENDAR</div>
          </div>
          <div className="col m4 No-margin No-padding Container-nowrap-center">
            {
              Number(this.props.appointmentDateIndex) > 0 ?
              <div 
                className="col m3 No-margin No-padding Height-100cent Container-nowrap-end" 
                onClick={ () => this.props.setAppointmentDateIndex('previous', this.props.appointmentDateIndex, this.props.appointmentsDate) }
              >
                <ArrowLeftSvg height="2.5rem" width="2.5rem" color="#5499c3" />
              </div>
              :
              <div className="col m3 No-margin No-padding Height-100cent Container-nowrap-end">
                <ArrowLeftSvg height="2.5rem" width="2.5rem" color="#EAEAEA" />
              </div>
            }
            <div className="col m6 No-margin No-padding Height-100cent Container-wrap-center">
              <div className="Width-100cent Container-nowrap-center">
                <CalendarSvg height="1rem" width="1rem" color="#5499c3" />
              </div>
              <div className="Width-100cent Container-nowrap-center">
                {
                  this.props.appointmentsDate && this.props.appointmentsDate.map((date, index) => {
                    return (
                      <div className="Container-nowrap-center" key={ 'date' + index }>
                        {
                          this.props.appointmentDateIndex === index ?
                          <div className="Calendar-header-date">{ date.revisedDate }</div>
                          :
                          <div></div>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
            {
              Number(this.props.appointmentDateIndex) < Number(this.props.appointmentsDate.length-1) ?
              <div 
                className="col m3 No-margin No-padding Height-100cent Container-nowrap-start" 
                onClick={ () => this.props.setAppointmentDateIndex('next', this.props.appointmentDateIndex, this.props.appointmentsDate) }
              >
                <ArrowRightSvg height="2.5rem" width="2.5rem" color="#5499c3" />
              </div>
              :
              <div className="col m3 No-margin No-padding Height-100cent Container-nowrap-start">
                <ArrowRightSvg height="2.5rem" width="2.5rem" color="#EAEAEA" />
              </div>
            }
          </div>
          <div className="col m4 No-margin No-padding Container-nowrap-end">
            <div className="Show-today-box" onClick={ () => this.props.setTodayDateIndex(this.props.appointmentsDate) }>
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
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setAppointmentDateIndex,
  setTodayDateIndex
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (calendarHeader);
