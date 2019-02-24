import React, { Component } from 'react';

import './button.css';
import EmailSvg from '../svg/emailSvg';

export default class buttonIcon extends Component {
  render() {
    let { text } = this.props
    return (
      <div>
        {
          text === 'receipt' ?
          <div className="Receipt-box Container-wrap-center-cross">
            <EmailSvg height="1.5em" width="1.5em" color="#5499c3" />
            <div className="Receipt-text">Receipt</div>
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}
