import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';

import '../modal.css';
import CloseSvg from '../../../components/svg/closeSvg';
import Button from '../../button/button';
import ModalSendReceipt from '../../modal/calendar/modalSendReceipt';
import LoadingButton from '../../button/buttonLoading';
import DisabledButton from '../../button/buttonDisabled';
import StatusBox from '../../statusBox/statusBox';
import SelectInput from '../../form/inputSelect';
import TextInput from '../../form/inputText';
import MiniStatusBox from '../../statusBox/miniStatusBox';
import MiniStatusBoxDisabled from '../../statusBox/miniStatusBoxDisabled';
import ModalEditTransaction from '../../modal/calendar/modalEditTrans';
import { formatMoney, getTotalTransaction } from '../../../helpers/currency';
import { 
  handleUpdateStatus,
  handleMultipleSelectOption,
} from '../../../store/dashboard/dashboard.actions';
import {
  setShowPaymentMethodStatus,
  handleChangesEditTransaction,
} from '../../../store/firestore/transaction/transaction.actions';

class modalInfo extends Component {
  render() {
    let { 
      transaction, 
      handleUpdateStatus,
      shop, 
      branch,
      paymentMethod,
      dashboards,
      barbers,
      methods,
      handleMultipleSelectOption,
      setShowPaymentMethodStatus,
      showPaymentMethodStatus,
      updateLoadingStatus,
      dashboardData,
      authUser,
      handleChangesEditTransaction,
      paymentInformation,
      transactionIndex
    } = this.props
    let appointment = transaction.appointment
    let user = {
      type: authUser.job,
      id: authUser.id
    }

    let buttonDisableStatus = true

    // LOGIC
    // Find data index to get detail of previous transaction
    // IF previous transaction has been finished or skipped dan button are enabled, otherise to be disabled
    let dataIndex = dashboardData.findIndex(data => data.queueNo === transaction.queueNo)
    if (dataIndex > 0) {
      let selectedTransactions = dashboardData[dataIndex-1]
      let barberIndex = barbers.findIndex(barber => barber.id === transaction.staff.id)
      let transactionBefore = selectedTransactions.transactions[barberIndex][0]
      
      if (transactionBefore.status === 'finished' || transactionBefore.status === 'skipped') {
        buttonDisableStatus = false
      }
    } else {
      // To set button disable status false if data index <-1
      buttonDisableStatus = false
    }

    return (
      <Modal
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Booking Information</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close" onClick={ () => setShowPaymentMethodStatus(false) }>
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Container-wrap-center-cross animated fadeIn faster">
            {
              appointment.disableStatus ?
              <div className="Width-100cent">
                <div className="col m12 No-margin No-padding Container-nowrap-center-cross">
                  <div className="col m11 No-margin No-padding Margin-r-5">
                    {
                      transaction.queueNo === appointment.currentQueue ?
                      <div className="Customer-text-highlighted Text-capitalize Disabled">{ transaction.name }</div>
                      :
                      <div className="Customer-text Text-capitalize Disabled" style={{ padding: '0.15625em' }}>{ transaction.name }</div>
                    }
                  </div>
                  <div className="col m1 No-margin No-padding">
                    <MiniStatusBoxDisabled status={ transaction.status } />
                  </div>
                </div>
                <div className="col m12 No-margin No-padding">
                  <div className="Customer-phone Disabled" style={{ padding: '0.15625em' }}>{ transaction.phone }</div>
                </div>
              </div>
              :
              <div className="Width-100cent">
                <div className="col m12 No-margin No-padding Container-nowrap-center-cross">
                  <div className="col m11 No-margin No-padding Margin-r-5">
                    {
                      transaction.queueNo === appointment.currentQueue ?
                      <div className="Customer-text-highlighted Text-capitalize">{ transaction.name }</div>
                      :
                      <div className="Customer-text Text-capitalize" style={{ padding: '0.15625em' }}>{ transaction.name }</div>
                    }
                  </div>
                  <div className="col m1 No-margin No-padding">
                    <MiniStatusBox status={ transaction.status } />
                  </div>
                </div>
                <div className="col m12 No-margin No-padding">
                  <div className="Customer-phone" style={{ padding: '0.15625em' }}>{ transaction.phone }</div>
                </div>
              </div>
            }
          </div>
        }>
        <div className="row No-margin">
          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m6 No-margin No-padding">
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m3 No-margin No-padding">
                  <div className="Text-blue">T - Code</div>
                </div>
                <div className="col m1 No-margin No-padding">
                  <div className="Text-blue Text-center">:</div>
                </div>
                <div className="col m8 No-margin No-padding">
                  <div className="Text-grey">{ transaction.id }</div>
                </div>
              </div>
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m3 No-margin No-padding">
                  <div className="Text-blue">Barber</div>
                </div>
                <div className="col m1 No-margin No-padding">
                  <div className="Text-blue Text-center">:</div>
                </div>
                <div className="col m8 No-margin No-padding">
                  <div className="Text-grey">{ transaction.staff.name }</div>
                </div>
              </div>
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m3 No-margin No-padding">
                  <div className="Text-blue">Date</div>
                </div>
                <div className="col m1 No-margin No-padding">
                  <div className="Text-blue Text-center">:</div>
                </div>
                <div className="col m8 No-margin No-padding">
                  <div className="Text-grey">{ transaction.appointment.date }</div>
                </div>
              </div>
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m3 No-margin No-padding">
                  <div className="Text-blue">QueueNo.</div>
                </div>
                <div className="col m1 No-margin No-padding">
                  <div className="Text-blue Text-center">:</div>
                </div>
                <div className="col m8 No-margin No-padding Container-nowrap-center-cross">
                  <div className="col m4 No-margin No-padding">
                    <div className="Text-grey">{ transaction.queueNo }</div>
                  </div>
                  <div className="col m8 No-margin Container-nowrap-end" style={{ paddingRight: '0.625em' }}>
                    <StatusBox status={ transaction.status } />
                  </div>
                </div>
              </div>
            </div>

            <div className="col m6 No-margin No-padding">
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m12 No-margin No-padding">
                  <div className="Text-blue-bold">Customer Details :</div>
                </div>
              </div>
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m3 No-margin No-padding">
                  <div className="Text-blue">Name</div>
                </div>
                <div className="col m1 No-margin No-padding">
                  <div className="Text-blue Text-center">:</div>
                </div>
                <div className="col m8 No-margin No-padding">
                  <div className="Text-grey">{ transaction.name }</div>
                </div>
              </div>
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m3 No-margin No-padding">
                  <div className="Text-blue">Email</div>
                </div>
                <div className="col m1 No-margin No-padding">
                  <div className="Text-blue Text-center">:</div>
                </div>
                <div className="col m8 No-margin No-padding">
                  <div className="Text-grey Text-lowercase">{ transaction.email }</div>
                </div>
              </div>
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m3 No-margin No-padding">
                  <div className="Text-blue">PhoneNo.</div>
                </div>
                <div className="col m1 No-margin No-padding">
                  <div className="Text-blue Text-center">:</div>
                </div>
                <div className="col m8 No-margin No-padding">
                  <div className="Text-grey">{ transaction.phone }</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col m12 No-margin No-padding Container-wrap-center-cross Modal-body-box">
            <div className="col m6 No-margin No-padding">
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="Text-blue-bold">Services</div>
              </div>
              {
                transaction.service && transaction.service.map((service, index) => {
                  return (
                    <div className="col m12 No-margin No-padding Transaction-box" key={ 'service' + index }>
                      <div className="Text-grey">{ service.name }</div>
                    </div>
                  )
                })
              }
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="Text-blue-bold">Total</div>
              </div>
            </div>

            <div className="col m2 No-margin No-padding">
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="Text-blue-bold">Amount</div>
              </div>
              {
                transaction.service && transaction.service.map((service, index) => {
                  return (
                    <div className="col m12 No-margin No-padding Transaction-box" key={ 'service' + index }>
                      <div className="col m12 No-margin No-padding Container-one-line">
                        <div className="col m3 No-margin No-padding Text-grey">{ service.currency }</div>
                        <div className="col m9 No-margin No-padding Text-grey Text-right">{ formatMoney(service.price) }</div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="col m12 No-margin No-padding Transaction-box">
                <div className="col m12 No-margin No-padding Container-one-line">
                  <div className="col m3 No-margin No-padding Text-blue-bold">{ transaction.service[0].currency }</div>
                  <div className="col m9 No-margin No-padding Text-blue-bold Text-right">{ formatMoney(getTotalTransaction(transaction.service)) }</div>
                </div>
              </div>
            </div>
            
            {
              showPaymentMethodStatus && transaction.status === 'on progress' ?
              <div className="col m12 No-padding" style={{ marginBottom: '1em', marginTop: '1.5em' }} >
                <SelectInput 
                  inputId="paymentMethod"
                  className=""
                  inputSize={ 12 }
                  handleChangesFunction={ handleMultipleSelectOption }
                  purpose="selectPaymentMethod"
                  inputName="paymentMethod"
                  selectedData={ null }
                  showLabel={ true }
                  inputLabel="Payment Method"
                  inputValue={ paymentMethod }
                  optionData={ methods }
                />
              </div>
              :
              <div></div>
            }
            {
              showPaymentMethodStatus && transaction.status === 'on progress' && paymentMethod !== 'Cash' ?
              <div className="col m12 No-padding" style={{ marginBottom: '1em' }} >
                <TextInput 
                  inputId="paymentInfo"
                  inputLabel="Payment Information"
                  inputError=""
                  inputValue={ paymentInformation }
                  handleChangesFunction={ handleChangesEditTransaction }
                />
              </div>
              :
              <div></div>
            }
          </div>

          {
            transaction.status === 'finished' ?
            <div className="col m12 No-margin No-padding Modal-body-box Container-nowrap-start">
              {/* SEND RECEIPT BUTTON */}
              {
                transaction.status === 'finished' ?
                <ModalSendReceipt 
                  transaction={ transaction }
                />
                :
                <div></div>
              }
            </div>
            :
            <div>
              {
                buttonDisableStatus === false ?
                <div className="col m12 No-margin No-padding Modal-body-box">
                  <div className="col m6 No-margin No-padding Container-nowrap-start">
                    {/* EDIT BUTTON */}
                    {
                      transaction.status === 'booking confirmed' || 
                      transaction.status === 'on progress' || 
                      (transaction.status === 'canceled' && Number(appointment.currentQueue) < Number(transaction.queueNo)) || 
                      transaction.status === 'skipped' ?
                      <ModalEditTransaction 
                        barber={ transaction.staff }
                        transaction={ transaction }
                      />
                      :
                      <div></div>
                    }
                    {/* SKIP BUTTON */}
                    {
                      transaction.status === 'booking confirmed' || 
                      (transaction.status === 'canceled' && Number(appointment.currentQueue) < Number(transaction.queueNo)) ?
                      <div>
                        {
                          updateLoadingStatus ?
                          <LoadingButton 
                            type="Btn-gray Container-nowrap-center"
                            color="#666666"
                          />
                          :
                          <Button 
                            text="Skip"
                            type="Btn-gray"
                            clickFunction={ handleUpdateStatus }
                            data={{ shop, branch, status: 'skipped', appointment, transaction, user, paymentMethod: null, dashboardData: dashboards[0].data, barbers, transactionIndex }}
                          />
                        }
                      </div>
                      :
                      <div></div>
                    }
                    {/* Happens when status has been changed to skipped but still sending email */}
                    {
                      transaction.status === 'skipped' && updateLoadingStatus ?
                      <LoadingButton 
                        type="Btn-gray Container-nowrap-center"
                        color="#666666"
                      />
                      :
                      <div></div>
                    }
                  </div>
                  <div className="col m6 No-margin No-padding Container-nowrap-end">
                    {/* Happens when status has been changed to finished but still sending email */}
                    {
                      transaction.status === 'finished' && updateLoadingStatus ?
                      <LoadingButton 
                        type="Btn-white-green Container-nowrap-center"
                        color="#ffffff"
                      />
                      :
                      <div></div>
                    }
                    {/* FINISH BUTTON */}
                    {
                      transaction.status === 'on progress' ?
                      <div>
                        {
                          showPaymentMethodStatus && updateLoadingStatus ?
                          <LoadingButton 
                            type="Btn-white-green Container-nowrap-center"
                            color="#ffffff"
                          />
                          :
                          showPaymentMethodStatus && updateLoadingStatus === false ?
                          <Button 
                            text="Finish"
                            type="Btn-white-green"
                            clickFunction={ handleUpdateStatus }
                            data={{ shop, branch, status: 'finished', appointment, transaction, user, paymentMethod, dashboardData: null, barbers: null, paymentInformation }}
                          />
                          :
                          showPaymentMethodStatus === false && updateLoadingStatus === false ?
                          <Button 
                            text="Finish"
                            type="Btn-white-green"
                            clickFunction={ setShowPaymentMethodStatus }
                            data={ true }
                          />
                          :
                          // Happens when status has been changed but still sending email
                          <LoadingButton 
                            type="Btn-white-orange Container-nowrap-center"
                            color="#ffffff"
                          />
                        }
                      </div>
                      :
                      <div></div>
                    }
                    {/* START BUTTON */}
                    {
                      transaction.status === 'booking confirmed' || 
                      (transaction.status === 'canceled' && Number(appointment.currentQueue) < Number(transaction.queueNo)) || 
                      transaction.status === 'skipped' ?
                      <div>
                        {
                          updateLoadingStatus ?
                          <LoadingButton 
                            type="Btn-white-orange Container-nowrap-center"
                            color="#ffffff"
                          />
                          :
                          <Button 
                            text="Start"
                            type="Btn-white-orange"
                            clickFunction={ handleUpdateStatus }
                            data={{ shop, branch, status: 'on progress', appointment, transaction, user, paymentMethod: null, dashboardData: dashboards[0].data, barbers, transactionIndex }}
                          />
                        }
                      </div>
                      :
                      <div></div>
                    }
                  </div>
                </div>
                :
                <div className="col m12 No-margin No-padding Modal-body-box">
                  <div className="col m6 No-margin No-padding Container-nowrap-start">
                    {/* EDIT BUTTON */}
                    {
                      transaction.status === 'booking confirmed' || 
                      transaction.status === 'on progress' || 
                      (transaction.status === 'canceled' && Number(appointment.currentQueue) < Number(transaction.queueNo)) || 
                      transaction.status === 'skipped' ?
                      <ModalEditTransaction 
                        barber={ transaction.staff }
                        transaction={ transaction }
                      />
                      :
                      <div></div>
                    }
                    <DisabledButton 
                      text="Skip"
                      type="Btn-disabled"
                    />
                  </div>
                  <div className="col m6 No-margin No-padding Container-nowrap-end">
                    <DisabledButton 
                      text="Start"
                      type="Btn-disabled"
                    />
                  </div>
                </div>
              }             
            </div>
          }
        </div>
      </Modal>
    )
  }
}


const mapStateToProps = state => {
  return {
    shop: state.shop.shop,
    branch: state.branch.branch,
    barbers: state.staff.allBarbers,
    dashboards: state.transaction.dashboards,
    methods: state.nav.methods,
    paymentMethod: state.transaction.paymentMethod,
    paymentInformation: state.transaction.paymentInformation,
    showPaymentMethodStatus: state.transaction.showPaymentMethodStatus,
    updateLoadingStatus: state.nav.updateLoadingStatus,
    authUser: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handleUpdateStatus,
  handleMultipleSelectOption,
  setShowPaymentMethodStatus,
  handleChangesEditTransaction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (modalInfo);

