import React, { Component } from 'react';

import './statusBox.css';

export default class miniStatusBox extends Component {
  render() {
    let { status } = this.props
    return (
      <div className="Inherit">
        {
          status === 'booking confirmed' ?
          <div className="Status-box-orange-mini">
          </div>
          :
          status === 'finished' ?
          <div className="Status-box-green-mini">
          </div>
          :
          status === 'canceled' ?
          <div className="Status-box-gray-mini">
          </div>
          :
          status === 'on progress' ?
          <div className="Status-box-orange-mini">
          </div>
          :
          status === 'skipped' ?
          <div className="Status-box-gray-mini">
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}
