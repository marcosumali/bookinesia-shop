import React, { Component } from 'react';

import './welcome.css';
import WelcomeAccount from './welcomeAccount';
import WelcomeInfo from './welcomeInfo';

export default class welcome extends Component {
  render() {
    return (
      <div className="row No-margin Height-100cent">
        <div className="col m12 Welcome-box Container-nowrap">
          <div className="col m8 Description-box">
            <WelcomeInfo />
          </div>
          <div className="col m4 Detail-account-box">
            <WelcomeAccount />
          </div>
        </div>
      </div>
    )
  }
}
