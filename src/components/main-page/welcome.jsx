import React, { Component } from 'react'

class Welcome extends Component {
  render() {
    return (
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="box">
            Kiri
          </div>
        </div>
        <div className="column is-one-quarter">
          <div className="box">
            Kanan
          </div>
        </div>
      </div>
    );
  }
};

export default Welcome;
