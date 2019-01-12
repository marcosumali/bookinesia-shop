import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/actions/bookinesia-actions';

class Welcome extends Component {
  componentDidMount() {
    const { changeLoginStatus } = this.props;
    const isLogin = localStorage.getItem('isLogin');
    console.log(isLogin);
    if (isLogin) {
      changeLoginStatus(true);
    }
  }

  render() {
    const { isLogin, stateStatus, changeComponent, showChild, changeLoginStatus } = this.props;
    return (
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="box">
            <div onClick={() => changeComponent('Calendar', stateStatus)}>
              Calendar
            </div>
            <div onClick={() => showChild('Manage', stateStatus)}>
              Manage
            </div>
            <div onClick={() => showChild('Reports', stateStatus)}>
              Reports
            </div>
          </div>
        </div>
        <div className="column is-one-quarter">
          <div className="box">
            {
              isLogin ? (
                <div>
                  <a className="button is-info is-fullwidth">
                    Create New Booking
                  </a>
                </div>
              ) : (
                <div>
                  <a className="button is-info" onClick={() => changeLoginStatus(true)}>
                    Login
                  </a>
                  <a className="button is-info">
                    Register
                  </a>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  stateStatus: state.stateStatus,
  isLogin: state.isLogin
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
