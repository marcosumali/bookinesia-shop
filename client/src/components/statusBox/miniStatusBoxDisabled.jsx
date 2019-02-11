import React, { Component } from 'react';

import './statusBox.css';

export default class miniStatusBoxDisabled extends Component {
  render() {
    let { status } = this.props
    return (
      <div className="Inherit">
        {
          status === 'booking confirmed' ?
          <div className="Status-box-orange-mini Disabled">
          </div>
          :
          status === 'finished' ?
          <div className="Status-box-green-mini Disabled">
          </div>
          :
          status === 'canceled' ?
          <div className="Status-box-gray-mini Disabled">
          </div>
          :
          status === 'on progress' ?
          <div className="Status-box-orange-mini Disabled">
          </div>
          :
          status === 'skipped' ?
          <div className="Status-box-gray-mini Disabled">
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}
