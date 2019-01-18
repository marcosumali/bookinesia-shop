import React, { Component } from 'react';

import './loading.css';
import LoadingSpinnerSvg from '../../svg/loadingSpinnerSvg';

export default class loading extends Component {
  render() {
    return (
      <div className="Loading-box Container-wrap-center">
        <div className="Container-wrap-center">
          <div className="Width-100cent Container-wrap-center">
            <LoadingSpinnerSvg height="5em" width="5em" color="#ffffff"/>
          </div>
          <div className="Width-100cent Container-wrap-center">
            <div className="Loading-text">Loading</div>
          </div>
        </div>
      </div>
    )
  }
}
