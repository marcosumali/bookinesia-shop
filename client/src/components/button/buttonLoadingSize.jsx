import React, { Component } from 'react';

import LoadingInfiniteSvg from '../svg/loadingInfiniteSvg';

export default class buttonLoadingDots extends Component {
  render() {
    let { type, color, height, width } = this.props
    return (
      <div className={ type }>
        <LoadingInfiniteSvg height={ height } width={ width } color={ color }/>
      </div>
    )
  }
}
