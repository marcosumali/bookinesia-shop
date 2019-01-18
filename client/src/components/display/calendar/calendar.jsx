import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './calendar.css';
import CalendarHeader from './calendarHeader';
import AddBoxSvg from '../../svg/addBoxSvg';

class calendar extends Component {
  render() {
    console.log('calendar', this.props)
    return (
      <div>
        <div>
          <CalendarHeader />
          <div className="row No-margin animated fadeIn faster">
            <div className="Calendar-body-box">
              <table>
                <thead>
                  <tr>
                    <th className="Number-box"></th>
                    {
                      this.props.barbers && this.props.barbers.map((barber, index) => {
                        return (
                          <th className="Content-box" key={ 'barber' + index }>
                            <div className="Container-nowrap-spacebetween">
                              <div className="Staff-text Text-capitalize">{ barber.name }</div>
                              <div className="Height-100cent Container-nowrap-center">
                                <AddBoxSvg height="1.6em" width="1.6em" color="#F68606"/>
                              </div>
                            </div>
                          </th>
                        )
                      })
                    }
                  </tr>
                </thead>
                {
                  this.props.dashboards && this.props.dashboards.map((dashboard, index) => {
                    return dashboard.originalDate === this.props.selectedDate ? 
                      <tbody key={ 'dashboard' + index }>
                        {
                          dashboard.data.map((data, index) => {
                            return (
                              <tr key={ 'data' + index }>
                                <td className="Number-box Text-center">{ data.queueNo }</td>
                                {
                                  data.transactions.map((transaction, index) => {
                                    return (
                                      <td className="Content-box" key={ 'transaction' + index }>
                                        {
                                          Object.keys(transaction).length === 0 && transaction.constructor === Object ?
                                          <div className="Container-wrap-center-cross">
                                            <div className="Customer-text"></div>
                                            <div className="Customer-phone"></div>
                                          </div>
                                          :
                                          <div className="Container-wrap-center-cross">
                                            <div className="Customer-text Text-capitalize">{ transaction.name }</div>
                                            <div className="Customer-phone">{ transaction.phone }</div>
                                          </div>
                                        }
                                      </td>
                                    )
                                  })
                                }
                              </tr>
                            )
                          })
                        }
                      </tbody> 
                    :
                    <tbody key={ 'dashboard' + index }></tbody>
                  })
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    barbers: state.staff.barbers,
    dashboards: state.transaction.dashboards,
    selectedDate: state.appointment.selectedDate,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (calendar);

