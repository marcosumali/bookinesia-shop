import React, { Component } from 'react';

export default class contacts extends Component {
  render() {
    return (
      <div className="row No-margin">
        <div className="col m12 s12 Contacts-box">
          <div className="col m12 s12 Contacts-header-box Container-nowrap-center">
            <div className="Contacts-header-text">Contact Us</div>
          </div>
          <div className="col m12 s12 Contacts-header-desc-box Container-nowrap-center">
            <div className="Contacts-header-desc-text">Our team are ready to hear and cater your needs.</div>
          </div>
          <div className="col s12 m6 offset-m3 l4 offset-l4 Contacts-info-box">
            <div className="col s12 m12">
              <div className="Contacts-info-header-text">Chat with us !</div>
            </div>
            <div className="col s12 m12">
              <div className="Contacts-info-desc-text">Do you need more information? Is your shop want to use our services? Do you need some technical assistance?</div>
            </div>
            <div className="col s12 m12 No-padding">
              <div className="col s4 m4">
                <div className="Contacts-text">Email</div>
              </div>
              <div className="col s8 m8">
                <div className="Contacts-text"><a style={{ color: '#5499c3', textDecoration: 'underline' }} href="mailto:shopsupport@bookinesia.com">shopsupport@bookinesia.com</a></div>
              </div>
            </div>
            <div className="col s12 m12 No-padding">
              <div className="col s4 m4">
                <div className="Contacts-text">Whatsapp</div>
              </div>
              <div className="col s8 m8">
                <div className="Contacts-text">0813 9107 7789</div>
              </div>
            </div>
            <div className="col s12 m12 No-padding">
              <div className="col s4 m4">
                <div className="Contacts-text">Office Hours</div>
              </div>
              <div className="col s8 m8">
                <div className="Contacts-text">Everyday / 9:00 - 18:00 WIB</div>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    )
  }
}
