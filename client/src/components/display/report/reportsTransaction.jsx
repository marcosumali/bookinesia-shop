import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './report.css';
import SearchSvg from '../../svg/searchSvg';
import BasicDateInput from '../../form/inputDateBasic';
import Button from '../../button/button';
import DisabledButton from '../../button/buttonDisabled';
import { handleBasicDateInput } from '../../../store/dashboard/dashboard.actions';
import { getFilteredTransactions, exportToExcel } from '../../../store/firestore/transaction/transaction.actions';
import { getTotalTransaction, formatMoney } from '../../../helpers/currency';

class reportsTransaction extends Component {
  render() {

    let {
      shop,
      branch,
      startDate,
      endDate,
      handleBasicDateInput,
      getFilteredTransactions,
      filterErrors,
      filteredTransactions,
      reportHeaders,
      exportToExcel,
      salesTransactions,
      selectedBranch,
    } = this.props

    return (
      <div className="row No-margin Report-box" style={{ borderTop: '1px solid #EAEAEA' }}>
        <div className="Report-inner-box">
          <div className="col m12 No-margin Report-header-box">
            <div className="Report-header-text">Transaction Reports</div>
          </div>

          <div className="col m12 No-margin" style={{ paddingTop: '0.625em' }}>
            <label htmlFor="id" className="Form-text-active-blue">FILTER SELECTED TRANSACTIONS (max. 31 days)</label>
            <div className="col m12 No-padding Container-nowrap-center-cross Margin-b-5">
              <div className="col m3 No-margin No-padding Margin-r-5">
                <BasicDateInput 
                  inputId="transStartDate"
                  className="input-field Input-date-box"
                  inputLabelStatus={ true }
                  inputLabel="Start Date"
                  openingStatus={ true }
                  openingDate={ startDate }
                  handleChangesDateFunction={ handleBasicDateInput }              
                />
              </div>
              <div className="col m3 No-margin No-padding">
                <BasicDateInput 
                  inputId="transEndDate"
                  className="input-field Input-date-box"
                  inputLabelStatus={ true }
                  inputLabel="End Date"
                  openingStatus={ true }
                  openingDate={ endDate }
                  handleChangesDateFunction={ handleBasicDateInput }              
                />
              </div>
              <div className="col m1 No-margin No-padding Container-nowrap-center">
                <div className="Search-box" onClick={ () => getFilteredTransactions(startDate, endDate, selectedBranch.id) }>
                  <SearchSvg height="1em" width="1em" color="#5499c3" />
                </div>
              </div>
              <div className="col m6 No-margin No-padding Container-nowrap-end animated fadeIn faster">
                {
                  filteredTransactions.length > 0 && !filteredTransactions[0].message ?
                  <Button 
                    text="Export to Excel"
                    type="Btn-excel"
                    clickFunction={ exportToExcel }
                    data={{ document, shop, branch, startDate, endDate }}
                  />
                  :
                  <DisabledButton 
                    text="Export to Excel"
                    type="Btn-disabled-large"
                  />
                }
              </div>
            </div>
            <div className="col m12 No-margin No-padding Container-wrap-center-cross Margin-b-10">
              {
                filterErrors.length > 0 ?
                <div>
                  {
                    filterErrors && filterErrors.map((error, index) => {
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
            {
              filteredTransactions.length <= 0 ?
              <div className="col m12 No-padding Container-nowrap-center-cross">
                <div className="Manage-text-gray" style={{ textTransform: 'none' }}>Fill up both dates and click on 'Search' button to execute the filter function before it can be downloaded.</div>
              </div>
              :
              <div></div>
            }
            {/* <div className="col m12 Border-line"></div> */}
          </div>
          <div className="col m12 Container-wrap-center-cross Result-box">
            {
              filteredTransactions.length > 0 ?
              <div>
                {
                  filteredTransactions[0].message ?
                  <div className="col m12 Container-wrap-center-cross animated fadeIn faster">
                    <div className="Report-text-orange">No transactions has been made on selected dates.</div>
                  </div>
                  :
                  <table id="Table-to-excel" className="animated fadeIn faster">
                    <thead>
                      <tr style={{ height:'5vh' }}>
                        <th>
                          <div className="Table-text-header">TRANSACTION REPORTS</div>
                        </th>
                      </tr>
                      <tr style={{ height:'5vh' }}>
                        <th>
                          <div className="Table-text-header">Number of Sales  :</div>
                        </th>
                        <th>
                          <div className="Table-text">{ salesTransactions.length }</div>
                        </th>
                        <th>
                          <div className="Table-text-header">Shop :</div>
                        </th>
                        <th>
                          <div className="Table-text Text-capitalize">{ shop.name }</div>
                        </th>
                        <th>
                          <div className="Table-text-header">Start Date :</div>
                        </th>
                        <th>
                          <div className="Table-text">{ startDate }</div>
                        </th>
                      </tr>
                      <tr style={{ height:'5vh' }}>
                        <th>
                          <div className="Table-text-header">Total Sales  :</div>
                        </th>
                        <th>
                          <div className="Table-text">{ formatMoney(getTotalTransaction(salesTransactions)) }</div>
                        </th>
                        <th>
                          <div className="Table-text-header">Branch :</div>
                        </th>
                        <th>
                          <div className="Table-text Text-capitalize">{ branch.name }</div>
                        </th>
                        <th>
                          <div className="Table-text-header">End Date :</div>
                        </th>
                        <th>
                          <div className="Table-text">{ endDate }</div>
                        </th>
                      </tr>
                      <tr style={{ borderTop: '1px solid #EAEAEA' }}>
                        {
                          reportHeaders && reportHeaders.map((header, index) => {
                            return (
                              <th className="Padding-5" key={ 'header' + index }>
                                <div className="Table-text-header">{ header }</div>
                              </th>
                            )
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredTransactions && filteredTransactions.map((filteredTransaction, index) => {
                          return (
                            <tr className="TR-box" key={ 'trans' + index }>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.id }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.appointment.date }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.staff.name }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.service.name }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.service.price }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.name }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.phone }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.status }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.paymentMethod }</div>
                              </td>
                              <td className="Padding-5">
                                <div className="Table-text">{ filteredTransaction.paymentInformation }</div>
                              </td>
                            </tr>
                          )
                        })  
                      }
                    </tbody>
                  </table>
                }
              </div>
              :
              <div></div>
            }
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    shop: state.shop.shop,
    branch: state.branch.branch,
    startDate: state.transaction.startDate,
    endDate: state.transaction.endDate,
    filterErrors: state.transaction.filterErrors,
    filteredTransactions: state.transaction.filteredTransactions,
    reportHeaders: state.transaction.reportHeaders,
    user: state.auth.user,
    salesTransactions: state.transaction.salesTransactions,
    selectedBranch: state.branch.branch,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleBasicDateInput,
  getFilteredTransactions,
  exportToExcel,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (reportsTransaction);


