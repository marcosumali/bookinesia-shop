import React, { Component } from 'react';

import './statusBox.css';

export default class statusBox extends Component {
  render() {
    let { status } = this.props
    return (
      <div className="">
        {
          status === 'booking confirmed' ?
          <div className="Status-box-orange">
            <div className="Status-text">Confirmed</div>
          </div>
          :
          status === 'finished' ?
          <div className="Status-box-green">
            <div className="Status-text">Finished</div>
          </div>
          :
          status === 'canceled' ?
          <div className="Status-box-gray">
            <div className="Status-text">Canceled</div>
          </div>
          :
          status === 'on progress' ?
          <div className="Status-box-orange">
            <div className="Status-text">On Progress</div>
          </div>
          :
          status === 'skipped' ?
          <div className="Status-box-gray">
            <div className="Status-text">Skipped</div>
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}
