import React, { Component } from 'react';

import './button.css';

export default class buttonDisabled extends Component {
  render() {
    let { text, type } = this.props
    return (
      <div className={ type }>
        { text }
      </div>
    )
  }
}
