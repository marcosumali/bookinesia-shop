import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './report.css';

class reportsTransaction extends Component {
  render() {
    return (
      <div className="row No-margin Report-box">
        <div className="Report-inner-box">
          <div className="col m12 No-margin Report-header-box">
            <div className="Report-header-text">Transaction Reports</div>
          </div>

          <div className="col m12 No-margin">
            <label htmlFor="id" className="Form-text-active-blue">FILTER SELECTED TRANSACTIONS (max. 31 days)</label>
            <div className="col m12 No-padding Container-nowrap-center-cross Margin-t-10">
              <div className="col m5 No-margin No-padding Margin-r-5">
                <BasicDateInput 
                  inputId="startDate"
                  className="input-field Input-date-box"
                  inputLabelStatus={ true }
                  inputLabel="Start Date"
                  openingStatus={ true }
                  openingDate={ startDate }
                  handleChangesDateFunction={ handleBasicDateInput }              
                />
              </div>
              <div className="col m5 No-margin No-padding">
                <BasicDateInput 
                  inputId="endDate"
                  className="input-field Input-date-box"
                  inputLabelStatus={ true }
                  inputLabel="End Date"
                  openingStatus={ true }
                  openingDate={ endDate }
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


export default connect(mapStateToProps, mapDispatchToProps) (reportsTransaction);


