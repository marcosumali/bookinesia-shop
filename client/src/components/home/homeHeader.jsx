import React, { Component } from 'react';

export default class homeHeader extends Component {
  render() {
    let width = window.innerWidth
    return (
      <div>
        {
          width > 767 ?
          <div className="row No-margin Head-box Container-nowrap-center-cross">
            <div className="col s12 m4 l6 Image-box">
              <img className="Image-home" src={ process.env.PUBLIC_URL + '/assets/img/shop_home_min.png' } alt="home" />
            </div>
            <div className="col s12 m6 l6 Head-text-box">
              <div className="col s12 m12 Head-header-text-box">
                <div className="Head-text">Booking Service Reinvented</div>
              </div>
              <div className="col s12 m12 Header-desc-text-box">
                <div className="Head-desc-text">Business is easier with Bookinesia.</div>
              </div>
              <div className="col s12 m12 Header-input-text-box">
                <div className="Head-input-text">A web application that is tailored for service provider businesses' needs to monitor their business with ease and easily connect with their customers.</div>
              </div>
            </div>            
          </div>
          :
          <div className="row No-margin Head-box Container-wrap-center-cross">
            <div className="col s12 m6 l6 Head-text-box">
              <div className="col s12 m12 Head-header-text-box">
                <div className="Head-text">Booking Service Reinvented</div>
              </div>
              <div className="col s12 m12 Header-desc-text-box">
                <div className="Head-desc-text">Business is easier with Bookinesia.</div>
              </div>
              <div className="col s12 m12 Header-input-text-box">
                <div className="Head-input-text">A web application that is tailored for service provider businesses' needs to monitor their business with ease and easily connect with their customers.</div>
              </div>
            </div>
            <div className="col s12 m4 l6 Image-box Container-wrap-center">
              <img className="Image-home" src={ process.env.PUBLIC_URL + '/assets/img/shop_home_min.png' } alt="home" />
            </div>
          </div>
        }
      </div>
    )
  }
}
