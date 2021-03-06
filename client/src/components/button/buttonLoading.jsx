import React, { Component } from 'react';

import LoadingInfiniteSvg from '../svg/loadingInfiniteSvg';

export default class buttonLoading extends Component {
  render() {
    let { type, color } = this.props
    return (
      <div className={ type }>
        <LoadingInfiniteSvg height="1.25em" width="3.5em" color={ color }/>
      </div>
    )
  }
}
