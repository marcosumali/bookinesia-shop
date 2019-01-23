import React, { Component } from 'react';

import './button.css';

export default class button extends Component {
  render() {
    let { text, type, clickFunction, data } = this.props
    return (
      <div className={ type } onClick={ () => clickFunction(data) }>
        { text }
      </div>
    )
  }
}
