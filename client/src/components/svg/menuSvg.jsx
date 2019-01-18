import React, { Component } from 'react';

export default class menuSvg extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={ this.props.width } height={ this.props.height } viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z"/>
        <path fill={ this.props.color }  d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/>
      </svg>
    )
  }
}
