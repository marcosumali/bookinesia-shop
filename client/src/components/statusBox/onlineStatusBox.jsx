import React, { Component } from 'react';

import './statusBox.css';

export default class onlineStatus extends Component {
  render() {
    let { status } = this.props
    return (
      <div className="row No-margin">
        {
          status === 'online' ?
          <div className="Online-box Container-wrap-center-cross">
            <div className="col m2 No-margin">
              <div className="Online-ball"></div>
            </div>
            <div className="col m8 No-margin">
              <div className="Online-text">{ status }</div>
            </div>
          </div>
          :
          <div className="Offline-box Container-wrap-center-cross">
            <div className="col m2 No-margin">
              <div className="Offline-ball"></div>
            </div>
            <div className="col m8 No-margin">
              <div className="Offline-text">{ status }</div>
            </div>
          </div>
        }
      </div>
    )
  }
}
