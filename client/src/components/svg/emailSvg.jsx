import React, { Component } from 'react';

export default class emailSvg extends Component {
  render() {
    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
        width={ this.props.width } height={ this.props.height } viewBox="0 0 24 24" enable-background="new 0 0 24 24" space="preserve">
        <g id="Bounding_Boxes">
          <g id="ui_x5F_spec_x5F_header_copy_2">
          </g>
          <path fill="none" d="M0,0h24v24H0V0z"/>
        </g>
        <g id="Outline">
          <g id="ui_x5F_spec_x5F_header">
          </g>
          <path fill={ this.props.color } id="XMLID_497_" d="M22,6c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6z M20,6l-8,5L4,6H20z
            M20,18L4,18V8l8,5l8-5V18z"/>
        </g>
      </svg> 
    )
  }
}
