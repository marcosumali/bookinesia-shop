import React, { Component } from 'react';

import './notFound.css';

export default class notFound extends Component {
  render() {
    return (
      <div id="message">
        <div className="Container-center animated bounceIn">
          <img src={ process.env.PUBLIC_URL + '/assets/img/customer_service_150.png' } alt="customer_service" />
        </div>
        <h2>404</h2>
        <h1>Page Not Found</h1>
        <p style={{ textAlign: 'justify' }} >This is not the web page you are looking for. Please check the URL for mistakes and try again.</p>
        <p style={{ textAlign: 'justify' }} >For any queries, please seek information in <a href="/support">our support page</a>.</p>
      </div>
    )
  }
}
