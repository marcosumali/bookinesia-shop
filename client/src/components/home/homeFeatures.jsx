import React, { Component } from 'react';

import ConnectSvg from '../svg/connectSvg';
import WaitingListSvg from '../svg/waitingListSvg';
import CashRegisterSvg from '../svg/cashRegisterSvg';
import PaperPlaneSvg from '../svg/paperPlaneSvg';

export default class homeFeatures extends Component {
  render() {
    let width = window.innerWidth
    return (
      <div className="row No-margin">
        {
          width > 767 ?
          <div className="">
            <div className="col s12 m12 No-margin Feature-box Feature-upper-box No-padding Container-wrap-center-cross">
              <div className="col s12 m4 Container-wrap-center">
                <ConnectSvg height="10em" width="10em" />
              </div>
              <div className="col s12 m7 No-margin No-padding Container-wrap-center-cross">
                <div className="col s12 m12 Feature-header-box">
                  <div className="Feature-header-text">Connect With Customers</div>
                </div>
                <div className="col s12 m12 Feature-text-box">
                  <div className="Feature-text">Easily connect with your customers to book an appointment at your shop with ease by having your own dedicated shop's booking website.</div>
                </div>
              </div>
            </div>

            <div className="col s12 m12 No-margin Feature-box No-padding Container-wrap-center-cross">
              <div className="col s12 m7 Container-wrap-center-cross">
                <div className="col s12 m12 Feature-header-box">
                  <div className="Feature-header-text">Waiting List System</div>
                </div>
                <div className="col s12 m12 Feature-text-box">
                  <div className="Feature-text">Our system are designed to maximize operational value of waiting list system at your shop. Your customers will be notified when their queuing number is almost up.</div>
                </div>
              </div>
              <div className="col s12 m4 No-margin No-padding Container-wrap-center">
                <WaitingListSvg height="10em" width="10em" />
              </div>
            </div>

            <div className="col s12 m12 No-margin Feature-box No-padding Container-wrap-center-cross">
              <div className="col s12 m4 No-margin No-padding Container-wrap-center">
                <CashRegisterSvg height="10em" width="10em" />
              </div>
              <div className="col s12 m7 No-margin No-padding Container-wrap-center-cross">
                <div className="col s12 m12 Feature-header-box">
                  <div className="Feature-header-text">Point Of Sales</div>
                </div>
                <div className="col s12 m12 Feature-text-box">
                  <div className="Feature-text">Our system is designed to ease your operational burden in managing your daily sales transactions from each service providers at your shop. You can extract your daily sales transactions into an Excel file for bookkeeping purposes.</div>
                </div>
              </div>
            </div>

            <div className="col s12 m12 No-margin Feature-box Feature-bottom-box No-padding Container-wrap-center-cross">
              <div className="col s12 m7 Container-wrap-center-cross">
                <div className="col s12 m12 Feature-header-box">
                  <div className="Feature-header-text">Go Paperless</div>
                </div>
                <div className="col s12 m12 Feature-text-box">
                  <div className="Feature-text">Your customer's transaction receipt will be automatically send to their email. Reducing your operational cost and saving the earth at the same time.</div>
                </div>
              </div>
              <div className="col s12 m4 No-margin No-padding Container-wrap-center">
                <PaperPlaneSvg height="10em" width="10em" />
              </div>
            </div>
          </div>
          :
          <div>
            <div className="col s12 m12 No-margin Feature-box Feature-upper-box No-padding Container-wrap-center-cross">
              <div className="col s12 m4 No-margin No-padding Container-wrap-center">
                <ConnectSvg height="10em" width="10em" />
              </div>
              <div className="col s12 m7 No-margin No-padding Container-wrap-center-cross">
                <div className="col s12 m12 Feature-header-box">
                  <div className="Feature-header-text">Connect With Customers</div>
                </div>
                <div className="col s12 m12 Feature-text-box">
                  <div className="Feature-text">Easily connect with your customers to book an appointment at your shop with ease by having your own dedicated shop's booking website.</div>
                </div>
              </div>
            </div>

            <div className="col s12 m12 No-margin Feature-box No-padding Container-wrap-center-cross">
              <div className="col s12 m4 No-margin No-padding Container-wrap-center">
                <WaitingListSvg height="10em" width="10em" />
              </div>
              <div className="col s12 m7 Container-wrap-center-cross">
                <div className="col s12 m12 Feature-header-box">
                  <div className="Feature-header-text">Waiting List System</div>
                </div>
                <div className="col s12 m12 Feature-text-box">
                  <div className="Feature-text">Our system are designed to maximize operational value of waiting list system at your shop. Your customers will be notified when their queuing number is almost up.</div>
                </div>
              </div>
            </div>

            <div className="col s12 m12 No-margin Feature-box No-padding Container-wrap-center-cross">
              <div className="col s12 m4 No-margin No-padding Container-wrap-center">
                <CashRegisterSvg height="10em" width="10em" />
              </div>
              <div className="col s12 m7 No-margin No-padding Container-wrap-center-cross">
                <div className="col s12 m12 Feature-header-box">
                  <div className="Feature-header-text">Point Of Sales</div>
                </div>
                <div className="col s12 m12 Feature-text-box">
                  <div className="Feature-text">Our system is designed to ease your operational burden in managing your daily sales transactions from each service providers at your shop. You can extract your daily sales transactions into an Excel file for bookkeeping purposes.</div>
                </div>
              </div>
            </div>

            <div className="col s12 m12 No-margin Feature-box Feature-bottom-box No-padding Container-wrap-center-cross">
              <div className="col s12 m4 No-margin No-padding Container-wrap-center">
                <PaperPlaneSvg height="10em" width="10em" />
              </div>
              <div className="col s12 m7 Container-wrap-center-cross">
                <div className="col s12 m12 Feature-header-box">
                  <div className="Feature-header-text">Go Paperless</div>
                </div>
                <div className="col s12 m12 Feature-text-box">
                  <div className="Feature-text">Your customer's transaction receipt will be automatically send to their email when their appointment has finished. Reducing your operational cost and saving the earth at the same time.</div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
