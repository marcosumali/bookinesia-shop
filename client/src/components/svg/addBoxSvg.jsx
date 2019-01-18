import React, { Component } from 'react';

export default class addBoxSvg extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ this.props.width } height={ this.props.height } viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z"/>
        <path fill={ this.props.color } d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
      </svg>
    )
  }
}
