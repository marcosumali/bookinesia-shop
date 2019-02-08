import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './calendar.css';
import CalendarHeader from './calendarHeader';
import ModalInfo from '../../modal/calendar/modalInfo';
import ModalAddTransaction from '../../modal/calendar/modalAddTrans';
import Loading from '../loading/loading';

class calendar extends Component {
  render() {
    console.log('calendar', this.props)
    return (
      <div>
        <div>
          <CalendarHeader />
          <div className="row No-margin animated fadeIn faster">
            <div className="Calendar-body-box">
              {
                this.props.loadingStatus ?
                <Loading />
                :
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
                                <ModalAddTransaction 
                                  barber={ barber }
                                />
                              </div>
                            </th>
                          )
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.dashboards[0].data.map((data, index) => {
                        return (
                          <tr key={ 'data' + index }>
                            <td className="Number-box Text-center">{ data.queueNo }</td>
                            {
                              data.transactions.map((transaction, index) => {
                                return Object.keys(transaction).length === 0 && transaction.constructor === Object ?
                                <td className="Content-box-inner Background-blank" key={ 'transaction' + index }>
                                  <div className="Container-wrap-center-cross">
                                    <div className="Customer-text"></div>
                                    <div className="Customer-phone"></div>
                                  </div>
                                </td>
                                :
                                transaction.status === 'no-appointment' ?
                                <td className="Content-box-inner Background-no-appointment" key={ 'transaction' + index }>
                                  <div className="Container-wrap-center-cross">
                                    <div className="Customer-text Text-no-appointment"></div>
                                    <div className="Customer-phone Text-no-appointment"></div>
                                  </div>
                                </td>
                                :
                                <td className="Content-box-inner Background-blank" key={ 'transaction' + index }>
                                  <div className="Container-wrap-center-cross">
                                    <ModalInfo 
                                      transaction={ transaction } 
                                      dashboardData={ this.props.dashboards[0].data }
                                    />
                                  </div>
                                </td>
                              })
                            }
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
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
    barbers: state.staff.allBarbers,
    dashboards: state.transaction.dashboards,
    selectedDate: state.appointment.selectedDate,
    transactions: state.transaction.transactions,
    loadingStatus: state.nav.loadingStatus,
    selectedPrimaryService: state.transaction.selectedPrimaryService,
    selectedSecondaryServices: state.transaction.selectedSecondaryServices,
    addName: state.transaction.addName,
    addPhone: state.transaction.addPhone,
    addEmail: state.transaction.addEmail,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (calendar);

