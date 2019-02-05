import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchSvg from '../../svg/searchSvg';
import BasicDateInput from '../../form/inputDateBasic';
import { handleBasicDateInput } from '../../../store/dashboard/dashboard.actions';
import { getFilteredAppointments } from '../../../store/firestore/appointment/appointment.actions';
import ModalUpdateAppointment from '../../modal/manage/modalUpdateApp';
import ModalAddAppointment from '../../modal/manage/modalAddApp';

class manageBarberApps extends Component {
  render() {
    let { 
      getFilteredAppointments,
      startDate,
      endDate,
      filterDateErrors,
      selectedBarber,
      filteredAppointments,
      handleBasicDateInput,
    } = this.props
    // console.log('manageBarberApps', this.props)
    return (
      <div className="col m12 No-margin No-padding">
        <label htmlFor="id" className="Form-text-active-blue">FILTER SELECTED APPOINTMENTS (max. 7 days)</label>
        <div className="col m12 No-padding Container-nowrap-center-cross Margin-t-10">
          <div className="col m5 No-margin No-padding Margin-r-5">
            <BasicDateInput 
              inputId="startDate"
              className="input-field Input-date-box"
              inputLabelStatus={ true }
              inputLabel="Start Date"
              openingStatus={ false }
              openingDate=""
              handleChangesDateFunction={ handleBasicDateInput }              
            />
          </div>
          <div className="col m5 No-margin No-padding">
            <BasicDateInput 
              inputId="endDate"
              className="input-field Input-date-box"
              inputLabelStatus={ true }
              inputLabel="End Date"
              openingStatus={ false }
              openingDate=""
              handleChangesDateFunction={ handleBasicDateInput }              
            />
          </div>
          <div className="col m1 No-margin No-padding Container-nowrap-center">
            <div className="Search-box" onClick={ () => getFilteredAppointments(startDate, endDate, selectedBarber) }>
              <SearchSvg height="1em" width="1em" color="#5499c3" />
            </div>
          </div>
          <div className="col m1 No-margin No-padding Container-nowrap-center">
            <ModalAddAppointment 
              filteredAppointment=""
            />
          </div>
        </div>
        <div className="col m12 No-margin No-padding Container-wrap-center-cross Margin-b-10">
          {
            filterDateErrors.length > 0 ?
            <div>
              {
                filterDateErrors && filterDateErrors.map((error, index) => {
                  return (
                    <div className="Error-box" key={ 'error' + index }>
                      <label htmlFor="error" className="Input-info-error">{index+1}. { error }</label>
                    </div>
                  )
                })
              }
            </div>
            :
            <div></div>
          }
        </div>
        <div className="col m12 No-margin No-padding Container-wrap-center-cross">
          {
            startDate.length <= 0 || endDate.length <= 0 || filteredAppointments.length <= 0 ?
            <div className="Manage-text-gray" style={{ textTransform: 'none' }}>Fill up both dates and click on 'Search' button to execute the filter function.</div>
            :
            <div>
              {
                filteredAppointments && filteredAppointments.map((filteredAppointment, index) => {
                  return selectedBarber.id === filteredAppointment.staffId && !filteredAppointment.message ?
                   <ModalUpdateAppointment
                      key={ 'app' + index }
                      filteredAppointment={ filteredAppointment }
                    />
                  :
                  startDate.length > 0 && endDate.length > 0 && filteredAppointment.message === 'empty' && selectedBarber.id === filteredAppointment.staffId ?
                  <div className="col m12 No-margin No-padding Manage-box Container-wrap-center-cross animated fadeIn faster" key={ 'app' + index }>
                    <div className="col m12 No-margin No-padding Container-nowrap-center-cross Margin-b-5">
                      <div className="Manage-text-gray" style={{ textTransform: 'none' }}>No appointments has been made on preferred dates for selected provider.</div>
                    </div>
                  </div>
                  :
                  <div>
                    {
                      index === 0 ?
                      <div className="Manage-text-gray" style={{ textTransform: 'none' }}>Fill up both dates and click on 'Search' button to execute the filter function.</div>
                      :
                      <div></div>
                    }
                  </div>
                })
              }
            </div>
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    startDate: state.appointment.startDate,
    endDate: state.appointment.endDate,
    filterDateErrors: state.appointment.filterDateErrors,
    selectedBarber: state.staff.selectedBarber,
    filteredAppointments: state.appointment.filteredAppointments,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getFilteredAppointments,
  handleBasicDateInput,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (manageBarberApps);