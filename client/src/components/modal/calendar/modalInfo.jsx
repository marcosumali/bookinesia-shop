import React, { Component } from 'react';
import { Modal } from 'react-materialize';

import './modalInfo.css';
import { formatMoney, getTotalTransaction } from '../../../helpers/currency';
import CloseSvg from '../../../components/svg/closeSvg';

export default class modalInfo extends Component {
  render() {
    let { transaction } = this.props
    return (
      <Modal
        header={ 
          <div className="row No-margin Container-one-line">
            <div className="col m10 No-margin No-padding">
              <div>Booking Information</div>
            </div>
            <div className="col m2 No-margin No-padding Container-nowrap-end modal-close">
              <CloseSvg width="1.25em" height="1.25em" color="#ffffff" />
            </div> 
          </div> 
        }
        trigger={
          <div className="Container-wrap-center-cross animated fadeIn faster">
            <div className="Customer-text Text-capitalize">{ transaction.name }</div>
            <div className="Customer-phone">{ transaction.phone }</div>
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
                  <div className="Text-grey Text-uppercase">{ transaction.id }</div>
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
                  <div className="Text-blue">Queue No.</div>
                </div>
                <div className="col m1 No-margin No-padding">
                  <div className="Text-blue Text-center">:</div>
                </div>
                <div className="col m8 No-margin No-padding">
                  <div className="Text-grey">{ transaction.queueNo }</div>
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
                  <div className="Text-blue">Phone No.</div>
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

          <div className="col m12 No-margin No-padding Modal-body-box">
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
          </div>

          <div className="col m12 No-margin No-padding Modal-body-box">
            <div className="col m6 No-margin No-padding Container-nowrap-start">
              <div className="Button-cancel">Cancel</div>
              <div className="Button-skip">Skip</div>
              <div className="Button-edit">Edit</div>
            </div>
            <div className="col m6 No-margin No-padding Container-nowrap-end">
              <div className="Button-start">Start</div>
              <div className="Button-finish">Finish</div>
            </div>
          </div>
          
        </div>
      </Modal>
    )
  }
}
